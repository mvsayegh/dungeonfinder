import React, { useState } from 'react';
import { Search, Filter, Crown, Ban, CheckCircle, XCircle, Eye, Mail } from 'lucide-react';
import { AdminUser, AdminFilters } from '../../types/admin';
import UserAvatar from '../common/UserAvatar';

interface UserManagementProps {
  users: AdminUser[];
  onUserAction: (userId: string, action: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onUserAction }) => {
  const [filters, setFilters] = useState<AdminFilters['users']>({
    role: '',
    status: '',
    isVip: null,
    search: ''
  });

  const filteredUsers = users.filter(user => {
    if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !user.email.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.role && user.role !== filters.role) return false;
    if (filters.status && user.status !== filters.status) return false;
    if (filters.isVip !== null && user.isVip !== filters.isVip) return false;
    return true;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-600 text-white';
      case 'master': return 'bg-purple-600 text-white';
      case 'vip': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'suspended': return 'text-yellow-400';
      case 'banned': return 'text-red-400';
      default: return 'text-gray-400';
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          
          <select
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            <option value="">Todos os papéis</option>
            <option value="user">Usuário</option>
            <option value="master">Mestre</option>
            <option value="admin">Admin</option>
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="suspended">Suspenso</option>
            <option value="banned">Banido</option>
          </select>
          
          <select
            value={filters.isVip === null ? '' : filters.isVip.toString()}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              isVip: e.target.value === '' ? null : e.target.value === 'true' 
            }))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            <option value="">Todos</option>
            <option value="true">VIP</option>
            <option value="false">Não VIP</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">
            Usuários ({filteredUsers.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Papel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Avaliação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Mesas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Último Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <UserAvatar 
                        user={{
                          id: user.id,
                          name: user.name,
                          avatar: user.avatar || '',
                          bio: '',
                          rating: user.rating,
                          comments: []
                        }} 
                        size="sm" 
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-white font-medium">{user.name}</p>
                          {user.isVip && <Crown className="w-4 h-4 text-yellow-400" />}
                        </div>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {user.rating.toFixed(1)} ⭐
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {user.campaignsCreated}/{user.campaignsJoined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {new Date(user.lastLogin).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onUserAction(user.id, 'view')}
                        className="text-blue-400 hover:text-blue-300"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onUserAction(user.id, 'message')}
                        className="text-green-400 hover:text-green-300"
                        title="Enviar mensagem"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      {user.status === 'active' ? (
                        <button
                          onClick={() => onUserAction(user.id, 'suspend')}
                          className="text-yellow-400 hover:text-yellow-300"
                          title="Suspender"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onUserAction(user.id, 'activate')}
                          className="text-green-400 hover:text-green-300"
                          title="Ativar"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onUserAction(user.id, 'ban')}
                        className="text-red-400 hover:text-red-300"
                        title="Banir"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
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

export default UserManagement;