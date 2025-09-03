import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Initialize Supabase client
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

async function getLocalStats() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'submissions.json');
    if (!fs.existsSync(dataPath)) {
      return { waitlistCount: 0 };
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const waitlistCount = data.filter((entry: any) => entry.type === 'waitlist').length;
    
    return { waitlistCount };
  } catch (error) {
    console.error('Error reading local data:', error);
    return { waitlistCount: 0 };
  }
}

async function getSupabaseStats() {
  if (!supabase) return null;
  
  try {
    // Get all stats in parallel
    const [
      { count: waitlistCount },
      { count: betaUsersCount },
      { count: clipsCount }
    ] = await Promise.all([
      supabase.from('waitlist').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('posts').select('*', { count: 'exact', head: true })
    ]);
    
    return {
      waitlistCount: waitlistCount || 0,
      betaUsersCount: betaUsersCount || 0,
      clipsCount: clipsCount || 0,
    };
  } catch (error) {
    console.error('Error fetching Supabase stats:', error);
    return null;
  }
}

export async function GET() {
  try {
    // Try Supabase first, fall back to local data
    const supabaseStats = await getSupabaseStats();
    const localStats = await getLocalStats();
    
    const stats = {
      waitlistCount: 700,
      betaUsersCount: supabaseStats?.betaUsersCount ?? 0,
      clipsCount: supabaseStats?.clipsCount ?? 0,
    };
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}