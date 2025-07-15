import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';

interface CampaignForm {
  name: string;
  system: string;
  description: string;
  image: string;
  nextSession: string;
  style: string;
  experienceLevel: string;
  maxPlayers: number;
}

const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CampaignForm>({
    name: '',
    system: 'D&D 5e',
    description: '',
    image: '',
    nextSession: '',
    style: 'Aventura Épica',
    experienceLevel: 'Intermediário',
    maxPlayers: 4
  });

  const systems = ['D&D 5e', 'Call of Cthulhu', 'Pathfinder', 'Vampire', 'GURPS', 'Outro'];
  const styles = ['Aventura Épica', 'Horror Investigativo', 'Aventura Marítima', 'Político', 'Exploração', 'Combate'];
  const experienceLevels = ['Iniciante', 'Intermediário', 'Avançado'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'maxPlayers' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend
      console.log('Creating campaign:', form);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Campanha criada com sucesso!');
      navigate('/busca');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Erro ao criar campanha. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/busca"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-2">Criar Nova Mesa</h1>
          <p className="text-gray-400">
            Preencha as informações da sua campanha para encontrar jogadores
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Informações Básicas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campaign Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome da Mesa *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Ex: A Queda dos Dragões Antigos"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>

              {/* System */}
              <div>
                <label htmlFor="system" className="block text-sm font-medium text-gray-300 mb-2">
                  Sistema *
                </label>
                <select
                  id="system"
                  name="system"
                  value={form.system}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                >
                  {systems.map(system => (
                    <option key={system} value={system}>{system}</option>
                  ))}
                </select>
              </div>

              {/* Max Players */}
              <div>
                <label htmlFor="maxPlayers" className="block text-sm font-medium text-gray-300 mb-2">
                  Máximo de Jogadores *
                </label>
                <input
                  type="number"
                  id="maxPlayers"
                  name="maxPlayers"
                  value={form.maxPlayers}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Style */}
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-2">
                  Estilo da Aventura *
                </label>
                <select
                  id="style"
                  name="style"
                  value={form.style}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                >
                  {styles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-300 mb-2">
                  Nível de Experiência *
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={form.experienceLevel}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                >
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Next Session */}
              <div className="md:col-span-2">
                <label htmlFor="nextSession" className="block text-sm font-medium text-gray-300 mb-2">
                  Data da Primeira Sessão *
                </label>
                <input
                  type="datetime-local"
                  id="nextSession"
                  name="nextSession"
                  value={form.nextSession}
                  onChange={handleInputChange}
                  min={getCurrentDateTime()}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Descrição da Campanha</h2>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Descrição *
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="Descreva sua campanha, o setting, o tom da aventura, e o que os jogadores podem esperar..."
                rows={6}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Mínimo 50 caracteres. Seja específico sobre o tipo de jogo e experiência que está oferecendo.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Imagem da Campanha (Opcional)</h2>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                URL da Imagem
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={form.image}
                onChange={handleInputChange}
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Cole o link de uma imagem que represente sua campanha. Recomendamos imagens com proporção 16:9.
              </p>
            </div>

            {form.image && (
              <div className="mt-4">
                <p className="text-sm text-gray-300 mb-2">Preview da imagem:</p>
                <div className="w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              to="/busca"
              className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
            >
              Cancelar
            </Link>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Criando...' : 'Criar Mesa'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;