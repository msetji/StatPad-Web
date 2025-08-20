-- Enable Row Level Security
-- Create tables for StatPad

-- Waitlist table (if not already exists)
CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'web',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table (if not already exists)  
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Games table - tracks recorded games
CREATE TABLE IF NOT EXISTS games (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  game_title TEXT NOT NULL,
  duration_seconds INTEGER,
  score INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clips table - tracks shared clips/highlights
CREATE TABLE IF NOT EXISTS clips (
  id BIGSERIAL PRIMARY KEY,
  game_id BIGINT REFERENCES games(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration_seconds INTEGER,
  view_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badge types lookup table
CREATE TABLE IF NOT EXISTS badge_types (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  requirements JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User badges - tracks earned badges
CREATE TABLE IF NOT EXISTS user_badges (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_type_id BIGINT REFERENCES badge_types(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress JSONB DEFAULT '{}',
  UNIQUE(user_id, badge_type_id)
);

-- Insert some sample badge types
INSERT INTO badge_types (name, description, icon, rarity, requirements) VALUES 
  ('First Game', 'Record your first game', '🎮', 'common', '{"games_played": 1}'),
  ('Clip Master', 'Share 10 clips', '📹', 'rare', '{"clips_shared": 10}'),
  ('Marathon Player', 'Play for 10 hours total', '⏰', 'epic', '{"total_hours": 10}'),
  ('Legendary Gamer', 'Achieve 100 games recorded', '👑', 'legendary', '{"games_played": 100}')
ON CONFLICT (name) DO NOTHING;

-- Enable RLS on all tables
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE clips ENABLE ROW LEVEL SECURITY;
ALTER TABLE badge_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Waitlist: Allow insert for everyone, select for service role only
CREATE POLICY "Allow public waitlist signup" ON waitlist
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Contact: Allow insert for everyone  
CREATE POLICY "Allow public contact messages" ON contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Games: Users can only see/modify their own games
CREATE POLICY "Users can view own games" ON games
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own games" ON games
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own games" ON games
  FOR UPDATE USING (auth.uid() = user_id);

-- Clips: Users can see public clips and manage their own
CREATE POLICY "Users can view public clips" ON clips
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can insert own clips" ON clips
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own clips" ON clips
  FOR UPDATE USING (auth.uid() = user_id);

-- Badge types: Public read access
CREATE POLICY "Badge types are publicly readable" ON badge_types
  FOR SELECT TO anon, authenticated USING (true);

-- User badges: Users can only see their own badges
CREATE POLICY "Users can view own badges" ON user_badges
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can earn badges" ON user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_games_user_id ON games(user_id);
CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clips_user_id ON clips(user_id);
CREATE INDEX IF NOT EXISTS idx_clips_game_id ON clips(game_id);
CREATE INDEX IF NOT EXISTS idx_clips_public ON clips(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at DESC);