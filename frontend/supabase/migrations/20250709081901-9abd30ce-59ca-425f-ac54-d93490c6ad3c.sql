
-- Corrigir o constraint de status das table_applications
ALTER TABLE table_applications DROP CONSTRAINT IF EXISTS table_applications_status_check;

-- Adicionar o constraint correto
ALTER TABLE table_applications ADD CONSTRAINT table_applications_status_check 
CHECK (status IN ('pending', 'accepted', 'rejected'));

-- Adicionar coluna para mensagem personalizada nas aplicações
ALTER TABLE table_applications ADD COLUMN IF NOT EXISTS custom_message TEXT;

-- Criar função para notificar sobre aplicações
CREATE OR REPLACE FUNCTION notify_table_application()
RETURNS TRIGGER AS $$
BEGIN
  -- Notificar o mestre sobre nova aplicação
  IF TG_OP = 'INSERT' THEN
    INSERT INTO notifications (user_id, title, message, type)
    SELECT 
      t.master_id,
      'Nova Candidatura!',
      'Alguém se candidatou para sua mesa: ' || t.title,
      'application'
    FROM rpg_tables t
    WHERE t.id = NEW.table_id;
  END IF;
  
  -- Notificar o jogador sobre status da aplicação
  IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    INSERT INTO notifications (user_id, title, message, type)
    VALUES (
      NEW.player_id,
      CASE 
        WHEN NEW.status = 'accepted' THEN 'Candidatura Aceita!'
        WHEN NEW.status = 'rejected' THEN 'Candidatura Rejeitada'
        ELSE 'Status da Candidatura Atualizado'
      END,
      CASE 
        WHEN NEW.status = 'accepted' THEN 'Parabéns! Sua candidatura foi aceita.'
        WHEN NEW.status = 'rejected' THEN 'Sua candidatura foi rejeitada.'
        ELSE 'O status da sua candidatura foi atualizado.'
      END,
      CASE 
        WHEN NEW.status = 'accepted' THEN 'success'
        WHEN NEW.status = 'rejected' THEN 'error'
        ELSE 'info'
      END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger para notificações de aplicações
DROP TRIGGER IF EXISTS notify_table_application_trigger ON table_applications;
CREATE TRIGGER notify_table_application_trigger
  AFTER INSERT OR UPDATE ON table_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_table_application();

-- Habilitar realtime para tabelas importantes
ALTER TABLE table_applications REPLICA IDENTITY FULL;
ALTER TABLE notifications REPLICA IDENTITY FULL;
ALTER TABLE profiles REPLICA IDENTITY FULL;

-- Adicionar tabelas ao realtime
ALTER PUBLICATION supabase_realtime ADD TABLE table_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
