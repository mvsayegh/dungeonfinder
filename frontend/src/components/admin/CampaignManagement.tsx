import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Eye, Flag, Star } from 'lucide-react';
import { AdminCampaign, AdminFilters } from '../../types/admin';

interface CampaignManagementProps {
  campaigns: AdminCampaign[];
  onCampaignAction: (campaignId: string, action: string) => void;
}

const CampaignManagement: React.FC<CampaignManagementProps> = ({ campaigns, onCampaignAction }) => {
  const [filters, setFilters] = useState<AdminFilters['campaigns']>({
    status: '',
    system: '',
    search: ''
  });

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filters.search && !campaign.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !campaign.master.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && campaign.status !== filters.status) return false;
    if (filters.system && campaign.system !== filters.system) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'pending': return 'bg-yellow-600 text-white';
      case 'approved': return 'bg-blue-600 text-white';
      case 'rejected': return 'bg-red-600 text-white';
      case 'completed': return 'bg-gray-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Filtros</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar campanha..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            <option value="">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="approved">Aprovada</option>
            <option value="active">Ativa</option>
            <option value="completed">Concluída</option>
            <option value="rejected">Rejeitada</option>
          </select>
          
          <select
            value={filters.system}
            onChange={(e) => setFilters(prev => ({ ...prev, system: e.target.value }))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            <option value="">Todos os sistemas</option>
            <option value="D&D 5e">D&D 5e</option>
            <option value="Call of Cthulhu">Call of Cthulhu</option>
            <option value="Pathfinder">Pathfinder</option>
            <option value="Vampire">Vampire</option>
            <option value="GURPS">GURPS</option>
          </select>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">
            Campanhas ({filteredCampaigns.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Campanha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Mestre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Jogadores
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Próxima Sessão
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Relatórios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-white font-medium">{campaign.name}</p>
                        {campaign.isPromoted && <Star className="w-4 h-4 text-yellow-400" />}
                      </div>
                      <p className="text-gray-400 text-sm">{campaign.system}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white">{campaign.master.name}</p>
                      <p className="text-gray-400 text-sm">{campaign.master.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {campaign.playersCount}/{campaign.maxPlayers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {new Date(campaign.nextSession).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.reportCount > 0 ? (
                      <span className="text-red-400 font-medium">
                        {campaign.reportCount}
                      </span>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onCampaignAction(campaign.id, 'view')}
                        className="text-blue-400 hover:text-blue-300"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {campaign.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onCampaignAction(campaign.id, 'approve')}
                            className="text-green-400 hover:text-green-300"
                            title="Aprovar"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onCampaignAction(campaign.id, 'reject')}
                            className="text-red-400 hover:text-red-300"
                            title="Rejeitar"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => onCampaignAction(campaign.id, 'promote')}
                        className={`${campaign.isPromoted ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-300`}
                        title={campaign.isPromoted ? 'Remover destaque' : 'Promover'}
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      {campaign.reportCount > 0 && (
                        <button
                          onClick={() => onCampaignAction(campaign.id, 'reports')}
                          className="text-orange-400 hover:text-orange-300"
                          title="Ver relatórios"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;