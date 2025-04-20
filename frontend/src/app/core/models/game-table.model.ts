import { RPGStatus, RPGSystem } from './rpg.model';

export interface UserSummary {
  _id: string;
  name: string;
}

export type GameDuration = 'ONE_SHOT' | 'SHORT' | 'MEDIUM' | 'LONG';

export interface GameTable {
  _id: string;
  title: string;
  description: string;
  image: string;
  system: RPGSystem;
  maxPlayers: number;
  status: RPGStatus;
  time: string;
  duration: GameDuration;
  players: UserSummary[];
  createdBy: UserSummary;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PaginationInfo {
  totalPages: number;
  totalGameTables: number;
  pageNumber: number;
  pageSize: number;
}

export interface GameTableListResponse {
  success: boolean;
  message: string;
  data: {
    gameTables: GameTable[];
    pagination: PaginationInfo;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    gameTables: T[];
    pagination: PaginationInfo;
  };
}

export interface PaginationInfo {
  totalPages: number;
  totalGameTables: number;
  pageNumber: number;
  pageSize: number;
}
