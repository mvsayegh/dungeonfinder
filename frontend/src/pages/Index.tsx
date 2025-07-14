
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { VipUpgradeCard } from "@/components/VipUpgradeCard";
import { ApplicationDialog } from "@/components/ApplicationDialog";
import { 
  Search, 
  Users, 
  Gamepad2, 
  Star, 
  MapPin, 
  Clock, 
  Crown, 
  Shield, 
  Zap,
  Heart,
  Globe,
  Trophy,
  Calendar,
  MessageCircle,
  Sword,
  Sparkles,
  Dice6,
  ScrollText,
  Wand2,
  Castle
} from "lucide-react";
import { useState } from "react";
import { useRpgTables } from "@/hooks/useRpgTables";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();
  const { tables } = useRpgTables();
  const [selectedTable, setSelectedTable] = useState<{id: string; title: string} | null>(null);
  
  const featuredTables = tables?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-purple-600/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        {/* Elementos flutuantes temáticos */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20">
          <Dice6 className="w-full h-full text-primary float-animation" />
        </div>
        <div className="absolute bottom-20 right-10 w-20 h-20 opacity-20">
          <Castle className="w-full h-full text-accent float-animation" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 opacity-20">
          <Wand2 className="w-full h-full text-purple-500 float-animation" style={{ animationDelay: '4s' }} />
        </div>
        <div className="absolute top-1/3 right-1/4 w-14 h-14 opacity-20">
          <ScrollText className="w-full h-full text-amber-500 float-animation" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative bg-gradient-to-br from-primary/20 via-accent/20 to-purple-600/20 p-6 rounded-full backdrop-blur-sm border border-primary/30">
                <Shield className="h-16 w-16 text-primary" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
                <Sparkles className="absolute -bottom-1 -left-1 h-6 w-6 text-amber-400 animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 rpg-title sparkle">
              Encontre Sua Mesa de RPG Épica
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              🏰 A maior taverna digital do Brasil para aventureiros! Conecte-se com mestres lendários, 
              forme grupos épicos e mergulhe em mundos fantásticos cheios de magia e aventura! ⚔️✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="text-lg px-10 py-6 rpg-button glow-effect" onClick={() => window.location.href = '/search'}>
                <Search className="mr-3 h-6 w-6" />
                🔍 Explorar Mesas
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-primary/50 hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all" onClick={() => window.location.href = '/create-table'}>
                <Sword className="mr-3 h-6 w-6" />
                ⚔️ Criar Aventura
              </Button>
            </div>

            {/* Stats com tema RPG */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center rpg-card p-6 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2 rpg-title">500+</div>
                <div className="text-sm text-muted-foreground font-medium">🏰 Aventuras Ativas</div>
              </div>
              <div className="text-center rpg-card p-6 rounded-xl">
                <div className="text-4xl font-bold text-accent mb-2 rpg-title">2K+</div>
                <div className="text-sm text-muted-foreground font-medium">⚔️ Aventureiros</div>
              </div>
              <div className="text-center rpg-card p-6 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2 rpg-title">150+</div>
                <div className="text-sm text-muted-foreground font-medium">🧙‍♂️ Mestres Épicos</div>
              </div>
              <div className="text-center rpg-card p-6 rounded-xl">
                <div className="text-4xl font-bold text-accent mb-2 rpg-title">4.8★</div>
                <div className="text-sm text-muted-foreground font-medium">✨ Classificação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 rpg-title">🏰 Por Que Nossa Taverna é Lendária?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Recursos mágicos pensados para tornar sua jornada de RPG verdadeiramente épica! ⚡
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="rpg-card hover:scale-105 transition-all duration-300 group">
              <CardHeader>
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">🔮 Busca Mágica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Encontre mesas por sistema, localização, horário e muito mais. Filtros encantados para sua mesa perfeita!
                </p>
              </CardContent>
            </Card>

            <Card className="rpg-card hover:scale-105 transition-all duration-300 group">
              <CardHeader>
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">⭐ Sistema de Honra</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Avalie mestres e jogadores. Construa sua reputação e encontre companheiros de confiança para suas aventuras!
                </p>
              </CardContent>
            </Card>

            <Card className="rpg-card hover:scale-105 transition-all duration-300 group">
              <CardHeader>
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Crown className="h-8 w-8 text-purple-400" />
                </div>
                <CardTitle className="text-xl">🛡️ Perfis Heroicos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Perfis detalhados com histórico, preferências e experiência. Conheça melhor seus futuros companheiros de jornada!
                </p>
              </CardContent>
            </Card>

            <Card className="rpg-card hover:scale-105 transition-all duration-300 group">
              <CardHeader>
                <div className="bg-gradient-to-br from-amber-500/20 to-amber-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-8 w-8 text-amber-500" />
                </div>
                <CardTitle className="text-xl">📜 Comunicação Mística</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sistema de mensagens e notificações encantadas para manter todos conectados e organizados!
                </p>
              </CardContent>
            </Card>

            <Card className="rpg-card hover:scale-105 transition-all duration-300 group">
              <CardHeader>
                <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-xl">🌍 Multiverso de Opções</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Suporte para aventuras presenciais, online por voz, texto ou híbridas. Jogue como preferir!
                </p>
              </CardContent>
            </Card>

            <Card className="rpg-card hover:scale-105 transition-all duration-300 group">
              <CardHeader>
                <div className="bg-gradient-to-br from-rose-500/20 to-rose-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="h-8 w-8 text-rose-500" />
                </div>
                <CardTitle className="text-xl">👑 Recursos VIP</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Funcionalidades premium para mestres dedicados e aventureiros experientes!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Tables */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 rpg-title">🌟 Aventuras em Destaque</h2>
            <p className="text-xl text-muted-foreground">
              Descubra algumas das melhores aventuras disponíveis agora na taverna! ⚔️
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTables.map((table) => (
              <Card key={table.id} className="rpg-card hover:scale-105 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                        {table.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                          {table.rpg_systems?.name}
                        </Badge>
                        {table.is_vip && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                            <Crown className="h-3 w-3 mr-1" />
                            VIP
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {table.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {table.current_players || 0}/{table.max_players}
                    </div>
                    <Badge 
                      variant={table.status === 'open' ? 'default' : 'secondary'}
                      className={table.status === 'open' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                    >
                      {table.status === 'open' ? '🟢 Aberta' : 
                       table.status === 'full' ? '🔴 Completa' : '🟡 Em Andamento'}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent transition-all"
                      onClick={() => window.location.href = `/table/${table.id}`}
                    >
                      👁️ Ver Detalhes
                    </Button>
                    {user && table.status === 'open' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-accent/50 hover:bg-accent/10 hover:border-accent transition-all"
                        onClick={() => setSelectedTable({ id: table.id, title: table.title })}
                      >
                        ⚔️ Candidatar-se
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-2 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all" onClick={() => window.location.href = '/search'}>
              🗺️ Ver Todas as Aventuras
            </Button>
          </div>
        </div>
      </section>

      {user && <VipUpgradeCard />}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-purple-600/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 rpg-title">
              ⚔️ Pronto para Sua Próxima Aventura Épica? 🏰
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Junte-se à maior taverna de aventureiros do Brasil! Encontre sua mesa perfeita ou crie a sua própria saga! ✨🗡️
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {!user ? (
                <Button size="lg" className="text-lg px-10 py-6 rpg-button glow-effect" onClick={() => window.location.href = '/auth'}>
                  <Heart className="mr-3 h-6 w-6" />
                  🌟 Começar Jornada
                </Button>
              ) : (
                <>
                  <Button size="lg" className="text-lg px-10 py-6 rpg-button glow-effect" onClick={() => window.location.href = '/search'}>
                    <Search className="mr-3 h-6 w-6" />
                    🔍 Buscar Aventuras
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-accent/50 hover:bg-accent/10 hover:border-accent transition-all" onClick={() => window.location.href = '/create-table'}>
                    <Sword className="mr-3 h-6 w-6" />
                    ⚔️ Criar Mesa Épica
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold rpg-title">DungeonFinder</h3>
                  <p className="text-xs text-muted-foreground">A Taverna dos Aventureiros</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                🏰 A taverna definitiva para conectar mestres e aventureiros de RPG no Brasil. 
                Encontre sua mesa perfeita e viva histórias épicas que serão lembradas para sempre! ⚔️✨
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="hover:text-primary">📱 Discord</Button>
                <Button variant="ghost" size="sm" className="hover:text-primary">📸 Instagram</Button>
                <Button variant="ghost" size="sm" className="hover:text-primary">🐦 Twitter</Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-primary">🗺️ Navegação</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div><a href="/search" className="hover:text-foreground transition-colors">🔍 Buscar Mesas</a></div>
                <div><a href="/create-table" className="hover:text-foreground transition-colors">⚔️ Criar Mesa</a></div>
                <div><a href="/profile" className="hover:text-foreground transition-colors">🛡️ Meu Perfil</a></div>
                <div><a href="/admin" className="hover:text-foreground transition-colors">👑 Admin</a></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-accent">🆘 Suporte</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div><a href="#" className="hover:text-foreground transition-colors">📚 Central de Ajuda</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">📜 Termos de Uso</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">🔒 Privacidade</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">📧 Contato</a></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 DungeonFinder - A Taverna dos Aventureiros. Todos os direitos reservados. Feito com ❤️⚔️ para a comunidade RPG brasileira! 🇧🇷✨</p>
          </div>
        </div>
      </footer>

      {selectedTable && (
        <ApplicationDialog
          open={!!selectedTable}
          onOpenChange={() => setSelectedTable(null)}
          tableId={selectedTable.id}
          tableTitle={selectedTable.title}
        />
      )}
    </div>
  );
};

export default Index;
