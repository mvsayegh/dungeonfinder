import { AdminStats, AdminUser, AdminCampaign, AdminReport, VipPlan } from '../types/admin';

export const adminStats: AdminStats = {
  totalUsers: 1247,
  totalCampaigns: 89,
  activeCampaigns: 34,
  totalMasters: 156,
  vipUsers: 23,
  monthlyRevenue: 2450.00,
  newUsersThisMonth: 87,
  newCampaignsThisMonth: 12
};

export const adminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Marcus, o Narrador',
    email: 'marcus@email.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
    role: 'master',
    status: 'active',
    rating: 4.8,
    campaignsCreated: 5,
    campaignsJoined: 2,
    createdAt: '2024-01-15',
    lastLogin: '2024-02-10',
    isVip: true,
    vipExpiresAt: '2024-03-15'
  },
  {
    id: '2',
    name: 'Ana Silva',
    email: 'ana@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
    role: 'user',
    status: 'active',
    rating: 4.2,
    campaignsCreated: 0,
    campaignsJoined: 3,
    createdAt: '2024-01-20',
    lastLogin: '2024-02-09',
    isVip: false
  },
  {
    id: '3',
    name: 'Carlos Problema',
    email: 'carlos@email.com',
    role: 'user',
    status: 'suspended',
    rating: 2.1,
    campaignsCreated: 0,
    campaignsJoined: 1,
    createdAt: '2024-02-01',
    lastLogin: '2024-02-05',
    isVip: false
  }
];

export const adminCampaigns: AdminCampaign[] = [
  {
    id: '1',
    name: 'A Queda dos Dragões Antigos',
    system: 'D&D 5e',
    master: {
      id: '1',
      name: 'Marcus, o Narrador',
      email: 'marcus@email.com'
    },
    status: 'active',
    playersCount: 4,
    maxPlayers: 6,
    createdAt: '2024-01-01',
    nextSession: '2024-02-15T19:00:00',
    reportCount: 0,
    isPromoted: true
  },
  {
    id: '2',
    name: 'Mesa Suspeita',
    system: 'Call of Cthulhu',
    master: {
      id: '3',
      name: 'Carlos Problema',
      email: 'carlos@email.com'
    },
    status: 'pending',
    playersCount: 1,
    maxPlayers: 4,
    createdAt: '2024-02-05',
    nextSession: '2024-02-20T20:00:00',
    reportCount: 2,
    isPromoted: false
  }
];

export const adminReports: AdminReport[] = [
  {
    id: '1',
    type: 'user',
    targetId: '3',
    targetName: 'Carlos Problema',
    reportedBy: {
      id: '2',
      name: 'Ana Silva',
      email: 'ana@email.com'
    },
    reason: 'Comportamento inadequado',
    description: 'Usuário foi desrespeitoso durante a sessão e usou linguagem ofensiva.',
    status: 'investigating',
    createdAt: '2024-02-08'
  },
  {
    id: '2',
    type: 'campaign',
    targetId: '2',
    targetName: 'Mesa Suspeita',
    reportedBy: {
      id: '1',
      name: 'Marcus, o Narrador',
      email: 'marcus@email.com'
    },
    reason: 'Conteúdo inadequado',
    description: 'Campanha contém elementos não apropriados para a plataforma.',
    status: 'pending',
    createdAt: '2024-02-09'
  }
];

export const vipPlans: VipPlan[] = [
  {
    id: '1',
    name: 'VIP Mensal',
    price: 19.90,
    duration: 30,
    features: [
      'Destaque nas buscas',
      'Criação ilimitada de mesas',
      'Badge VIP no perfil',
      'Suporte prioritário',
      'Estatísticas avançadas'
    ],
    isActive: true
  },
  {
    id: '2',
    name: 'VIP Trimestral',
    price: 49.90,
    duration: 90,
    features: [
      'Destaque nas buscas',
      'Criação ilimitada de mesas',
      'Badge VIP no perfil',
      'Suporte prioritário',
      'Estatísticas avançadas',
      '15% de desconto'
    ],
    isActive: true
  },
  {
    id: '3',
    name: 'VIP Anual',
    price: 179.90,
    duration: 365,
    features: [
      'Destaque nas buscas',
      'Criação ilimitada de mesas',
      'Badge VIP no perfil',
      'Suporte prioritário',
      'Estatísticas avançadas',
      'Acesso beta a novos recursos',
      '25% de desconto'
    ],
    isActive: true
  }
];