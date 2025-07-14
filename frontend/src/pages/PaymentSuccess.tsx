
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "🎉 Pagamento realizado com sucesso!",
      description: "Seu status VIP será ativado em alguns minutos. Bem-vindo ao clube exclusivo!",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-600" />
              <Crown className="absolute -top-2 -right-2 h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Pagamento Confirmado! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-yellow-800">
              👑 Bem-vindo ao VIP!
            </p>
            <p className="text-muted-foreground">
              Seu status VIP será ativado automaticamente em alguns minutos.
              Agora você pode aproveitar todos os recursos premium!
            </p>
          </div>

          <div className="bg-white/60 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold mb-2 text-yellow-800">✨ Recursos Desbloqueados:</h3>
            <ul className="text-sm space-y-1 text-left">
              <li className="flex items-center">
                <Sparkles className="h-4 w-4 text-yellow-600 mr-2" />
                Destaque nas listagens
              </li>
              <li className="flex items-center">
                <Sparkles className="h-4 w-4 text-yellow-600 mr-2" />
                Até 20 mesas simultâneas
              </li>
              <li className="flex items-center">
                <Sparkles className="h-4 w-4 text-yellow-600 mr-2" />
                Badge VIP exclusivo
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/profile')}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
            >
              <Crown className="mr-2 h-4 w-4" />
              Ver Meu Perfil VIP
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Voltar ao Início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
