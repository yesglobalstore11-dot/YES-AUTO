import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function getSession() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session')?.value

  if (!sessionToken) {
    return null
  }

  const supabase = createClient(cookieStore)
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', sessionToken)
    .single()

  return user
}

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    return null
  }
  
  return session
}
