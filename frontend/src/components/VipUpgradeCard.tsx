
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Zap, Users, Check, Sparkles } from 'lucide-react';
import { useVipPayment } from '@/hooks/useVipPayment';
import { useAuth } from '@/hooks/useAuth';

export const VipUpgradeCard = () => {
  const { user } = useAuth();
  const { vipSettings, createVipPayment } = useVipPayment();

  if (!user || !vipSettings) return null;

  const priceInReais = (vipSettings.price / 100).toFixed(2);

  const vipFeatures = [
    { icon: Star, text: "Destaque nas listagens de mesas", color: "text-yellow-600" },
    { icon: Users, text: "Criar até 20 mesas simultâneas", color: "text-blue-600" },
    { icon: Zap, text: "Badge VIP no perfil e mesas", color: "text-purple-600" },
    { icon: Crown, text: "Acesso prioritário a recursos", color: "text-amber-600" },
    { icon: Sparkles, text: "Suporte premium", color: "text-pink-600" }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-yellow-50/50 via-amber-50/30 to-orange-50/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Crown className="h-16 w-16 text-yellow-600" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-amber-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            👑 Torne-se VIP e Destaque-se! ⚡
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desbloqueie recursos premium e tenha uma experiência épica como nunca antes!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200/50 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Crown className="h-8 w-8 text-yellow-600" />
                <CardTitle className="text-3xl font-bold text-yellow-800">Plano VIP</CardTitle>
                <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-1">
                  ✨ Premium
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-800 mb-2">R$ {priceInReais}</div>
                <div className="text-lg text-yellow-600 mb-4">por {vipSettings.durationDays} dias</div>
                <div className="text-sm text-muted-foreground">
                  💰 Apenas R$ {(parseFloat(priceInReais) / vipSettings.durationDays).toFixed(2)} por dia!
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-center mb-4">🌟 Recursos Exclusivos</h3>
                  {vipFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-white/50 border border-yellow-200/50">
                      <div className={`p-2 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100`}>
                        <feature.icon className={`h-5 w-5 ${feature.color}`} />
                      </div>
                      <span className="font-medium text-gray-700">{feature.text}</span>
                      <Check className="h-5 w-5 text-green-600 ml-auto" />
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-center mb-4">🎯 Por Que Escolher VIP?</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">🚀 Maior Visibilidade</h4>
                      <p className="text-sm text-blue-700">Suas mesas aparecem em destaque nas buscas</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">⚡ Mais Recursos</h4>
                      <p className="text-sm text-purple-700">Crie mais mesas e tenha acesso prioritário</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">👑 Status Premium</h4>
                      <p className="text-sm text-green-700">Badge exclusivo e reconhecimento da comunidade</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-6 border-t border-yellow-200">
                <Button 
                  onClick={() => createVipPayment.mutate()}
                  disabled={createVipPayment.isPending}
                  size="lg"
                  className="text-xl px-12 py-6 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white shadow-2xl hover:shadow-yellow-200/50 transition-all duration-300 transform hover:scale-105"
                >
                  <Crown className="h-6 w-6 mr-3" />
                  {createVipPayment.isPending ? '⏳ Processando...' : '👑 Upgrade para VIP Agora!'}
                  <Sparkles className="h-6 w-6 ml-3" />
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  🔒 Pagamento seguro • ⚡ Ativação instantânea • 🎯 Sem compromisso
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
