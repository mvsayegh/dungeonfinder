
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useTableManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get table applications for master
  const getTableApplications = useQuery({
    queryKey: ['table-applications', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('table_applications')
        .select(`
          *,
          profiles!table_applications_player_id_fkey (username, full_name, avatar_url),
          rpg_tables (title)
        `)
        .in('table_id', 
          await supabase
            .from('rpg_tables')
            .select('id')
            .eq('master_id', user.id)
            .then(({ data }) => data?.map(t => t.id) || [])
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Accept application
  const acceptApplication = useMutation({
    mutationFn: async (applicationId: string) => {
      // Get application details first
      const { data: application, error: appError } = await supabase
        .from('table_applications')
        .select('player_id, table_id')
        .eq('id', applicationId)
        .single();

      if (appError) throw appError;

      // Update application status
      const { error: updateError } = await supabase
        .from('table_applications')
        .update({ status: 'accepted' })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      // Add player to table
      const { error: playerError } = await supabase
        .from('table_players')
        .insert({
          table_id: application.table_id,
          player_id: application.player_id
        });

      if (playerError) throw playerError;
    },
    onSuccess: () => {
      toast({
        title: "Candidatura aceita!",
        description: "O jogador foi adicionado à mesa.",
      });
      queryClient.invalidateQueries({ queryKey: ['table-applications'] });
      queryClient.invalidateQueries({ queryKey: ['user-tables'] });
    },
    onError: () => {
      toast({
        title: "Erro ao aceitar candidatura",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  // Reject application
  const rejectApplication = useMutation({
    mutationFn: async (applicationId: string) => {
      const { error } = await supabase
        .from('table_applications')
        .update({ status: 'rejected' })
        .eq('id', applicationId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Candidatura rejeitada",
        description: "O jogador foi notificado.",
      });
      queryClient.invalidateQueries({ queryKey: ['table-applications'] });
    },
    onError: () => {
      toast({
        title: "Erro ao rejeitar candidatura",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  // Remove player from table
  const removePlayer = useMutation({
    mutationFn: async ({ tableId, playerId }: { tableId: string; playerId: string }) => {
      const { error } = await supabase
        .from('table_players')
        .delete()
        .eq('table_id', tableId)
        .eq('player_id', playerId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Jogador removido!",
        description: "O jogador foi removido da mesa.",
      });
      queryClient.invalidateQueries({ queryKey: ['user-tables'] });
    },
    onError: () => {
      toast({
        title: "Erro ao remover jogador",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  return {
    applications: getTableApplications.data || [],
    isLoading: getTableApplications.isLoading,
    acceptApplication,
    rejectApplication,
    removePlayer
  };
};
