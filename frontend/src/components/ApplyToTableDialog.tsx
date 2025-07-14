
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface ApplyToTableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (message: string) => void;
  isLoading: boolean;
  tableName: string;
}

export const ApplyToTableDialog = ({ 
  isOpen, 
  onClose, 
  onApply, 
  isLoading, 
  tableName 
}: ApplyToTableDialogProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onApply(message);
    setMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Candidatar-se à Mesa</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Você está se candidatando para: <strong>{tableName}</strong>
            </p>
          </div>
          
          <div>
            <Label htmlFor="application-message">
              Mensagem para o mestre (opcional)
            </Label>
            <Textarea
              id="application-message"
              placeholder="Conte um pouco sobre sua experiência com RPG, por que quer participar desta mesa, etc..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 min-h-[100px]"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Candidatura'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
