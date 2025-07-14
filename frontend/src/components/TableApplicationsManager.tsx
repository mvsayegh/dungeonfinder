
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check, X, User } from 'lucide-react';
import { useTableManagement } from '@/hooks/useTableManagement';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const TableApplicationsManager = () => {
  const { applications, acceptApplication, rejectApplication, isLoading } = useTableManagement();

  if (isLoading) {
    return <div>Carregando candidaturas...</div>;
  }

  const pendingApplications = applications.filter(app => app.status === 'pending');

  if (pendingApplications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Nenhuma candidatura pendente</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Candidaturas Pendentes</h2>
      {pendingApplications.map((application) => (
        <Card key={application.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={application.profiles?.avatar_url} />
                  <AvatarFallback>
                    {application.profiles?.full_name?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold">{application.profiles?.full_name}</h3>
                    <p className="text-sm text-muted-foreground">@{application.profiles?.username}</p>
                  </div>
                  <div>
                    <p className="font-medium">{application.rpg_tables?.title}</p>
                    {application.message && (
                      <p className="text-sm text-muted-foreground mt-2">
                        "{application.message}"
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Candidatou-se {formatDistanceToNow(new Date(application.created_at), { 
                      addSuffix: true, 
                      locale: ptBR 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => acceptApplication.mutate(application.id)}
                  disabled={acceptApplication.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Aceitar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => rejectApplication.mutate(application.id)}
                  disabled={rejectApplication.isPending}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Rejeitar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
