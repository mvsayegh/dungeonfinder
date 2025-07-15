export interface Campaign {
  id: string;
  name: string;
  system: string;
  master: User;
  nextSession: string;
  status: 'Aberta' | 'Em andamento' | 'Encerrada';
  description: string;
  image?: string;
  style: string;
  experienceLevel: string;
  maxPlayers: number;
  currentPlayers: User[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  rating: number;
  date: string;
}

export interface Filter {
  system: string;
  date: string;
  style: string;
  experienceLevel: string;
}