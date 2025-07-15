import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dice6 } from 'lucide-react';
import RegisterForm from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Dice6 className="w-12 h-12 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">RPG Finder</h1>
        </div>
        
        <RegisterForm onSuccess={handleRegisterSuccess} />
      </div>
    </div>
  );
};

export default Register;