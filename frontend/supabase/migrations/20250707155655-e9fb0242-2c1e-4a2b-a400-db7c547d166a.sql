
-- Add missing foreign key constraints to connect tables to profiles
ALTER TABLE rpg_tables 
ADD CONSTRAINT rpg_tables_master_id_fkey 
FOREIGN KEY (master_id) REFERENCES profiles(id);

ALTER TABLE table_players 
ADD CONSTRAINT table_players_player_id_fkey 
FOREIGN KEY (player_id) REFERENCES profiles(id);

ALTER TABLE table_applications 
ADD CONSTRAINT table_applications_player_id_fkey 
FOREIGN KEY (player_id) REFERENCES profiles(id);

ALTER TABLE reviews 
ADD CONSTRAINT reviews_reviewer_id_fkey 
FOREIGN KEY (reviewer_id) REFERENCES profiles(id);

ALTER TABLE reviews 
ADD CONSTRAINT reviews_reviewed_id_fkey 
FOREIGN KEY (reviewed_id) REFERENCES profiles(id);
