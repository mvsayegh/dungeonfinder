
import { Button } from '@/components/ui/button';
import { Search, Users, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl float-animation"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-lg float-animation" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
            Encontre Sua Mesa Épica
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Conecte-se com mestres e jogadores de RPG, crie aventuras inesquecíveis e 
            mergulhe em mundos fantásticos com a maior plataforma de RPG do Brasil.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 glow-effect"
              onClick={() => navigate('/search')}
            >
              <Search className="mr-2 h-5 w-5" />
              Buscar Mesas
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => navigate('/auth')}
            >
              <Users className="mr-2 h-5 w-5" />
              Junte-se Agora
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-card/40 backdrop-blur-sm border rounded-lg p-6 hover:bg-card/60 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Busca Inteligente</h3>
              <p className="text-muted-foreground">
                Encontre mesas por sistema, localização, estilo e disponibilidade.
              </p>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border rounded-lg p-6 hover:bg-card/60 transition-colors">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunidade Ativa</h3>
              <p className="text-muted-foreground">
                Conecte-se com milhares de jogadores e mestres apaixonados por RPG.
              </p>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border rounded-lg p-6 hover:bg-card/60 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seguro & Confiável</h3>
              <p className="text-muted-foreground">
                Sistema de avaliações e verificação para garantir experiências incríveis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
