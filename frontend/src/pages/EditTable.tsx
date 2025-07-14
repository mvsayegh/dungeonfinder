
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

const EditTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [table, setTable] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    max_players: 4,
    session_frequency: '',
    location: ''
  });

  useEffect(() => {
    if (id) {
      fetchTable();
    }
  }, [id]);

  const fetchTable = async () => {
    try {
      const { data, error } = await supabase
        .from('rpg_tables')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Verificar se o usuário é o mestre da mesa
      if (data.master_id !== user?.id) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para editar esta mesa.",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      setTable(data);
      setFormData({
        title: data.title || '',
        description: data.description || '',
        max_players: data.max_players || 4,
        session_frequency: data.session_frequency || '',
        location: data.location || ''
      });
    } catch (error) {
      console.error('Erro ao carregar mesa:', error);
      toast({
        title: "Erro ao carregar mesa",
        description: "Não foi possível carregar os dados da mesa.",
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Título e descrição são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('rpg_tables')
        .update({
          title: formData.title,
          description: formData.description,
          max_players: formData.max_players,
          session_frequency: formData.session_frequency,
          location: formData.location,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Mesa atualizada!",
        description: "As informações da mesa foram salvas com sucesso."
      });
      
      navigate(`/table/${id}`);
    } catch (error) {
      console.error('Erro ao salvar mesa:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Editar Mesa</h1>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Mesa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Título da Mesa *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Aventuras em Waterdeep"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descrição *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva sua campanha..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Máximo de Jogadores
                  </label>
                  <Input
                    type="number"
                    min="2"
                    max="8"
                    value={formData.max_players}
                    onChange={(e) => setFormData({ ...formData, max_players: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Frequência das Sessões
                  </label>
                  <Input
                    value={formData.session_frequency}
                    onChange={(e) => setFormData({ ...formData, session_frequency: e.target.value })}
                    placeholder="Ex: Semanal, Quinzenal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Localização
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: São Paulo, SP ou Online"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditTable;
