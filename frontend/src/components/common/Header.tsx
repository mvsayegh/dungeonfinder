import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dice6, User, PlusCircle, Search, Home, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="bg-gray-900 border-b border-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
            <Dice6 className="w-8 h-8" />
            <span className="text-2xl font-bold">RPG Finder</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Início</span>
            </Link>
            <Link
              to="/busca"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/busca') 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Buscar Mesas</span>
            </Link>
            <Link
              to="/cadastro-campanha"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/cadastro-campanha') 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Criar Mesa</span>
            </Link>
            {user?.id === '1' && (
              <Link
                to="/admin"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/admin') 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={`/perfil/${user?.id}`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span className="hidden md:inline">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline">Sair</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth/login"
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg"
                >
                  Entrar
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <nav className="md:hidden mt-4 flex justify-around">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 rounded-lg ${
              isActive('/') ? 'text-amber-400' : 'text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Início</span>
          </Link>
          <Link
            to="/busca"
            className={`flex flex-col items-center p-2 rounded-lg ${
              isActive('/busca') ? 'text-amber-400' : 'text-gray-400'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">Buscar</span>
          </Link>
          <Link
            to="/cadastro-campanha"
            className={`flex flex-col items-center p-2 rounded-lg ${
              isActive('/cadastro-campanha') ? 'text-amber-400' : 'text-gray-400'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-xs mt-1">Criar</span>
          </Link>
          <Link
            to={isAuthenticated ? `/perfil/${user?.id}` : '/auth/login'}
            className={`flex flex-col items-center p-2 rounded-lg ${
              isActive(`/perfil/${user?.id}`) ? 'text-amber-400' : 'text-gray-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">{isAuthenticated ? 'Perfil' : 'Login'}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;