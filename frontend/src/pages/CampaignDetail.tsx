import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Users, MapPin, Clock, ArrowLeft, UserPlus } from 'lucide-react';
import { mockCampaigns } from '../data/mockData';
import UserAvatar from '../components/common/UserAvatar';
import RatingStars from '../components/common/RatingStars';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = mockCampaigns.find(c => c.id === id);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Campanha não encontrada</h1>
          <Link
            to="/busca"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Voltar à Busca
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: typeof campaign.status) => {
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

  const handleJoinRequest = () => {
    alert('Solicitação enviada! O mestre será notificado.');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/busca"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à busca</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Campaign Image */}
            {campaign.image && (
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                <img
                  src={campaign.image}
                  alt={campaign.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
              </div>
            )}

            {/* Campaign Info */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">{campaign.name}</h1>
              <p className="text-purple-400 font-medium text-lg mb-4">{campaign.system}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-5 h-5" />
                  <span>Próxima sessão: {formatDate(campaign.nextSession)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Users className="w-5 h-5" />
                  <span>
                    {campaign.currentPlayers.length}/{campaign.maxPlayers} jogadores
                    {availableSlots > 0 && (
                      <span className="text-green-400 ml-1">
                        ({availableSlots} vagas)
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>{campaign.style}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span>{campaign.experienceLevel}</span>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Descrição da Campanha</h2>
                <p className="text-gray-300 leading-relaxed">{campaign.description}</p>
              </div>
            </div>

            {/* Current Players */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Jogadores Aceitos ({campaign.currentPlayers.length})
              </h2>
              
              {campaign.currentPlayers.length === 0 ? (
                <p className="text-gray-400">Nenhum jogador aceito ainda.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campaign.currentPlayers.map((player) => (
                    <Link
                      key={player.id}
                      to={`/perfil/${player.id}`}
                      className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <UserAvatar user={player} size="sm" />
                      <div>
                        <p className="text-white font-medium">{player.name}</p>
                        <RatingStars rating={player.rating} size="sm" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Master Info */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Mestre da Mesa</h2>
              
              <Link
                to={`/perfil/${campaign.master.id}`}
                className="block hover:bg-gray-700 p-3 rounded-lg transition-colors"
              >
                <UserAvatar user={campaign.master} size="lg" showName className="mb-3" />
                <RatingStars rating={campaign.master.rating} className="mb-2" />
                <p className="text-gray-300 text-sm">{campaign.master.bio}</p>
              </Link>
            </div>

            {/* Join Campaign */}
            {campaign.status === 'Aberta' && (
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Participar da Mesa</h2>
                
                {availableSlots > 0 ? (
                  <div>
                    <p className="text-gray-300 mb-4">
                      {availableSlots} vaga{availableSlots !== 1 ? 's' : ''} disponível{availableSlots !== 1 ? 'eis' : ''}
                    </p>
                    <button
                      onClick={handleJoinRequest}
                      className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors"
                    >
                      <UserPlus className="w-5 h-5" />
                      <span>Solicitar Entrada</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-amber-400 mb-4">Mesa lotada</p>
                    <button
                      disabled
                      className="w-full bg-gray-600 text-gray-400 py-3 rounded-lg cursor-not-allowed"
                    >
                      Sem vagas disponíveis
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Campaign Stats */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Informações</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Criada em:</span>
                  <span className="text-gray-300">
                    {new Date(campaign.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Sistema:</span>
                  <span className="text-gray-300">{campaign.system}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estilo:</span>
                  <span className="text-gray-300">{campaign.style}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Experiência:</span>
                  <span className="text-gray-300">{campaign.experienceLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;