import { Campaign, User, Comment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Marcus, o Narrador',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
    bio: 'Mestre experiente há 15 anos, especialista em campanhas épicas de D&D 5e.',
    rating: 4.8,
    comments: [
      {
        id: '1',
        author: {
          id: '2',
          name: 'Ana Silva',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
          bio: '',
          rating: 0,
          comments: []
        },
        content: 'Melhor mestre que já joguei! Narrativa incrível.',
        rating: 5,
        date: '2024-01-15'
      }
    ]
  },
  {
    id: '2',
    name: 'Luna Mística',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
    bio: 'Especialista em horror cósmico e Call of Cthulhu.',
    rating: 4.6,
    comments: []
  },
  {
    id: '3',
    name: 'Thor Machado',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150',
    bio: 'Fã de aventuras clássicas e sistemas OSR.',
    rating: 4.4,
    comments: []
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'A Queda dos Dragões Antigos',
    system: 'D&D 5e',
    master: mockUsers[0],
    nextSession: '2024-02-15T19:00:00',
    status: 'Aberta',
    description: 'Uma épica campanha onde os heróis devem enfrentar dragões ancestrais que despertaram de seu sono milenar.',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?w=800',
    style: 'Aventura Épica',
    experienceLevel: 'Intermediário',
    maxPlayers: 6,
    currentPlayers: [mockUsers[1], mockUsers[2]],
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Mistérios de Arkham',
    system: 'Call of Cthulhu',
    master: mockUsers[1],
    nextSession: '2024-02-16T20:00:00',
    status: 'Em andamento',
    description: 'Investigadores exploram os segredos sombrios da cidade de Arkham.',
    style: 'Horror Investigativo',
    experienceLevel: 'Avançado',
    maxPlayers: 4,
    currentPlayers: [mockUsers[0], mockUsers[2]],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Piratas do Mar Negro',
    system: 'D&D 5e',
    master: mockUsers[2],
    nextSession: '2024-02-17T18:30:00',
    status: 'Aberta',
    description: 'Aventuras marítimas cheias de tesouros, batalhas navais e descobertas.',
    style: 'Aventura Marítima',
    experienceLevel: 'Iniciante',
    maxPlayers: 5,
    currentPlayers: [mockUsers[1]],
    createdAt: '2024-01-20'
  }
];