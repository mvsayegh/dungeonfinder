import React, { useState, useMemo } from 'react';
import { mockCampaigns } from '../data/mockData';
import { Filter } from '../types';
import FiltroBusca from '../components/search/FiltroBusca';
import CardMesa from '../components/campaigns/CardMesa';

const Search: React.FC = () => {
  const [filters, setFilters] = useState<Filter>({
    system: '',
    date: '',
    style: '',
    experienceLevel: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter((campaign) => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesName = campaign.name.toLowerCase().includes(searchLower);
        const matchesDescription = campaign.description.toLowerCase().includes(searchLower);
        const matchesMaster = campaign.master.name.toLowerCase().includes(searchLower);
        
        if (!matchesName && !matchesDescription && !matchesMaster) {
          return false;
        }
      }

      // System filter
      if (filters.system && campaign.system !== filters.system) {
        return false;
      }

      // Date filter
      if (filters.date) {
        const sessionDate = new Date(campaign.nextSession).toISOString().split('T')[0];
        if (sessionDate !== filters.date) {
          return false;
        }
      }

      // Style filter
      if (filters.style && campaign.style !== filters.style) {
        return false;
      }

      // Experience level filter
      if (filters.experienceLevel && campaign.experienceLevel !== filters.experienceLevel) {
        return false;
      }

      return true;
    });
  }, [filters, searchTerm]);

  const handleJoinCampaign = (campaignId: string) => {
    alert(`Solicitação enviada para participar da campanha ${campaignId}!`);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Buscar Mesas de RPG</h1>
          <p className="text-gray-400">
            Encontre a campanha perfeita para sua próxima aventura
          </p>
        </div>

        <FiltroBusca
          filters={filters}
          onFiltersChange={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="mb-6">
          <p className="text-gray-300">
            {filteredCampaigns.length} mesa{filteredCampaigns.length !== 1 ? 's' : ''} encontrada{filteredCampaigns.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎲</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Nenhuma mesa encontrada
            </h2>
            <p className="text-gray-400 mb-6">
              Tente ajustar os filtros ou criar uma nova campanha
            </p>
            <button
              onClick={() => {
                setFilters({ system: '', date: '', style: '', experienceLevel: '' });
                setSearchTerm('');
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CardMesa
                key={campaign.id}
                campaign={campaign}
                onJoinClick={handleJoinCampaign}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;