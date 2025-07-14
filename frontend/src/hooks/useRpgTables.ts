
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useRpgTables = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get RPG systems
  const getRpgSystems = useQuery({
    queryKey: ['rpg-systems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rpg_systems')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data;
    },
  });

  // Get RPG tables
  const getRpgTables = useQuery({
    queryKey: ['rpg-tables'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rpg_tables')
        .select(`
          *,
          profiles!rpg_tables_master_id_fkey (
            username,
            avatar_url,
            rating,
            is_verified
          ),
          rpg_systems (
            name
          )
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Create new table
  const createTable = useMutation({
    mutationFn: async (tableData: any) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      // Find system ID by name
      const { data: system, error: systemError } = await supabase
        .from('rpg_systems')
        .select('id')
        .eq('name', tableData.system)
        .single();

      if (systemError) throw systemError;

      const { error } = await supabase
        .from('rpg_tables')
        .insert({
          master_id: user.id,
          system_id: system.id,
          title: tableData.title,
          description: tableData.description,
          max_players: tableData.maxPlayers,
          mode: tableData.mode === 'online' ? 'online_voice' : 
                tableData.mode === 'hibrido' ? 'hybrid' : 'presencial',
          location: tableData.location,
          session_frequency: tableData.schedule,
          is_vip: tableData.isVip,
          tags: tableData.tags,
          image_url: tableData.image || null
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Mesa criada com sucesso!",
        description: "Sua mesa está disponível para jogadores se candidatarem.",
      });
      queryClient.invalidateQueries({ queryKey: ['user-tables'] });
      queryClient.invalidateQueries({ queryKey: ['rpg-tables'] });
    },
    onError: (error: Error) => {
      console.error('Erro ao criar mesa:', error);
      toast({
        title: "Erro ao criar mesa",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  return {
    systems: getRpgSystems.data,
    tables: getRpgTables.data,
    isLoading: getRpgSystems.isLoading || getRpgTables.isLoading,
    createTable
  };
};
