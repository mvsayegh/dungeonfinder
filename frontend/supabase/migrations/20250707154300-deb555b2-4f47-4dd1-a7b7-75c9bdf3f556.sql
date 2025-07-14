
-- Primeiro, vamos verificar se a tabela profiles existe e recriar se necessário
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Recriar a tabela profiles
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username character varying NOT NULL,
  full_name character varying NOT NULL,
  user_type user_type DEFAULT 'player'::user_type,
  is_verified boolean DEFAULT false,
  is_vip boolean DEFAULT false,
  rating numeric DEFAULT 0.00,
  total_sessions integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  discord character varying,
  avatar_url text,
  cover_url text,
  bio text,
  location character varying,
  instagram character varying,
  twitter character varying,
  PRIMARY KEY (id)
);

-- Recriar as políticas RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública
CREATE POLICY "Profiles são públicos para leitura" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

-- Política para inserção (usuários podem criar seu próprio perfil)
CREATE POLICY "Usuários podem inserir seu próprio perfil" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Política para atualização (usuários podem atualizar seu próprio perfil)
CREATE POLICY "Usuários podem atualizar seu próprio perfil" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Remover trigger antigo se existir
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recriar a função de handle de novo usuário com mais robustez
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Inserir na tabela profiles
  INSERT INTO public.profiles (
    id, 
    username, 
    full_name, 
    user_type
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'user_type')::user_type, 'player'::user_type)
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log do erro mas não falha o signup
    RAISE WARNING 'Erro ao criar perfil para usuário %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Recriar o trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
