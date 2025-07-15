import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Dice6, Users, Star, Scroll } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import UserAvatar from '../components/common/UserAvatar';
import RatingStars from '../components/common/RatingStars';

const Home: React.FC = () => {
  const topMasters = mockUsers.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-4">
                <Dice6 className="w-16 h-16 text-amber-400" />
                <Scroll className="w-12 h-12 text-purple-400" />
                <Dice6 className="w-16 h-16 text-amber-400" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Encontre sua próxima
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 block">
                aventura de RPG!
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Conecte-se com mestres experientes e jogadores apaixonados. 
              Descubra campanhas épicas e faça parte de histórias inesquecíveis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/busca"
                className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Buscar Mesas</span>
              </Link>
              
              <Link
                to="/auth/register"
                className="flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Cadastrar-se</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Por que escolher o RPG Finder?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Busca Inteligente</h3>
              <p className="text-gray-400">
                Encontre a mesa perfeita com nossos filtros avançados por sistema, estilo e experiência.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mestres Avaliados</h3>
              <p className="text-gray-400">
                Confie em avaliações reais de jogadores para escolher os melhores mestres.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comunidade Ativa</h3>
              <p className="text-gray-400">
                Faça parte de uma comunidade apaixonada por RPG de mesa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Masters Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Mestres em Destaque
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topMasters.map((master) => (
              <div key={master.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center hover:border-purple-500 transition-colors">
                <UserAvatar user={master} size="lg" className="justify-center mb-4" />
                
                <h3 className="text-xl font-semibold text-white mb-2">{master.name}</h3>
                
                <RatingStars rating={master.rating} className="justify-center mb-3" />
                
                <p className="text-gray-400 mb-4">{master.bio}</p>
                
                <Link
                  to={`/perfil/${master.id}`}
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Ver Perfil
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-indigo-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para começar sua aventura?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Junte-se a milhares de jogadores e mestres em todo o Brasil.
          </p>
          <Link
            to="/busca"
            className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            <Dice6 className="w-5 h-5" />
            <span>Encontrar Mesa Agora</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;