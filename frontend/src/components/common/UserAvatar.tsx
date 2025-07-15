import React from 'react';
import { User } from '../../types';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  user, 
  size = 'md', 
  showName = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-amber-400`}
      />
      {showName && (
        <span className="text-gray-200 font-medium">{user.name}</span>
      )}
    </div>
  );
};

export default UserAvatar;