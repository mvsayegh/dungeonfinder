import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';
import { Campaign } from '../../types';
import UserAvatar from '../common/UserAvatar';

interface CardMesaProps {
  campaign: Campaign;
  showJoinButton?: boolean;
  onJoinClick?: (campaignId: string) => void;
}

const CardMesa: React.FC<CardMesaProps> = ({
  campaign,
  showJoinButton = true,
  onJoinClick
}) => {
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'Aberta':
        return 'bg-green-600 text-white';
      case 'Em andamento':
        return 'bg-amber-600 text-white';
      case 'Encerrada':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const availableSlots = campaign.maxPlayers - campaign.currentPlayers.length;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-500 transition-colors group">
      {/* Campaign Image */}
      {campaign.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={campaign.image}
            alt={campaign.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Campaign Title and System */}
        <div className="mb-4">
          <Link
            to={`/mesa/${campaign.id}`}
            className="text-xl font-bold text-white hover:text-amber-400 transition-colors line-clamp-2"
          >
            {campaign.name}
          </Link>
          <p className="text-purple-400 font-medium mt-1">{campaign.system}</p>
        </div>

        {/* Master Info */}
        <div className="flex items-center space-x-3 mb-4">
          <UserAvatar user={campaign.master} size="sm" />
          <div>
            <p className="text-sm text-gray-300">Mestre</p>
            <Link
              to={`/perfil/${campaign.master.id}`}
              className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              {campaign.master.name}
            </Link>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Próxima sessão: {formatDate(campaign.nextSession)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <Users className="w-4 h-4" />
            <span>
              {campaign.currentPlayers.length}/{campaign.maxPlayers} jogadores
              {availableSlots > 0 && (
                <span className="text-green-400 ml-1">
                  ({availableSlots} vagas)
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{campaign.style}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <Clock className="w-4 h-4" />
            <span>{campaign.experienceLevel}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {campaign.description}
        </p>

        {/* Action Button */}
        {showJoinButton && campaign.status === 'Aberta' && availableSlots > 0 && (
          <button
            onClick={() => onJoinClick?.(campaign.id)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Quero Participar
          </button>
        )}

        {campaign.status === 'Aberta' && availableSlots === 0 && (
          <button
            disabled
            className="w-full bg-gray-600 text-gray-400 font-medium py-2 px-4 rounded-lg cursor-not-allowed"
          >
            Mesa Lotada
          </button>
        )}

        {campaign.status !== 'Aberta' && (
          <Link
            to={`/mesa/${campaign.id}`}
            className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            Ver Detalhes
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardMesa;