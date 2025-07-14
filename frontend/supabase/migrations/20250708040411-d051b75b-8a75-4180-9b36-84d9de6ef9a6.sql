
-- Inserir sistemas de RPG básicos se não existirem
-- Usar uma abordagem diferente já que não há constraint única em name
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM rpg_systems WHERE name = 'D&D 5e') THEN
    INSERT INTO rpg_systems (name, description) VALUES ('D&D 5e', 'A quinta edição do clássico Dungeons & Dragons');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM rpg_systems WHERE name = 'Pathfinder 2e') THEN
    INSERT INTO rpg_systems (name, description) VALUES ('Pathfinder 2e', 'Sistema complexo e estratégico da Paizo');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM rpg_systems WHERE name = 'Tormenta RPG') THEN
    INSERT INTO rpg_systems (name, description) VALUES ('Tormenta RPG', 'O RPG nacional brasileiro mais popular');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM rpg_systems WHERE name = 'Call of Cthulhu') THEN
    INSERT INTO rpg_systems (name, description) VALUES ('Call of Cthulhu', 'Horror cósmico baseado nas obras de H.P. Lovecraft');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM rpg_systems WHERE name = 'Vampiro: A Máscara') THEN
    INSERT INTO rpg_systems (name, description) VALUES ('Vampiro: A Máscara', 'RPG de horror pessoal e político');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM rpg_systems WHERE name = 'World of Darkness') THEN
    INSERT INTO rpg_systems (name, description) VALUES ('World of Darkness', 'Mundo das trevas com múltiplas criaturas sobrenaturais');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM rpg_systems WHERE name = 'GURPS') THEN
    INSERT INTO rpg_systems (name, description) VALUES ('GURPS', 'Sistema genérico universal de RPG');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM rpg_systems WHERE name = 'Savage Worlds') THEN
    INSERT INTO rpg_systems (name, description) VALUES ('Savage Worlds', 'Sistema rápido, divertido e furioso');
  END IF;
END $$;

-- Criar função para atualizar o current_players automaticamente
CREATE OR REPLACE FUNCTION update_table_current_players()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE rpg_tables 
    SET current_players = (
      SELECT COUNT(*) FROM table_players WHERE table_id = NEW.table_id
    ),
    status = CASE 
      WHEN (SELECT COUNT(*) FROM table_players WHERE table_id = NEW.table_id) >= max_players 
      THEN 'full'::table_status
      ELSE 'open'::table_status
    END
    WHERE id = NEW.table_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE rpg_tables 
    SET current_players = (
      SELECT COUNT(*) FROM table_players WHERE table_id = OLD.table_id
    ),
    status = CASE 
      WHEN (SELECT COUNT(*) FROM table_players WHERE table_id = OLD.table_id) < max_players 
      THEN 'open'::table_status
      ELSE status
    END
    WHERE id = OLD.table_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar automaticamente o número de jogadores
DROP TRIGGER IF EXISTS trigger_update_table_players ON table_players;
CREATE TRIGGER trigger_update_table_players
  AFTER INSERT OR DELETE ON table_players
  FOR EACH ROW EXECUTE FUNCTION update_table_current_players();

-- Atualizar dados existentes
UPDATE rpg_tables SET current_players = (
  SELECT COUNT(*) FROM table_players WHERE table_id = rpg_tables.id
);
