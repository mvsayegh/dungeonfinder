import React, { useState } from 'react';
import { Crown, Plus, Edit, Trash2, DollarSign, Calendar, Users } from 'lucide-react';
import { VipPlan } from '../../types/admin';

interface VipManagementProps {
  plans: VipPlan[];
  onPlanAction: (planId: string, action: string) => void;
}

const VipManagement: React.FC<VipManagementProps> = ({ plans, onPlanAction }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: 0,
    duration: 30,
    features: ['']
  });

  const handleAddFeature = () => {
    setNewPlan(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setNewPlan(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setNewPlan(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating new plan:', newPlan);
    setShowCreateForm(false);
    setNewPlan({ name: '', price: 0, duration: 30, features: [''] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Crown className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Gerenciamento VIP</h2>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Plano</span>
        </button>
      </div>

      {/* Create Plan Form */}
      {showCreateForm && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Criar Novo Plano VIP</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome do Plano
                </label>
                <input
                  type="text"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duração (dias)
                </label>
                <input
                  type="number"
                  value={newPlan.duration}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Funcionalidades
              </label>
              {newPlan.features.map((feature, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Digite uma funcionalidade..."
                    className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  {newPlan.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                + Adicionar funcionalidade
              </button>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Criar Plano
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onPlanAction(plan.id, 'edit')}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onPlanAction(plan.id, 'delete')}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <DollarSign className="w-4 h-4" />
                <span>R$ {plan.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{plan.duration} dias</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="w-4 h-4" />
                <span>{plan.isActive ? 'Ativo' : 'Inativo'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">Funcionalidades:</h4>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-400 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={() => onPlanAction(plan.id, plan.isActive ? 'deactivate' : 'activate')}
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  plan.isActive 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {plan.isActive ? 'Desativar' : 'Ativar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VipManagement;