import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Filter as FilterType } from '../../types';

interface FiltroBuscaProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const FiltroBusca: React.FC<FiltroBuscaProps> = ({
  filters,
  onFiltersChange,
  searchTerm,
  onSearchChange
}) => {
  const systems = ['Todos', 'D&D 5e', 'Call of Cthulhu', 'Pathfinder', 'Vampire', 'GURPS', 'Outro'];
  const styles = ['Todos', 'Aventura Épica', 'Horror Investigativo', 'Aventura Marítima', 'Político', 'Exploração', 'Combate'];
  const experienceLevels = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

  const handleFilterChange = (key: keyof FilterType, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'Todos' ? '' : value
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold text-white">Filtros de Busca</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search Term */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Buscar por nome
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Digite o nome da mesa ou campanha..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* System Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sistema
          </label>
          <select
            value={filters.system || 'Todos'}
            onChange={(e) => handleFilterChange('system', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            {systems.map((system) => (
              <option key={system} value={system}>
                {system}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Data da próxima sessão
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Style Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Estilo
          </label>
          <select
            value={filters.style || 'Todos'}
            onChange={(e) => handleFilterChange('style', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            {styles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nível de experiência
          </label>
          <select
            value={filters.experienceLevel || 'Todos'}
            onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => {
              onFiltersChange({ system: '', date: '', style: '', experienceLevel: '' });
              onSearchChange('');
            }}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltroBusca;