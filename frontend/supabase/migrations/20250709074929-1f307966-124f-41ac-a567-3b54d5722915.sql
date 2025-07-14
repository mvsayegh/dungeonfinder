
-- Criar tabela para notificações
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela para mensagens entre usuários
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  table_id UUID REFERENCES rpg_tables(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela para configurações do sistema
CREATE TABLE public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela para pagamentos VIP
CREATE TABLE public.vip_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- em centavos
  currency TEXT DEFAULT 'brl',
  status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS para todas as tabelas
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_payments ENABLE ROW LEVEL SECURITY;

-- Políticas para notificações
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para mensagens
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages" ON public.messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- Políticas para configurações do sistema (apenas admins)
CREATE POLICY "Only admins can manage system settings" ON public.system_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Políticas para pagamentos VIP
CREATE POLICY "Users can view their own payments" ON public.vip_payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage all payments" ON public.vip_payments
  FOR ALL WITH CHECK (true);

-- Função para atualizar status VIP automaticamente
CREATE OR REPLACE FUNCTION update_vip_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Se pagamento foi confirmado, ativar VIP por 30 dias
  IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
    UPDATE profiles 
    SET is_vip = true 
    WHERE id = NEW.user_id;
    
    -- Definir data de expiração (30 dias)
    NEW.expires_at = now() + INTERVAL '30 days';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizar status VIP
CREATE TRIGGER update_vip_status_trigger
  BEFORE UPDATE ON vip_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_vip_status();

-- Função para verificar e desativar VIP expirado
CREATE OR REPLACE FUNCTION check_expired_vip()
RETURNS void AS $$
BEGIN
  -- Desativar VIP para usuários com pagamentos expirados
  UPDATE profiles 
  SET is_vip = false
  WHERE id IN (
    SELECT DISTINCT user_id 
    FROM vip_payments 
    WHERE status = 'paid' 
    AND expires_at < now()
  )
  AND is_vip = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Inserir configurações padrão do sistema
INSERT INTO system_settings (key, value, description) VALUES
('vip_price', '1999', 'Preço do VIP em centavos (R$ 19,99)'),
('vip_duration_days', '30', 'Duração do VIP em dias'),
('max_tables_per_user', '5', 'Máximo de mesas por usuário não-VIP'),
('max_tables_per_vip', '20', 'Máximo de mesas por usuário VIP');

-- Atualizar profiles para ter user_type como admin para o primeiro usuário
-- (você pode ajustar isso depois para seu usuário específico)
