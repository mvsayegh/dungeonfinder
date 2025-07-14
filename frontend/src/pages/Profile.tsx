
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/Navigation';
import { ProfileSettings } from '@/components/ProfileSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Trophy, 
  Users, 
  Crown,
  Shield,
  Sword,
  ScrollText,
  Sparkles,
  Heart,
  MessageCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Profile = () => {
  const { user } = useAuth();
  const { profile, tables, reviews, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando perfil do aventureiro...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-muted-foreground mb-4">Perfil não encontrado</h1>
            <p className="text-muted-foreground">Você precisa estar logado para ver seu perfil.</p>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = reviews?.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header do Perfil */}
        <div className="relative mb-8">
          <div className="h-48 bg-gradient-to-r from-primary/20 via-accent/20 to-purple-600/20 rounded-xl mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/50" />
            <div className="absolute top-4 right-4">
              <ProfileSettings />
            </div>
            {/* Elementos decorativos */}
            <Sword className="absolute top-6 left-6 h-8 w-8 text-primary/30 rotate-12" />
            <Shield className="absolute bottom-6 right-20 h-10 w-10 text-accent/30 -rotate-12" />
            <ScrollText className="absolute top-8 right-1/3 h-6 w-6 text-purple-400/30 rotate-45" />
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 relative z-10">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-4xl font-bold">
                  {profile.username?.charAt(0).toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
              {profile.is_verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              )}
              {profile.is_vip && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-background">
                  <Crown className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold rpg-title">{profile.full_name}</h1>
                {profile.is_vip && <Sparkles className="h-6 w-6 text-amber-400" />}
              </div>
              <p className="text-xl text-muted-foreground mb-2">@{profile.username}</p>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-primary/10 text-primary border-primary/30">
                  {profile.user_type === 'master' ? '🧙‍♂️ Mestre' : 
                   profile.user_type === 'player' ? '⚔️ Aventureiro' : 
                   profile.user_type === 'admin' ? '👑 Administrador' : '🛡️ VIP'}
                </Badge>
                {profile.location && (
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {profile.location}
                  </Badge>
                )}
                <Badge variant="outline" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  Desde {format(new Date(profile.created_at || ''), 'MMM yyyy', { locale: ptBR })}
                </Badge>
              </div>
              
              {profile.bio && (
                <p className="text-muted-foreground max-w-2xl leading-relaxed mb-4">
                  {profile.bio}
                </p>
              )}
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  <span className="font-medium">{averageRating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({reviews?.length || 0} avaliações)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span className="font-medium">{profile.total_sessions || 0}</span>
                  <span className="text-muted-foreground">sessões</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">{tables?.length || 0}</span>
                  <span className="text-muted-foreground">mesas criadas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Minhas Mesas */}
            <Card className="rpg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sword className="h-6 w-6 text-primary" />
                  ⚔️ Minhas Aventuras
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tables && tables.length > 0 ? (
                  <div className="space-y-4">
                    {tables.map((table) => (
                      <div key={table.id} className="border border-border/50 rounded-lg p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                            {table.title}
                          </h3>
                          <Badge 
                            variant={table.status === 'open' ? 'default' : 'secondary'}
                            className={table.status === 'open' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                          >
                            {table.status === 'open' ? '🟢 Aberta' : 
                             table.status === 'full' ? '🔴 Completa' : '🟡 Em Andamento'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {table.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {table.current_players || 0}/{table.max_players}
                            </span>
                            {table.rpg_systems && (
                              <Badge variant="outline" className="text-xs">
                                {table.rpg_systems.name}
                              </Badge>
                            )}
                          </div>
                          <Button size="sm" variant="outline" onClick={() => window.location.href = `/table/${table.id}`}>
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ScrollText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Você ainda não criou nenhuma mesa.</p>
                    <Button onClick={() => window.location.href = '/create-table'} className="rpg-button">
                      <Sword className="mr-2 h-4 w-4" />
                      Criar Primeira Mesa
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Avaliações Recebidas */}
            <Card className="rpg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Star className="h-6 w-6 text-amber-400" />
                  ⭐ Avaliações Recebidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews && reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.slice(0, 5).map((review) => (
                      <div key={review.id} className="border border-border/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">@{review.profiles?.username}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(review.created_at || ''), 'dd/MM/yyyy', { locale: ptBR })}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-muted-foreground text-sm">"{review.comment}"</p>
                        )}
                        {review.rpg_tables && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Mesa: {review.rpg_tables.title}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Ainda não há avaliações.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estatísticas */}
            <Card className="rpg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  📊 Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">⭐ Avaliação Média</span>
                  <span className="font-bold text-amber-400">{averageRating.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">🎮 Total de Sessões</span>
                  <span className="font-bold">{profile.total_sessions || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">🗡️ Mesas Criadas</span>
                  <span className="font-bold">{tables?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">💬 Avaliações</span>
                  <span className="font-bold">{reviews?.length || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contatos */}
            {(profile.discord || profile.instagram || profile.twitter) && (
              <Card className="rpg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    🔗 Contatos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {profile.discord && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">Discord:</span>
                      <span className="font-medium text-sm">{profile.discord}</span>
                    </div>
                  )}
                  {profile.instagram && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">Instagram:</span>
                      <span className="font-medium text-sm">{profile.instagram}</span>
                    </div>
                  )}
                  {profile.twitter && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">Twitter:</span>
                      <span className="font-medium text-sm">{profile.twitter}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
