import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  interactive = false,
  onRatingChange
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        {[...Array(maxRating)].map((_, index) => {
          const starRating = index + 1;
          const isFilled = starRating <= rating;
          
          return (
            <button
              key={index}
              onClick={() => handleStarClick(starRating)}
              disabled={!interactive}
              className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled ? 'fill-amber-400 text-amber-400' : 'text-gray-400'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-gray-300 text-sm ml-2">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;