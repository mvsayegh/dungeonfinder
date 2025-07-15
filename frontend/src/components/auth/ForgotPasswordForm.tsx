import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ForgotPasswordData } from '../../types/auth';

const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await forgotPassword(formData);
      setSuccess('Email de recuperação enviado! Verifique sua caixa de entrada.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Esqueci minha senha</h2>
          <p className="text-gray-400">
            Digite seu email para receber instruções de recuperação
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-3 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
            <span>{isLoading ? 'Enviando...' : 'Enviar email de recuperação'}</span>
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

        {success && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">
              Não recebeu o email? Verifique:
            </p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Caixa de spam/lixo eletrônico</li>
              <li>• Se o email está correto</li>
              <li>• Aguarde alguns minutos</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;