import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginCredentials } from '../../types/auth';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Entrar</h2>
          <p className="text-gray-400">Acesse sua conta do RPG Finder</p>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-300">Lembrar de mim</span>
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-3 rounded-lg transition-colors"
          >
            <LogIn className="w-5 h-5" />
            <span>{isLoading ? 'Entrando...' : 'Entrar'}</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Não tem uma conta?{' '}
            <Link
              to="/auth/register"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Cadastre-se
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">Demo - Use estas credenciais:</p>
          <p className="text-xs text-gray-300">Email: admin@rpgfinder.com</p>
          <p className="text-xs text-gray-300">Senha: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;