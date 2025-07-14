
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useAdmin = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get all users
  const getUsers = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Get all tables
  const getTables = useQuery({
    queryKey: ['admin-tables'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rpg_tables')
        .select(`
          *,
          profiles!rpg_tables_master_id_fkey (username, full_name),
          rpg_systems (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Get system settings
  const getSettings = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('key');

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Update user type
  const updateUserType = useMutation({
    mutationFn: async ({ userId, userType }: { userId: string; userType: 'player' | 'master' | 'admin' | 'vip' }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ user_type: userType })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Usuário atualizado!",
        description: "Tipo de usuário alterado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar usuário",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  // Delete table
  const deleteTable = useMutation({
    mutationFn: async (tableId: string) => {
      const { error } = await supabase
        .from('rpg_tables')
        .delete()
        .eq('id', tableId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Mesa deletada!",
        description: "A mesa foi removida do sistema.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-tables'] });
    },
    onError: () => {
      toast({
        title: "Erro ao deletar mesa",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  // Update setting
  const updateSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from('system_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Configuração atualizada!",
        description: "As configurações do sistema foram salvas.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar configuração",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  return {
    users: getUsers.data,
    tables: getTables.data,
    settings: getSettings.data,
    isLoading: getUsers.isLoading || getTables.isLoading || getSettings.isLoading,
    updateUserType,
    deleteTable,
    updateSetting
  };
};
