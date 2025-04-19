CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- Store hashed passwords if using Supabase auth
  role TEXT CHECK (role IN ('client', 'admin')) NOT NULL DEFAULT 'client',
  created_at TIMESTAMP DEFAULT NOW()
);
