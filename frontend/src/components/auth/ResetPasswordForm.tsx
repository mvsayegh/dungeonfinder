import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowLeft, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ResetPasswordData } from '../../types/auth';

const ResetPasswordForm: React.FC = () => {
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<ResetPasswordData>({
    token: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setFormData(prev => ({ ...prev, token }));
    } else {
      setError('Token de recuperação não encontrado');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await resetPassword(formData);
      setSuccess('Senha alterada com sucesso!');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar senha');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Nova senha</h2>
          <p className="text-gray-400">
            Digite sua nova senha
          </p>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600/20 border border-green-600 text-green-400 px-4 py-3 rounded-lg mb-6">
            {success}
            <p className="text-sm mt-1">Redirecionando para o login...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Nova senha
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirmar nova senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.token}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-3 rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>{isLoading ? 'Alterando...' : 'Alterar senha'}</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;