
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Users, 
  Gamepad2, 
  Settings, 
  Trash2, 
  Shield,
  Crown,
  BarChart3,
  UserCheck,
  Edit3,
  Eye
} from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { users, tables, settings, isLoading, updateUserType, deleteTable, updateSetting } = useAdmin();
  const [settingValues, setSettingValues] = useState<Record<string, string>>({});
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    variant?: "default" | "destructive";
  }>({ open: false, title: '', description: '', onConfirm: () => {} });

  // Check if user is admin
  const userProfile = users?.find(u => u.id === user?.id);
  if (!isLoading && userProfile?.user_type !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = {
    totalUsers: users?.length || 0,
    totalTables: tables?.length || 0,
    vipUsers: users?.filter(u => u.is_vip).length || 0,
    activeTables: tables?.filter(t => t.status === 'open').length || 0
  };

  const handleUpdateSetting = (key: string) => {
    const value = settingValues[key];
    if (value !== undefined) {
      updateSetting.mutate({ key, value });
    }
  };

  const handleDeleteTable = (tableId: string, tableName: string) => {
    setConfirmDialog({
      open: true,
      title: "Confirmar Exclusão",
      description: `Tem certeza que deseja deletar a mesa "${tableName}"? Esta ação não pode ser desfeita.`,
      onConfirm: () => {
        deleteTable.mutate(tableId);
        setConfirmDialog(prev => ({ ...prev, open: false }));
      },
      variant: "destructive"
    });
  };

  const handleUpdateUserType = (userId: string, userType: 'player' | 'master' | 'admin' | 'vip', userName: string) => {
    const typeNames = {
      player: 'Jogador',
      master: 'Mestre', 
      admin: 'Administrador',
      vip: 'VIP'
    };

    setConfirmDialog({
      open: true,
      title: "Confirmar Alteração",
      description: `Tem certeza que deseja alterar o tipo de usuário de "${userName}" para "${typeNames[userType]}"?`,
      onConfirm: () => {
        updateUserType.mutate({ userId, userType });
        setConfirmDialog(prev => ({ ...prev, open: false }));
      }
    });
  };

  const handleViewUser = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const handleViewTable = (tableId: string) => {
    navigate(`/table/${tableId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="outline" onClick={() => navigate('/')}>
              Voltar ao Site
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-200/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Usuários</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-200/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Mesas</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalTables}</p>
                </div>
                <Gamepad2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-200/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Usuários VIP</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.vipUsers}</p>
                </div>
                <Crown className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-200/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mesas Ativas</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.activeTables}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="tables">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Mesas
            </TabsTrigger>
            <TabsTrigger value="vip">
              <Crown className="h-4 w-4 mr-2" />
              VIP Manager
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gerenciar Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users?.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar_url || ''} />
                          <AvatarFallback className="bg-primary/10">
                            {user.full_name[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">{user.full_name}</span>
                            {user.is_vip && <Crown className="h-4 w-4 text-yellow-500" />}
                            {user.is_verified && <UserCheck className="h-4 w-4 text-green-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">@{user.username}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={
                              user.user_type === 'admin' ? 'destructive' :
                              user.user_type === 'master' ? 'default' : 
                              user.user_type === 'vip' ? 'secondary' : 'outline'
                            }>
                              {user.user_type === 'admin' ? 'Admin' :
                               user.user_type === 'master' ? 'Mestre' : 
                               user.user_type === 'vip' ? 'VIP' : 'Jogador'}
                            </Badge>
                            {user.rating && (
                              <span className="text-sm text-muted-foreground">
                                ⭐ {user.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewUser(user.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Select
                          value={user.user_type || 'player'}
                          onValueChange={(value: 'player' | 'master' | 'admin' | 'vip') => 
                            handleUpdateUserType(user.id, value, user.full_name)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="player">Jogador</SelectItem>
                            <SelectItem value="master">Mestre</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tables" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5" />
                  Gerenciar Mesas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tables?.map((table) => (
                    <div key={table.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{table.title}</h3>
                          {table.is_vip && <Crown className="h-4 w-4 text-yellow-500" />}
                          <Badge variant={
                            table.status === 'open' ? 'default' :
                            table.status === 'full' ? 'secondary' : 
                            table.status === 'in_progress' ? 'outline' : 'destructive'
                          }>
                            {table.status === 'open' ? 'Aberta' :
                             table.status === 'full' ? 'Completa' : 
                             table.status === 'in_progress' ? 'Em Andamento' : 'Fechada'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <span>Mestre: {table.profiles?.full_name}</span>
                          <span>Sistema: {table.rpg_systems?.name}</span>
                          <span>Jogadores: {table.current_players}/{table.max_players}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {table.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewTable(table.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => navigate(`/table/${table.id}/edit`)}>
                          <Edit3 className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteTable(table.id, table.title)}
                          disabled={deleteTable.isPending}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Deletar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vip" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  Gerenciar VIPs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
                      <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-800">{stats.vipUsers}</div>
                      <div className="text-sm text-yellow-600">Usuários VIP Ativos</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">R$ 19,90</div>
                      <div className="text-sm text-muted-foreground">Preço Mensal VIP</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">30</div>
                      <div className="text-sm text-muted-foreground">Dias de Duração</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Usuários VIP Ativos</h4>
                    {users?.filter(u => u.is_vip).map((vipUser) => (
                      <div key={vipUser.id} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={vipUser.avatar_url || ''} />
                            <AvatarFallback className="bg-yellow-100">
                              {vipUser.full_name[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{vipUser.full_name}</span>
                              <Crown className="h-4 w-4 text-yellow-500" />
                            </div>
                            <p className="text-sm text-muted-foreground">@{vipUser.username}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateUserType(vipUser.id, 'player', vipUser.full_name)}
                        >
                          Remover VIP
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {settings?.map((setting) => (
                    <div key={setting.key} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">
                          {setting.description || setting.key}
                        </label>
                        <Badge variant="outline" className="text-xs">
                          {setting.key}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={(settingValues[setting.key] ?? setting.value) || ''}
                          onChange={(e) => setSettingValues(prev => ({
                            ...prev,
                            [setting.key]: e.target.value
                          }))}
                          placeholder={setting.value || ''}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleUpdateSetting(setting.key)}
                          disabled={updateSetting.isPending}
                        >
                          {updateSetting.isPending ? 'Salvando...' : 'Salvar'}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Valor atual: <code className="bg-muted px-1 py-0.5 rounded text-xs">{setting.value || 'não definido'}</code>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
        variant={confirmDialog.variant}
        confirmText={confirmDialog.variant === "destructive" ? "Deletar" : "Confirmar"}
      />
    </div>
  );
};

export default AdminDashboard;
