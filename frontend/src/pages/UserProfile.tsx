import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Calendar, Users } from 'lucide-react';
import { mockUsers, mockCampaigns } from '../data/mockData';
import UserAvatar from '../components/common/UserAvatar';
import RatingStars from '../components/common/RatingStars';
import CommentBox from '../components/common/CommentBox';
import CardMesa from '../components/campaigns/CardMesa';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = mockUsers.find(u => u.id === id);
  const [showRatingForm, setShowRatingForm] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Usuário não encontrado</h1>
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

  // Find campaigns where this user is the master
  const userCampaigns = mockCampaigns.filter(campaign => campaign.master.id === user.id);

  const handleAddComment = async (content: string, rating: number) => {
    console.log('Adding comment:', { content, rating });
    // Here you would typically send this to your backend
    setShowRatingForm(false);
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
          <span>Voltar</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Info */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
                <UserAvatar user={user} size="lg" />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                  <RatingStars rating={user.rating} size="lg" className="mb-3" />
                  <p className="text-gray-300">{user.bio}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowRatingForm(!showRatingForm)}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Deixar Avaliação</span>
                </button>
              </div>
            </div>

            {/* User Campaigns */}
            {userCampaigns.length > 0 && (
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Users className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">
                    Campanhas como Mestre ({userCampaigns.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userCampaigns.map((campaign) => (
                    <CardMesa
                      key={campaign.id}
                      campaign={campaign}
                      showJoinButton={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <CommentBox
                comments={user.comments}
                onAddComment={showRatingForm ? handleAddComment : undefined}
                allowNewComments={showRatingForm}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Estatísticas</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Avaliação média:</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-amber-400 font-medium">{user.rating.toFixed(1)}</span>
                    <span className="text-gray-400">/ 5.0</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total de avaliações:</span>
                  <span className="text-gray-300">{user.comments.length}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Mesas ativas:</span>
                  <span className="text-gray-300">
                    {userCampaigns.filter(c => c.status === 'Aberta' || c.status === 'Em andamento').length}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total de mesas:</span>
                  <span className="text-gray-300">{userCampaigns.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h2>
              
              <div className="space-y-3">
                <Link
                  to="/busca"
                  className="flex items-center space-x-2 w-full text-left text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Ver todas as mesas</span>
                </Link>
                
                <Link
                  to="/cadastro-campanha"
                  className="flex items-center space-x-2 w-full text-left text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>Criar nova mesa</span>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Contato</h2>
              <p className="text-gray-400 text-sm">
                Entre em contato através do sistema de mensagens da plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;