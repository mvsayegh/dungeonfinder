import React from 'react';
import { Dice6 } from 'lucide-react';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

const ResetPassword: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Dice6 className="w-12 h-12 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">RPG Finder</h1>
        </div>
        
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;