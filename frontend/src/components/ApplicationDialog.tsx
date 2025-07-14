
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTableApplications } from '@/hooks/useTableApplications';

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableId: string;
  tableTitle: string;
}

export const ApplicationDialog = ({ open, onOpenChange, tableId, tableTitle }: ApplicationDialogProps) => {
  const [message, setMessage] = useState('');
  const { applyToTable } = useTableApplications();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyToTable.mutate(
      { tableId, message },
      {
        onSuccess: () => {
          onOpenChange(false);
          setMessage('');
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Candidatar-se para: {tableTitle}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Mensagem de apresentação</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Conte um pouco sobre você, sua experiência com RPG e por que gostaria de participar desta mesa..."
              className="min-h-[120px] mt-2"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={applyToTable.isPending}>
              {applyToTable.isPending ? 'Enviando...' : 'Enviar Candidatura'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
