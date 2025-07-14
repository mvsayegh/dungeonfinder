
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Users, Calendar, Star, Crown } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TableCardProps {
  table: {
    id: string;
    title: string;
    description: string;
    image_url?: string;
    max_players: number;
    current_players: number;
    session_date?: string;
    location?: string;
    mode: string;
    status: string;
    is_vip: boolean;
    tags?: string[];
    profiles: {
      username: string;
      avatar_url?: string;
      rating: number;
      is_verified: boolean;
    };
    rpg_systems: {
      name: string;
    };
  };
  onJoin?: (tableId: string) => void;
  onView?: (tableId: string) => void;
}

export const TableCard = ({ table, onJoin, onView }: TableCardProps) => {
  const getModeLabel = (mode: string) => {
    const modes = {
      presencial: 'Presencial',
      online_voice: 'Online (Voz)',
      online_text: 'Online (Texto)',
      hybrid: 'Híbrido'
    };
    return modes[mode as keyof typeof modes] || mode;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-green-500',
      full: 'bg-red-500',
      in_progress: 'bg-yellow-500',
      completed: 'bg-gray-500',
      cancelled: 'bg-red-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      open: 'Aberta',
      full: 'Lotada',
      in_progress: 'Em Andamento',
      completed: 'Concluída',
      cancelled: 'Cancelada'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {table.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={table.image_url} 
            alt={table.title}
            className="w-full h-full object-cover"
          />
          {table.is_vip && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-yellow-500/90 text-yellow-900">
                <Crown className="w-3 h-3 mr-1" />
                VIP
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2 mb-2">{table.title}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline">{table.rpg_systems.name}</Badge>
              <Badge variant="outline" className={`${getStatusColor(table.status)} text-white`}>
                {getStatusLabel(table.status)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={table.profiles.avatar_url} />
            <AvatarFallback>{table.profiles.username[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">{table.profiles.username}</span>
              {table.profiles.is_verified && (
                <Badge variant="secondary" className="text-xs">Verificado</Badge>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">
                {table.profiles.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {table.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            {table.current_players}/{table.max_players} jogadores
          </div>

          {table.session_date && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(table.session_date), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
            </div>
          )}

          {table.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              {table.location}
            </div>
          )}

          <div className="flex items-center text-sm text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {getModeLabel(table.mode)}
            </Badge>
          </div>
        </div>

        {table.tags && table.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {table.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {table.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{table.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(table.id)}
          >
            Ver Detalhes
          </Button>
          {table.status === 'open' && table.current_players < table.max_players && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onJoin?.(table.id)}
            >
              Candidatar-se
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
