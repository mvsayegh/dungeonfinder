import React from 'react';
import { Users, Dice6, Crown, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { AdminStats as AdminStatsType } from '../../types/admin';

interface AdminStatsProps {
  stats: AdminStatsType;
}

const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total de Usuários',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-600',
      change: `+${stats.newUsersThisMonth} este mês`
    },
    {
      title: 'Total de Mesas',
      value: stats.totalCampaigns.toString(),
      icon: Dice6,
      color: 'bg-purple-600',
      change: `+${stats.newCampaignsThisMonth} este mês`
    },
    {
      title: 'Mesas Ativas',
      value: stats.activeCampaigns.toString(),
      icon: Calendar,
      color: 'bg-green-600',
      change: `${Math.round((stats.activeCampaigns / stats.totalCampaigns) * 100)}% do total`
    },
    {
      title: 'Mestres Ativos',
      value: stats.totalMasters.toString(),
      icon: TrendingUp,
      color: 'bg-amber-600',
      change: `${Math.round((stats.totalMasters / stats.totalUsers) * 100)}% dos usuários`
    },
    {
      title: 'Usuários VIP',
      value: stats.vipUsers.toString(),
      icon: Crown,
      color: 'bg-yellow-600',
      change: `${Math.round((stats.vipUsers / stats.totalUsers) * 100)}% dos usuários`
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${stats.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'bg-emerald-600',
      change: 'Último mês'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((card, index) => (
        <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
              <p className="text-gray-500 text-xs mt-1">{card.change}</p>
            </div>
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;