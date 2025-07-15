import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Comment } from '../../types';
import UserAvatar from './UserAvatar';
import RatingStars from './RatingStars';

interface CommentBoxProps {
  comments: Comment[];
  onAddComment?: (content: string, rating: number) => void;
  allowNewComments?: boolean;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  comments,
  onAddComment,
  allowNewComments = false
}) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !onAddComment) return;

    setIsSubmitting(true);
    await onAddComment(newComment.trim(), newRating);
    setNewComment('');
    setNewRating(5);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-gray-200">
        <MessageCircle className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Comentários ({comments.length})</h3>
      </div>

      {/* New Comment Form */}
      {allowNewComments && (
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sua avaliação
            </label>
            <RatingStars
              rating={newRating}
              interactive
              onRatingChange={setNewRating}
              showValue={false}
            />
          </div>
          
          <div className="mb-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Deixe seu comentário..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              rows={3}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Enviando...' : 'Enviar Comentário'}</span>
          </button>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            Nenhum comentário ainda. Seja o primeiro a avaliar!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start space-x-3">
                <UserAvatar user={comment.author} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-200">{comment.author.name}</span>
                    <RatingStars rating={comment.rating} size="sm" showValue={false} />
                    <span className="text-xs text-gray-400">
                      {new Date(comment.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentBox;