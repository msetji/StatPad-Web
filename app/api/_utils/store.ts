import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

interface WaitlistEntry {
  name: string;
  email: string;
  source: string;
  [key: string]: unknown;
}

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  [key: string]: unknown;
}

// Initialize Supabase client if env vars are provided
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase: ReturnType<typeof createClient> | null = null;
if (supabaseUrl && serviceKey) {
  try {
    supabase = createClient(supabaseUrl, serviceKey);
  } catch (e) {
    console.error('Failed to create Supabase client', e);
  }
}

function ensureDataFile() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const filePath = path.join(dataDir, 'submissions.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }
  return filePath;
}

async function appendToLocalFile(entry: object) {
  const file = ensureDataFile();
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as any[];
  data.push(entry);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export async function addWaitlistEntry(entry: WaitlistEntry) {
  if (supabase) {
    try {
      await (supabase as any).from('waitlist').insert(entry);
      return;
    } catch (error) {
      console.error('Supabase insert error (waitlist):', error);
    }
  }
  await appendToLocalFile({ type: 'waitlist', ...entry, created_at: new Date().toISOString() });
}

export async function addContactMessage(entry: ContactMessage) {
  if (supabase) {
    try {
      await (supabase as any).from('contact_messages').insert(entry);
      return;
    } catch (error) {
      console.error('Supabase insert error (contact):', error);
    }
  }
  await appendToLocalFile({ type: 'contact', ...entry, created_at: new Date().toISOString() });
}