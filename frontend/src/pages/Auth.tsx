import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/Navigation';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'signin');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
    userType: 'player' as 'player' | 'master',
  });

  const { signIn, signUp, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (forgotPassword) {
        await resetPassword(formData.email);
        setForgotPassword(false);
      } else if (mode === 'signin') {
        await signIn(formData.email, formData.password);
        navigate('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('As senhas não coincidem');
        }
        
        const userData = {
          full_name: formData.fullName,
          username: formData.username,
          user_type: formData.userType,
        };
        
        await signUp(formData.email, formData.password, userData);
      }
    } catch (error: any) {
      console.error('Erro na autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {forgotPassword 
                ? 'Recuperar Senha'
                : mode === 'signin' 
                  ? 'Entrar' 
                  : 'Criar Conta'
              }
            </CardTitle>
            <CardDescription className="text-center">
              {forgotPassword
                ? 'Digite seu email para receber o link de recuperação'
                : mode === 'signin'
                  ? 'Entre com sua conta para continuar'
                  : 'Crie sua conta para começar a jogar'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              {!forgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              )}

              {mode === 'signup' && !forgotPassword && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Seu nome de usuário"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userType">Tipo de Usuário</Label>
                    <Select 
                      value={formData.userType} 
                      onValueChange={(value: 'player' | 'master') => handleInputChange('userType', value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="player">Jogador</SelectItem>
                        <SelectItem value="master">Mestre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Carregando...' : 
                  forgotPassword ? 'Enviar Link' :
                  mode === 'signin' ? 'Entrar' : 'Criar Conta'
                }
              </Button>
            </form>

            <div className="mt-6">
              <Separator />
              
              <div className="mt-6 text-center space-y-2">
                {!forgotPassword && (
                  <>
                    <Button
                      variant="link"
                      onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                      className="text-sm"
                      disabled={isLoading}
                    >
                      {mode === 'signin' 
                        ? 'Não tem uma conta? Cadastre-se' 
                        : 'Já tem uma conta? Entre'
                      }
                    </Button>
                    
                    {mode === 'signin' && (
                      <div>
                        <Button
                          variant="link"
                          onClick={() => setForgotPassword(true)}
                          className="text-sm text-muted-foreground"
                          disabled={isLoading}
                        >
                          Esqueceu sua senha?
                        </Button>
                      </div>
                    )}
                  </>
                )}
                
                {forgotPassword && (
                  <Button
                    variant="link"
                    onClick={() => setForgotPassword(false)}
                    className="text-sm"
                    disabled={isLoading}
                  >
                    Voltar ao login
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
