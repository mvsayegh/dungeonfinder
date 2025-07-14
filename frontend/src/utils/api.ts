import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Criar instância do Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar respostas e erros
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Tipos para as respostas da API
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface User {
  _id: string
  username: string
  email: string
  isAdmin: boolean
  createdAt: string
  updatedAt: string
}

export interface GameTable {
  _id: string
  title: string
  description: string
  gameSystem: string
  maxPlayers: number
  currentPlayers: number
  scheduledDate: string
  createdBy: string
  status: 'open' | 'full' | 'closed'
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

// Serviços da API
export const authService = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/login', credentials),
  
  register: (userData: RegisterData) =>
    apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/register', userData),
  
  logout: () =>
    apiClient.post<ApiResponse>('/auth/logout'),
  
  getProfile: () =>
    apiClient.get<ApiResponse<User>>('/auth/profile'),
}

export const userService = {
  getUsers: () =>
    apiClient.get<ApiResponse<User[]>>('/users'),
  
  getUser: (id: string) =>
    apiClient.get<ApiResponse<User>>(`/users/${id}`),
  
  updateUser: (id: string, userData: Partial<User>) =>
    apiClient.put<ApiResponse<User>>(`/users/${id}`, userData),
  
  deleteUser: (id: string) =>
    apiClient.delete<ApiResponse>(`/users/${id}`),
}

export const gameTableService = {
  getGameTables: () =>
    apiClient.get<ApiResponse<GameTable[]>>('/game-tables'),
  
  getGameTable: (id: string) =>
    apiClient.get<ApiResponse<GameTable>>(`/game-tables/${id}`),
  
  createGameTable: (gameTableData: Omit<GameTable, '_id' | 'createdAt' | 'updatedAt' | 'createdBy'>) =>
    apiClient.post<ApiResponse<GameTable>>('/game-tables', gameTableData),
  
  updateGameTable: (id: string, gameTableData: Partial<GameTable>) =>
    apiClient.put<ApiResponse<GameTable>>(`/game-tables/${id}`, gameTableData),
  
  deleteGameTable: (id: string) =>
    apiClient.delete<ApiResponse>(`/game-tables/${id}`),
  
  joinGameTable: (id: string) =>
    apiClient.post<ApiResponse>(`/game-tables/${id}/join`),
  
  leaveGameTable: (id: string) =>
    apiClient.post<ApiResponse>(`/game-tables/${id}/leave`),
}

export default apiClient

