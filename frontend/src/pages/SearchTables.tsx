import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Crown, 
  Shield,
  X,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const SearchTables = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [filters, setFilters] = useState({
    search: "",
    system: "all",
    location: "",
    mode: "all",
    schedule: "",
    minRating: [4],
    maxPlayers: "",
    onlyVip: false,
    tags: [] as string[]
  });

  // Fetch RPG Systems
  const { data: rpgSystems = [] } = useQuery({
    queryKey: ['rpg-systems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rpg_systems')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch RPG Tables with filters
  const { data: tables = [], isLoading, refetch } = useQuery({
    queryKey: ['rpg-tables', filters],
    queryFn: async () => {
      let query = supabase
        .from('rpg_tables')
        .select(`
          *,
          profiles!rpg_tables_master_id_fkey (
            username, 
            avatar_url, 
            rating, 
            is_verified
          ),
          rpg_systems (name)
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters.system !== "all") {
        const systemId = rpgSystems.find(s => s.name === filters.system)?.id;
        if (systemId) {
          query = query.eq('system_id', systemId);
        }
      }

      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters.mode !== "all") {
        // Fix: Use correct enum values for database
        const modeMap: { [key: string]: "presencial" | "online_voice" | "online_text" | "hybrid" } = {
          "online": "online_voice",
          "presencial": "presencial",
          "hibrido": "hybrid"
        };
        const dbMode = modeMap[filters.mode];
        if (dbMode) {
          query = query.eq('mode', dbMode);
        }
      }

      if (filters.onlyVip) {
        query = query.eq('is_vip', true);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });

  const availableTags = [
    "Iniciante",
    "Intermediário", 
    "Experiente",
    "Roleplay Heavy",
    "Combat Heavy",
    "Investigação",
    "Horror",
    "Fantasia",
    "Medieval",
    "Moderno"
  ];

  const handleApplyToTable = async (tableId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Login necessário",
          description: "Você precisa estar logado para se candidatar a uma mesa.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      // Check if user already applied
      const { data: existingApplication } = await supabase
        .from('table_applications')
        .select('id')
        .eq('table_id', tableId)
        .eq('player_id', user.id)
        .single();

      if (existingApplication) {
        toast({
          title: "Candidatura já enviada",
          description: "Você já se candidatou a esta mesa.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('table_applications')
        .insert({
          table_id: tableId,
          player_id: user.id,
          message: "Gostaria de participar desta mesa!",
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Candidatura enviada!",
        description: "Sua solicitação foi enviada ao mestre da mesa.",
      });
    } catch (error) {
      console.error('Error applying to table:', error);
      toast({
        title: "Erro ao enviar candidatura",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      system: "all",
      location: "",
      mode: "all",
      schedule: "",
      minRating: [4],
      maxPlayers: "",
      onlyVip: false,
      tags: []
    });
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const getModeLabel = (mode: string) => {
    const modes = {
      presencial: 'Presencial',
      online_voice: 'Online (Voz)',
      online_text: 'Online (Texto)',
      hybrid: 'Híbrido'
    };
    return modes[mode as keyof typeof modes] || mode;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-green-500',
      full: 'bg-red-500',
      in_progress: 'bg-yellow-500',
      completed: 'bg-gray-500',
      cancelled: 'bg-red-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      open: 'Aberta',
      full: 'Lotada',
      in_progress: 'Em Andamento',
      completed: 'Concluída',
      cancelled: 'Cancelada'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gradient cursor-pointer" onClick={() => navigate('/')}>
              DungeonFinder
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => navigate('/create-table')} className="hover:text-primary transition-colors">
              Criar Mesa
            </button>
            <button onClick={() => navigate('/profile')} className="hover:text-primary transition-colors">
              Meu Perfil
            </button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <Card className="bg-card/50 border-border sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtros
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Limpar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Título, mestre, descrição..."
                      className="pl-10"
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                    />
                  </div>
                </div>

                {/* System */}
                <div className="space-y-2">
                  <Label>Sistema de RPG</Label>
                  <Select value={filters.system} onValueChange={(value) => setFilters({...filters, system: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os sistemas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os sistemas</SelectItem>
                      {rpgSystems.map((system) => (
                        <SelectItem key={system.id} value={system.name}>
                          {system.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Cidade, estado ou online"
                      className="pl-10"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                  </div>
                </div>

                {/* Mode */}
                <div className="space-y-2">
                  <Label>Modalidade</Label>
                  <Select value={filters.mode} onValueChange={(value) => setFilters({...filters, mode: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Qualquer modalidade</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="hibrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <Label>
                    Avaliação Mínima: {filters.minRating[0].toFixed(1)}
                    <Star className="h-4 w-4 inline ml-1 text-accent" />
                  </Label>
                  <Slider
                    value={filters.minRating}
                    onValueChange={(value) => setFilters({...filters, minRating: value})}
                    max={5}
                    min={1}
                    step={0.1}
                    className="mt-2"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={filters.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/80 transition-colors text-xs"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* VIP Only */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="vip-only"
                    checked={filters.onlyVip}
                    onChange={(e) => setFilters({...filters, onlyVip: e.target.checked})}
                    className="rounded border-border"
                  />
                  <Label htmlFor="vip-only" className="flex items-center gap-1">
                    <Crown className="h-4 w-4 text-accent" />
                    Apenas mesas VIP
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">
                Buscar <span className="text-gradient">Mesas de RPG</span>
              </h1>
              <div className="text-muted-foreground">
                {isLoading ? 'Carregando...' : `${tables.length} mesas encontradas`}
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="space-y-6">
                {tables.map((table) => (
                  <Card key={table.id} className="bg-card/50 border-border hover:bg-card/70 transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="bg-primary/20 text-primary">
                                {table.rpg_systems?.name}
                              </Badge>
                              {table.is_vip && (
                                <Badge className="bg-accent text-accent-foreground">
                                  <Crown className="h-3 w-3 mr-1" />
                                  VIP
                                </Badge>
                              )}
                              <Badge variant="outline" className={`${getStatusColor(table.status)} text-white`}>
                                {getStatusLabel(table.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 text-accent mr-1" />
                              {table.profiles?.rating?.toFixed(1) || '0.0'}
                            </div>
                          </div>

                          <h2 
                            className="text-xl font-semibold mb-2 hover:text-primary transition-colors cursor-pointer"
                            onClick={() => navigate(`/table/${table.id}`)}
                          >
                            {table.title}
                          </h2>

                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {table.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center text-sm">
                              <Shield className="h-4 w-4 text-muted-foreground mr-2" />
                              Mestre: {table.profiles?.username || 'N/A'}
                            </div>
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 text-muted-foreground mr-2" />
                              {table.current_players || 0}/{table.max_players} jogadores
                            </div>
                            {table.session_date && (
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                                {format(new Date(table.session_date), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                              </div>
                            )}
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                              {table.location || getModeLabel(table.mode)}
                            </div>
                          </div>

                          {table.tags && table.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {table.tags.slice(0, 4).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {table.tags.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{table.tags.length - 4}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-3 md:w-48">
                          <Button 
                            className="w-full" 
                            onClick={() => handleApplyToTable(table.id)}
                            disabled={table.status !== 'open' || (table.current_players >= table.max_players)}
                          >
                            {table.status === 'open' && (table.current_players < table.max_players) ? 'Candidatar-se' : 'Mesa Indisponível'}
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => navigate(`/table/${table.id}`)}
                          >
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {tables.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      Nenhuma mesa encontrada com os filtros aplicados.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="mt-4"
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTables;
