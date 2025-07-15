export interface AdminStats {
  totalUsers: number;
  totalCampaigns: number;
  activeCampaigns: number;
  totalMasters: number;
  vipUsers: number;
  monthlyRevenue: number;
  newUsersThisMonth: number;
  newCampaignsThisMonth: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'master' | 'admin' | 'vip';
  status: 'active' | 'suspended' | 'banned';
  rating: number;
  campaignsCreated: number;
  campaignsJoined: number;
  createdAt: string;
  lastLogin: string;
  isVip: boolean;
  vipExpiresAt?: string;
}

export interface AdminCampaign {
  id: string;
  name: string;
  system: string;
  master: {
    id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  playersCount: number;
  maxPlayers: number;
  createdAt: string;
  nextSession: string;
  reportCount: number;
  isPromoted: boolean;
}

export interface AdminReport {
  id: string;
  type: 'user' | 'campaign' | 'comment';
  targetId: string;
  targetName: string;
  reportedBy: {
    id: string;
    name: string;
    email: string;
  };
  reason: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface VipPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
  isActive: boolean;
}

export interface AdminFilters {
  users: {
    role: string;
    status: string;
    isVip: boolean | null;
    search: string;
  };
  campaigns: {
    status: string;
    system: string;
    search: string;
  };
  reports: {
    type: string;
    status: string;
    search: string;
  };
}