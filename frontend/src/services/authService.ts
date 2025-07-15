import { LoginCredentials, RegisterData, ForgotPasswordData, ResetPasswordData, AuthResponse, User } from '../types/auth';

// Mock API - Replace with your actual API endpoints
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro de conexão' }));
      throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@rpgfinder.com' && credentials.password === '123456') {
          resolve({
            user: {
              id: '1',
              name: 'Marcus, o Narrador',
              email: credentials.email,
              avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
              bio: 'Mestre experiente há 15 anos, especialista em campanhas épicas de D&D 5e.',
              rating: 4.8,
              emailVerified: true,
              createdAt: '2024-01-01',
            },
            token: 'mock_jwt_token_' + Date.now(),
            message: 'Login realizado com sucesso!',
          });
        } else {
          reject(new Error('Email ou senha incorretos'));
        }
      }, 1000);
    });

    // Uncomment for real API:
    // return this.request<AuthResponse>('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    // });
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === 'existing@email.com') {
          reject(new Error('Este email já está em uso'));
        } else {
          resolve({
            message: 'Conta criada com sucesso! Verifique seu email para ativar a conta.',
          });
        }
      }, 1000);
    });

    // Uncomment for real API:
    // return this.request<{ message: string }>('/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
  }

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Email de recuperação enviado! Verifique sua caixa de entrada.',
        });
      }, 1000);
    });

    // Uncomment for real API:
    // return this.request<{ message: string }>('/auth/forgot-password', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
  }

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.token === 'invalid_token') {
          reject(new Error('Token inválido ou expirado'));
        } else {
          resolve({
            message: 'Senha alterada com sucesso!',
          });
        }
      }, 1000);
    });

    // Uncomment for real API:
    // return this.request<{ message: string }>('/auth/reset-password', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
  }

  async verifyEmail(token: string): Promise<User> {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === 'invalid_token') {
          reject(new Error('Token inválido ou expirado'));
        } else {
          resolve({
            id: '1',
            name: 'Marcus, o Narrador',
            email: 'admin@rpgfinder.com',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
            bio: 'Mestre experiente há 15 anos, especialista em campanhas épicas de D&D 5e.',
            rating: 4.8,
            emailVerified: true,
            createdAt: '2024-01-01',
          });
        }
      }, 1000);
    });

    // Uncomment for real API:
    // return this.request<User>(`/auth/verify-email/${token}`, {
    //   method: 'POST',
    // });
  }

  async resendVerification(email: string): Promise<{ message: string }> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Email de verificação reenviado!',
        });
      }, 1000);
    });

    // Uncomment for real API:
    // return this.request<{ message: string }>('/auth/resend-verification', {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    // });
  }

  async getCurrentUser(token: string): Promise<User> {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token.startsWith('mock_jwt_token_')) {
          resolve({
            id: '1',
            name: 'Marcus, o Narrador',
            email: 'admin@rpgfinder.com',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
            bio: 'Mestre experiente há 15 anos, especialista em campanhas épicas de D&D 5e.',
            rating: 4.8,
            emailVerified: true,
            createdAt: '2024-01-01',
          });
        } else {
          reject(new Error('Token inválido'));
        }
      }, 500);
    });

    // Uncomment for real API:
    // return this.request<User>('/auth/me', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
  }
}

export const authService = new AuthService();