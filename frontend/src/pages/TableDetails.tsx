
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Star, 
  Crown, 
  Shield, 
  ArrowLeft,
  Clock,
  MessageSquare,
  UserPlus,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/hooks/useAuth';

const TableDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [applicationMessage, setApplicationMessage] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Fetch table details
  const { data: table, isLoading } = useQuery({
    queryKey: ['table-details', id],
    queryFn: async () => {
      if (!id) throw new Error('Table ID is required');
      
      const { data, error } = await supabase
        .from('rpg_tables')
        .select(`
          *,
          profiles!rpg_tables_master_id_fkey (
            id,
            username, 
            avatar_url, 
            rating, 
            is_verified,
            bio
          ),
          rpg_systems (name, description),
          table_players (
            player_id,
            joined_at,
            profiles (username, avatar_url, rating)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch user's application status
  const { data: userApplication } = useQuery({
    queryKey: ['user-application', id, user?.id],
    queryFn: async () => {
      if (!user?.id || !id) return null;
      
      const { data, error } = await supabase
        .from('table_applications')
        .select('*')
        .eq('table_id', id)
        .eq('player_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id && !!id,
  });

  // Fetch reviews for the master
  const { data: masterReviews = [] } = useQuery({
    queryKey: ['master-reviews', table?.master_id],
    queryFn: async () => {
      if (!table?.master_id) return [];
      
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles!reviews_reviewer_id_fkey (username, avatar_url)
        `)
        .eq('reviewed_id', table.master_id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: !!table?.master_id,
  });

  // Apply to table mutation
  const applyToTableMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id || !id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('table_applications')
        .insert({
          table_id: id,
          player_id: user.id,
          message: applicationMessage || 'Gostaria de participar desta mesa!',
          status: 'pending'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Candidatura enviada!",
        description: "Sua solicitação foi enviada ao mestre da mesa.",
      });
      queryClient.invalidateQueries({ queryKey: ['user-application', id, user?.id] });
      setApplicationMessage('');
    },
    onError: (error) => {
      console.error('Error applying to table:', error);
      toast({
        title: "Erro ao enviar candidatura",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  // Submit review mutation
  const submitReviewMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id || !table?.master_id || !id) throw new Error('Missing required data');
      
      const { error } = await supabase
        .from('reviews')
        .insert({
          table_id: id,
          reviewer_id: user.id,
          reviewed_id: table.master_id,
          rating: reviewRating,
          comment: reviewComment
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Avaliação enviada!",
        description: "Sua avaliação foi registrada com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['master-reviews', table?.master_id] });
      setReviewRating(5);
      setReviewComment('');
    },
    onError: (error) => {
      console.error('Error submitting review:', error);
      toast({
        title: "Erro ao enviar avaliação",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  const handleApplyToTable = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para se candidatar.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    applyToTableMutation.mutate();
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

  const getApplicationStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendente',
      approved: 'Aprovada',
      rejected: 'Rejeitada'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getApplicationStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500',
      approved: 'bg-green-500',
      rejected: 'bg-red-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!table) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Mesa não encontrada</h1>
          <Button onClick={() => navigate('/search')}>
            Voltar para busca
          </Button>
        </div>
      </div>
    );
  }

  const canApply = user && 
    !userApplication && 
    table.status === 'open' && 
    table.current_players < table.max_players &&
    table.master_id !== user.id;

  const isTableMaster = user?.id === table.master_id;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gradient cursor-pointer" onClick={() => navigate('/')}>
                DungeonFinder
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Table Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
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
                    <CardTitle className="text-3xl mb-2">{table.title}</CardTitle>
                    <p className="text-muted-foreground text-lg">
                      {table.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>{table.current_players || 0}/{table.max_players} jogadores</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>{table.location || getModeLabel(table.mode)}</span>
                  </div>
                  {table.session_date && (
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                      <span>{format(new Date(table.session_date), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</span>
                    </div>
                  )}
                  {table.session_frequency && (
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                      <span>{table.session_frequency}</span>
                    </div>
                  )}
                </div>

                {table.tags && table.tags.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {table.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Players List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Jogadores ({table.table_players?.length || 0}/{table.max_players})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {table.table_players?.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={player.profiles?.avatar_url} />
                          <AvatarFallback>{player.profiles?.username?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{player.profiles?.username}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">
                              {player.profiles?.rating?.toFixed(1) || '0.0'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {player.joined_at && format(new Date(player.joined_at), 'dd/MM/yyyy', { locale: ptBR })}
                      </div>
                    </div>
                  ))}
                  
                  {(!table.table_players || table.table_players.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum jogador na mesa ainda.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Master Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Mestre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={table.profiles?.avatar_url} />
                    <AvatarFallback>{table.profiles?.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold">{table.profiles?.username}</p>
                      {table.profiles?.is_verified && (
                        <Badge variant="secondary" className="text-xs">Verificado</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">
                        {table.profiles?.rating?.toFixed(1) || '0.0'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {table.profiles?.bio && (
                  <p className="text-sm text-muted-foreground mb-4">{table.profiles.bio}</p>
                )}

                <Button variant="outline" className="w-full" onClick={() => navigate(`/profile/${table.master_id}`)}>
                  Ver Perfil
                </Button>
              </CardContent>
            </Card>

            {/* Application Status / Apply Button */}
            <Card>
              <CardHeader>
                <CardTitle>Participação</CardTitle>
              </CardHeader>
              <CardContent>
                {!user ? (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Faça login para se candidatar</p>
                    <Button onClick={() => navigate('/auth')} className="w-full">
                      Fazer Login
                    </Button>
                  </div>
                ) : isTableMaster ? (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Você é o mestre desta mesa</p>
                    <Button variant="outline" onClick={() => navigate('/admin')} className="w-full">
                      Gerenciar Mesa
                    </Button>
                  </div>
                ) : userApplication ? (
                  <div className="text-center">
                    <Badge className={`${getApplicationStatusColor(userApplication.status)} text-white mb-4`}>
                      {getApplicationStatusLabel(userApplication.status)}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Candidatura enviada em {format(new Date(userApplication.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
                  </div>
                ) : canApply ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="message">Mensagem para o mestre (opcional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Conte um pouco sobre sua experiência..."
                        value={applicationMessage}
                        onChange={(e) => setApplicationMessage(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={handleApplyToTable}
                      disabled={applyToTableMutation.isPending}
                      className="w-full"
                    >
                      {applyToTableMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Candidatar-se'
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">Mesa não disponível para candidatura</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Avaliações do Mestre
                  </CardTitle>
                  {user && user.id !== table.master_id && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Avaliar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Avaliar Mestre</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Nota</Label>
                            <Select value={reviewRating.toString()} onValueChange={(value) => setReviewRating(parseInt(value))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <SelectItem key={rating} value={rating.toString()}>
                                    {rating} estrela{rating > 1 ? 's' : ''}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="review-comment">Comentário</Label>
                            <Textarea
                              id="review-comment"
                              placeholder="Conte como foi sua experiência..."
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                            />
                          </div>
                          <Button 
                            onClick={() => submitReviewMutation.mutate()}
                            disabled={submitReviewMutation.isPending}
                            className="w-full"
                          >
                            {submitReviewMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              'Enviar Avaliação'
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {masterReviews.map((review) => (
                    <div key={review.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={review.profiles?.avatar_url} />
                            <AvatarFallback>{review.profiles?.username?.[0]?.toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{review.profiles?.username}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(review.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                    </div>
                  ))}
                  
                  {masterReviews.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Nenhuma avaliação ainda.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetails;
