
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useTableApplications = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Apply to table
  const applyToTable = useMutation({
    mutationFn: async ({ tableId, message }: { tableId: string; message: string }) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      // Check if user already applied
      const { data: existingApplication } = await supabase
        .from('table_applications')
        .select('id')
        .eq('table_id', tableId)
        .eq('player_id', user.id)
        .single();

      if (existingApplication) {
        throw new Error('Already applied to this table');
      }

      const { error } = await supabase
        .from('table_applications')
        .insert({
          table_id: tableId,
          player_id: user.id,
          message: message || 'Gostaria de participar desta mesa!',
          status: 'pending'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Candidatura enviada!",
        description: "Sua solicitação foi enviada ao mestre da mesa.",
      });
      queryClient.invalidateQueries({ queryKey: ['user-applications'] });
      queryClient.invalidateQueries({ queryKey: ['rpg-tables'] });
    },
    onError: (error: Error) => {
      if (error.message === 'Already applied to this table') {
        toast({
          title: "Candidatura já enviada",
          description: "Você já se candidatou a esta mesa.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao enviar candidatura",
          description: "Tente novamente em alguns instantes.",
          variant: "destructive",
        });
      }
    },
  });

  // Get user applications
  const getUserApplications = (userId?: string) => useQuery({
    queryKey: ['user-applications', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('table_applications')
        .select(`
          *,
          rpg_tables (
            title,
            profiles (username)
          )
        `)
        .eq('player_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  // Get table applications (for masters)
  const getTableApplications = (tableId?: string) => useQuery({
    queryKey: ['table-applications', tableId],
    queryFn: async () => {
      if (!tableId) return [];
      
      const { data, error } = await supabase
        .from('table_applications')
        .select(`
          *,
          profiles (
            username,
            avatar_url,
            rating,
            bio
          )
        `)
        .eq('table_id', tableId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!tableId,
  });

  // Update application status (for masters)
  const updateApplicationStatus = useMutation({
    mutationFn: async ({ 
      applicationId, 
      status, 
      tableId 
    }: { 
      applicationId: string; 
      status: 'accepted' | 'rejected';
      tableId: string;
    }) => {
      const { error } = await supabase
        .from('table_applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;

      // If accepted, add player to table
      if (status === 'accepted') {
        const { data: application } = await supabase
          .from('table_applications')
          .select('player_id')
          .eq('id', applicationId)
          .single();

        if (application) {
          const { error: playerError } = await supabase
            .from('table_players')
            .insert({
              table_id: tableId,
              player_id: application.player_id
            });

          if (playerError) throw playerError;
        }
      }
    },
    onSuccess: (_, { status }) => {
      toast({
        title: status === 'accepted' ? "Candidatura aceita!" : "Candidatura rejeitada",
        description: status === 'accepted' 
          ? "O jogador foi adicionado à mesa." 
          : "O jogador foi notificado da decisão.",
      });
      queryClient.invalidateQueries({ queryKey: ['table-applications'] });
      queryClient.invalidateQueries({ queryKey: ['rpg-tables'] });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar candidatura",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  return {
    applyToTable,
    getUserApplications,
    getTableApplications,
    updateApplicationStatus
  };
};
