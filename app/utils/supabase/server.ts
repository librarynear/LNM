import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            
          }
        },
      },
    }
  )
}

export async function getUser(){
    const supabase = await createClient()
    const userObject = await supabase.auth.getUser()

    if(userObject.error){
        console.log(userObject.error)
        return null
    }
    return userObject.data.user
}