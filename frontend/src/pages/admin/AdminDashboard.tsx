import React, { useState } from 'react';
import { Shield, Users, Dice6, Crown, Flag, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminStats from '../../components/admin/AdminStats';
import UserManagement from '../../components/admin/UserManagement';
import CampaignManagement from '../../components/admin/CampaignManagement';
import VipManagement from '../../components/admin/VipManagement';
import { adminStats, adminUsers, adminCampaigns, vipPlans } from '../../data/adminMockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check if user is admin
  if (!user || user.id !== '1') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Acesso Negado</h1>
          <p className="text-gray-400">Você não tem permissão para acessar esta área.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'users', name: 'Usuários', icon: Users },
    { id: 'campaigns', name: 'Campanhas', icon: Dice6 },
    { id: 'vip', name: 'VIP', icon: Crown },
    { id: 'reports', name: 'Relatórios', icon: Flag }
  ];

  const handleUserAction = (userId: string, action: string) => {
    console.log(`User action: ${action} for user ${userId}`);
    // Implement user actions here
  };

  const handleCampaignAction = (campaignId: string, action: string) => {
    console.log(`Campaign action: ${action} for campaign ${campaignId}`);
    // Implement campaign actions here
  };

  const handlePlanAction = (planId: string, action: string) => {
    console.log(`Plan action: ${action} for plan ${planId}`);
    // Implement plan actions here
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminStats stats={adminStats} />;
      case 'users':
        return <UserManagement users={adminUsers} onUserAction={handleUserAction} />;
      case 'campaigns':
        return <CampaignManagement campaigns={adminCampaigns} onCampaignAction={handleCampaignAction} />;
      case 'vip':
        return <VipManagement plans={vipPlans} onPlanAction={handlePlanAction} />;
      case 'reports':
        return (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
            <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Relatórios</h3>
            <p className="text-gray-400">Sistema de relatórios em desenvolvimento.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
          </div>
          <p className="text-gray-400">Gerencie usuários, campanhas e configurações da plataforma</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 mb-8">
          <nav className="flex space-x-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;