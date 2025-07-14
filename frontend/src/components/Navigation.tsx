
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Search, User, Settings, LogOut, Shield, Sword, Crown, Sparkles, Home, Plus, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { NotificationBell } from '@/components/NotificationBell';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { to: '/', label: 'Início', icon: Home },
    { to: '/search', label: 'Buscar Mesas', icon: Search },
    ...(user ? [
      { to: '/create-table', label: 'Criar Mesa', icon: Plus },
      { to: '/manage-applications', label: 'Candidaturas', icon: Users },
      { to: '/profile', label: 'Perfil', icon: User }
    ] : [])
  ];

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary via-accent to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent">
                  DungeonFinder
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Encontre sua aventura</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-accent/10 group"
              >
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <NotificationBell />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                          {user.email?.charAt(0).toUpperCase() || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur border-border/50" align="end" forceMount>
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer hover:bg-accent/10">
                      <User className="mr-3 h-4 w-4" />
                      Perfil do Aventureiro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer hover:bg-accent/10">
                      <Shield className="mr-3 h-4 w-4" />
                      Painel Administrativo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer hover:bg-destructive/10 text-destructive">
                      <LogOut className="mr-3 h-4 w-4" />
                      Encerrar Sessão
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => navigate('/auth')} className="hover:bg-accent/10">
                  Entrar na Taverna
                </Button>
                <Button onClick={() => navigate('/auth?mode=signup')} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Iniciar Aventura
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur">
                <div className="flex flex-col space-y-6 mt-8">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                  
                  {user ? (
                    <div className="flex flex-col space-y-3 pt-6 border-t border-border/50">
                      <Button variant="ghost" onClick={() => { navigate('/profile'); setIsOpen(false); }} className="justify-start gap-3">
                        <User className="h-5 w-5" />
                        Perfil do Aventureiro
                      </Button>
                      <Button variant="ghost" onClick={() => { navigate('/admin'); setIsOpen(false); }} className="justify-start gap-3">
                        <Shield className="h-5 w-5" />
                        Painel Administrativo
                      </Button>
                      <Button variant="ghost" onClick={handleSignOut} className="justify-start gap-3 text-destructive hover:text-destructive">
                        <LogOut className="h-5 w-5" />
                        Encerrar Sessão
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3 pt-6 border-t border-border/50">
                      <Button variant="ghost" onClick={() => { navigate('/auth'); setIsOpen(false); }} className="justify-start">
                        Entrar na Taverna
                      </Button>
                      <Button onClick={() => { navigate('/auth?mode=signup'); setIsOpen(false); }} className="justify-start bg-gradient-to-r from-primary to-accent">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Iniciar Aventura
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
