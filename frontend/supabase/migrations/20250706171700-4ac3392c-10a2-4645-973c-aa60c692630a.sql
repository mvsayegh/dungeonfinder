
-- Criar enum para tipos de usuário
CREATE TYPE user_type AS ENUM ('player', 'master', 'admin', 'vip');

-- Criar enum para status de mesa
CREATE TYPE table_status AS ENUM ('open', 'full', 'in_progress', 'completed', 'cancelled');

-- Criar enum para modalidade de mesa
CREATE TYPE table_mode AS ENUM ('presencial', 'online_voice', 'online_text', 'hybrid');

-- Tabela de perfis de usuário
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  cover_url TEXT,
  bio TEXT,
  location VARCHAR(100),
  instagram VARCHAR(50),
  twitter VARCHAR(50),
  discord VARCHAR(50),
  user_type user_type DEFAULT 'player',
  is_verified BOOLEAN DEFAULT FALSE,
  is_vip BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de sistemas de RPG
CREATE TABLE rpg_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mesas de RPG
CREATE TABLE rpg_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  master_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  system_id UUID REFERENCES rpg_systems(id) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  max_players INTEGER NOT NULL CHECK (max_players > 0 AND max_players <= 8),
  current_players INTEGER DEFAULT 0,
  session_date TIMESTAMP WITH TIME ZONE,
  session_frequency VARCHAR(50),
  location VARCHAR(200),
  mode table_mode NOT NULL,
  status table_status DEFAULT 'open',
  is_vip BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de aplicações para mesas
CREATE TABLE table_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID REFERENCES rpg_tables(id) ON DELETE CASCADE NOT NULL,
  player_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(table_id, player_id)
);

-- Tabela de jogadores em mesas
CREATE TABLE table_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID REFERENCES rpg_tables(id) ON DELETE CASCADE NOT NULL,
  player_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(table_id, player_id)
);

-- Tabela de avaliações
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID REFERENCES rpg_tables(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reviewed_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(table_id, reviewer_id, reviewed_id)
);

-- Tabela de sessões
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID REFERENCES rpg_tables(id) ON DELETE CASCADE NOT NULL,
  session_number INTEGER NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir sistemas de RPG populares
INSERT INTO rpg_systems (name, description) VALUES
('D&D 5e', 'Dungeons & Dragons 5ª Edição - O sistema mais popular do mundo'),
('Tormenta RPG', 'RPG nacional brasileiro ambientado no mundo de Arton'),
('Pathfinder', 'Sistema baseado no D&D 3.5 com regras mais complexas'),
('Call of Cthulhu', 'Horror cósmico baseado nas obras de H.P. Lovecraft'),
('Vampiro: A Máscara', 'RPG de vampiros modernos com intrigas políticas'),
('Old Dragon', 'RPG nacional inspirado nos clássicos dos anos 80'),
('3D&T', 'Defensores de Tóquio - RPG nacional de anime e mangá');

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rpg_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE rpg_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Profiles são públicos para leitura" ON profiles FOR SELECT USING (true);
CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Usuários podem inserir seu próprio perfil" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para rpg_systems
CREATE POLICY "Sistemas são públicos para leitura" ON rpg_systems FOR SELECT USING (is_active = true);
CREATE POLICY "Apenas admins podem modificar sistemas" ON rpg_systems FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'admin')
);

-- Políticas RLS para rpg_tables
CREATE POLICY "Mesas são públicas para leitura" ON rpg_tables FOR SELECT USING (true);
CREATE POLICY "Mestres podem criar suas próprias mesas" ON rpg_tables FOR INSERT WITH CHECK (auth.uid() = master_id);
CREATE POLICY "Mestres podem atualizar suas próprias mesas" ON rpg_tables FOR UPDATE USING (auth.uid() = master_id);
CREATE POLICY "Mestres podem deletar suas próprias mesas" ON rpg_tables FOR DELETE USING (auth.uid() = master_id);

-- Políticas RLS para table_applications
CREATE POLICY "Aplicações são visíveis para mestre e jogador" ON table_applications FOR SELECT USING (
  auth.uid() = player_id OR 
  auth.uid() IN (SELECT master_id FROM rpg_tables WHERE id = table_id)
);
CREATE POLICY "Jogadores podem criar aplicações" ON table_applications FOR INSERT WITH CHECK (auth.uid() = player_id);
CREATE POLICY "Mestres podem atualizar aplicações de suas mesas" ON table_applications FOR UPDATE USING (
  auth.uid() IN (SELECT master_id FROM rpg_tables WHERE id = table_id)
);

-- Políticas RLS para table_players
CREATE POLICY "Jogadores de mesa são visíveis para todos" ON table_players FOR SELECT USING (true);
CREATE POLICY "Apenas mestres podem adicionar jogadores" ON table_players FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT master_id FROM rpg_tables WHERE id = table_id)
);
CREATE POLICY "Apenas mestres podem remover jogadores" ON table_players FOR DELETE USING (
  auth.uid() IN (SELECT master_id FROM rpg_tables WHERE id = table_id)
);

-- Políticas RLS para reviews
CREATE POLICY "Reviews são públicas para leitura" ON reviews FOR SELECT USING (true);
CREATE POLICY "Usuários podem criar reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Usuários podem atualizar suas próprias reviews" ON reviews FOR UPDATE USING (auth.uid() = reviewer_id);

-- Políticas RLS para sessions
CREATE POLICY "Sessões são visíveis para participantes" ON sessions FOR SELECT USING (
  auth.uid() IN (
    SELECT master_id FROM rpg_tables WHERE id = table_id
    UNION
    SELECT player_id FROM table_players WHERE table_id = sessions.table_id
  )
);
CREATE POLICY "Apenas mestres podem gerenciar sessões" ON sessions FOR ALL USING (
  auth.uid() IN (SELECT master_id FROM rpg_tables WHERE id = table_id)
);

-- Função para criar perfil automaticamente após cadastro
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'user_type')::user_type, 'player')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Função para atualizar rating do usuário
CREATE OR REPLACE FUNCTION update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM reviews 
      WHERE reviewed_id = NEW.reviewed_id
    )
  WHERE id = NEW.reviewed_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizar rating
CREATE TRIGGER on_review_created
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_user_rating();

-- Função para atualizar contador de jogadores na mesa
CREATE OR REPLACE FUNCTION update_table_player_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE rpg_tables SET 
      current_players = current_players + 1,
      status = CASE 
        WHEN current_players + 1 >= max_players THEN 'full'::table_status
        ELSE status
      END
    WHERE id = NEW.table_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE rpg_tables SET 
      current_players = current_players - 1,
      status = CASE 
        WHEN current_players - 1 < max_players AND status = 'full' THEN 'open'::table_status
        ELSE status
      END
    WHERE id = OLD.table_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers para atualizar contador de jogadores
CREATE TRIGGER on_player_added
  AFTER INSERT ON table_players
  FOR EACH ROW EXECUTE FUNCTION update_table_player_count();

CREATE TRIGGER on_player_removed
  AFTER DELETE ON table_players
  FOR EACH ROW EXECUTE FUNCTION update_table_player_count();
