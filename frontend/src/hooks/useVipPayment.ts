
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useVipPayment = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get VIP settings
  const getVipSettings = useQuery({
    queryKey: ['vip-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .in('key', ['vip_price', 'vip_duration_days']);

      if (error) throw error;
      
      const settings = data.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, string>);

      return {
        price: parseInt(settings.vip_price) || 1990,
        durationDays: parseInt(settings.vip_duration_days) || 30
      };
    },
  });

  // Get user payments
  const getUserPayments = useQuery({
    queryKey: ['user-payments', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('vip_payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Create VIP payment using Mercado Pago
  const createVipPayment = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      const price = getVipSettings.data?.price || 1990;
      
      // Criar preferência no Mercado Pago via edge function
      const { data, error } = await supabase.functions.invoke('create-mercadopago-payment', {
        body: {
          amount: price,
          description: 'VIP Membership - DungeonFinder',
          user_email: user.email,
          user_id: user.id
        }
      });

      if (error) throw error;

      // Abrir link do Mercado Pago em nova aba
      if (data?.payment_url) {
        window.open(data.payment_url, '_blank');
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Redirecionando para pagamento! 💳",
        description: "Você será redirecionado para o Mercado Pago. Complete seu pagamento para ativar o VIP!",
      });
      queryClient.invalidateQueries({ queryKey: ['user-payments'] });
    },
    onError: () => {
      toast({
        title: "Erro no pagamento ❌",
        description: "Não foi possível processar o pagamento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  return {
    vipSettings: getVipSettings.data,
    payments: getUserPayments.data || [],
    isLoading: getVipSettings.isLoading || getUserPayments.isLoading,
    createVipPayment
  };
};
