import React from 'react';
import { Link } from 'react-router-dom';
import { Dice6, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-amber-400">
              <Dice6 className="w-8 h-8" />
              <span className="text-2xl font-bold">RPG Finder</span>
            </Link>
            <p className="text-gray-400 text-sm">
              A maior plataforma de busca de mesas de RPG do Brasil. 
              Conectando mestres e jogadores apaixonados por aventuras épicas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/busca" className="text-gray-400 hover:text-white transition-colors">
                  Buscar Mesas
                </Link>
              </li>
              <li>
                <Link to="/cadastro-campanha" className="text-gray-400 hover:text-white transition-colors">
                  Criar Mesa
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="text-gray-400 hover:text-white transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/mestres" className="text-gray-400 hover:text-white transition-colors">
                  Para Mestres
                </Link>
              </li>
              <li>
                <Link to="/comunidade" className="text-gray-400 hover:text-white transition-colors">
                  Comunidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ajuda" className="text-gray-400 hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contato@rpgfinder.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">São Paulo, SP - Brasil</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                />
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-r-lg transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 RPG Finder. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/termos" className="text-gray-400 hover:text-white text-sm transition-colors">
              Termos
            </Link>
            <Link to="/privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacidade
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;