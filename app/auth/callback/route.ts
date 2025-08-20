import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  console.log('Auth callback route hit:', request.url)
  
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  
  console.log('Auth callback params:', { code: code ? 'present' : 'missing', error })

  if (error) {
    console.error('OAuth error from provider:', error)
    return NextResponse.redirect(new URL(`/auth?error=${error}`, request.url))
  }

  if (code) {
    console.log('Exchanging code for session...')
    
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Code exchange error:', exchangeError)
      return NextResponse.redirect(new URL(`/auth?error=exchange_failed&details=${encodeURIComponent(exchangeError.message)}`, request.url))
    }
    
    if (data?.session) {
      console.log('Session created successfully, redirecting to dashboard')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      console.error('No session created despite successful exchange')
      return NextResponse.redirect(new URL('/auth?error=no_session', request.url))
    }
  }

  console.error('No code parameter found in callback')
  return NextResponse.redirect(new URL('/auth?error=no_code', request.url))
}