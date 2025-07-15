import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const EmailVerification: React.FC = () => {
  const { verifyEmail, resendVerification, user } = useAuth();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      handleVerification(token);
    } else {
      setStatus('error');
      setError('Token de verificação não encontrado');
    }
  }, [searchParams]);

  const handleVerification = async (token: string) => {
    try {
      await verifyEmail(token);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Erro ao verificar email');
    }
  };

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    setIsResending(true);
    try {
      await resendVerification();
      alert('Email de verificação reenviado!');
    } catch (err) {
      alert('Erro ao reenviar email de verificação');
    } finally {
      setIsResending(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Verificando email...</h2>
          <p className="text-gray-400">Aguarde enquanto verificamos seu email</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
          {status === 'success' ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Email verificado!</h2>
              <p className="text-gray-400 mb-6">
                Sua conta foi ativada com sucesso. Agora você pode fazer login.
              </p>
              <Link
                to="/auth/login"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Fazer login
              </Link>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Erro na verificação</h2>
              <p className="text-gray-400 mb-6">{error}</p>
              
              <div className="space-y-4">
                {user?.email && (
                  <button
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className="flex items-center justify-center space-x-2 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                    <span>{isResending ? 'Reenviando...' : 'Reenviar email'}</span>
                  </button>
                )}
                
                <Link
                  to="/auth/login"
                  className="inline-block w-full bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Voltar ao login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;