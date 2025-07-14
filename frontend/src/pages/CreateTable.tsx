
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Users, Calendar, MapPin, Crown, Image as ImageIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRpgTables } from "@/hooks/useRpgTables";
import { Navigate } from "react-router-dom";

const CreateTable = () => {
  const { user, loading: authLoading } = useAuth();
  const { systems, isLoading, createTable } = useRpgTables();
  
  const [formData, setFormData] = useState({
    title: "",
    system: "",
    description: "",
    maxPlayers: 4,
    location: "",
    mode: "online",
    schedule: "",
    isVip: false,
    tags: [] as string[],
    image: ""
  });

  // Redirect if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  const availableTags = [
    "Iniciante",
    "Experiente", 
    "Roleplay Heavy",
    "Combat Heavy",
    "Investigação",
    "Horror",
    "Fantasia",
    "Ficção Científica",
    "Medieval",
    "Moderno",
    "Futurista"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.system || !formData.description) {
      return;
    }

    try {
      await createTable.mutateAsync(formData);
      // Redirect to profile after successful creation
      window.location.href = '/profile';
    } catch (error) {
      console.error('Erro ao criar mesa:', error);
    }
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  // Show loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gradient">RPG Finder</h1>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/profile'}>
            Voltar ao Perfil
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Criar Nova <span className="text-gradient">Mesa de RPG</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Compartilhe sua aventura épica com jogadores apaixonados
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título da Mesa *</Label>
                    <Input
                      id="title"
                      placeholder="A Lenda dos Cinco Reinos"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="system">Sistema de RPG *</Label>
                    <Select value={formData.system} onValueChange={(value) => setFormData({...formData, system: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha o sistema" />
                      </SelectTrigger>
                      <SelectContent>
                        {systems?.map((system) => (
                          <SelectItem key={system.id} value={system.name}>
                            {system.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição da Campanha *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva sua campanha, o mundo, a história e o que os jogadores podem esperar..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxPlayers">Máximo de Jogadores</Label>
                    <Select 
                      value={formData.maxPlayers.toString()} 
                      onValueChange={(value) => setFormData({...formData, maxPlayers: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} jogadores
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mode">Modalidade</Label>
                    <Select value={formData.mode} onValueChange={(value) => setFormData({...formData, mode: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="presencial">Presencial</SelectItem>
                        <SelectItem value="hibrido">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schedule">Horário das Sessões</Label>
                    <Input
                      id="schedule"
                      placeholder="Sábados 19h às 23h"
                      value={formData.schedule}
                      onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Localização
                  </Label>
                  <Input
                    id="location"
                    placeholder={formData.mode === 'online' ? "Discord, Roll20, etc." : "São Paulo - SP, Bairro..."}
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags and Categories */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Tags e Categorias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base mb-3 block">Selecione as tags que descrevem sua mesa:</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={formData.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Options */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-accent" />
                  Opções Premium
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">Mesa VIP</Label>
                    <p className="text-sm text-muted-foreground">
                      Destaque sua mesa e receba maior visibilidade na plataforma
                    </p>
                  </div>
                  <Switch
                    checked={formData.isVip}
                    onCheckedChange={(checked) => setFormData({...formData, isVip: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">
                    <ImageIcon className="h-4 w-4 inline mr-1" />
                    Imagem de Capa
                  </Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="URL da imagem (opcional)"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                  <p className="text-sm text-muted-foreground">
                    Adicione uma imagem que represente sua campanha
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg" 
                className="px-12 py-3 text-lg glow-effect"
                disabled={createTable.isPending}
              >
                {createTable.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Criando Mesa...
                  </>
                ) : (
                  'Criar Mesa de RPG'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTable;
