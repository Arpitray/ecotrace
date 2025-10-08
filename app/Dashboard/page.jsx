"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/SupabaseClient'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/Login')
      } else {
        setUser(data.session.user)
      }
    })

    // Listen for logout/login changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push('/Login')
      else setUser(session.user)
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/Login')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        <>
          <h2 className="text-2xl mb-4">Welcome, {user.email}</h2>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
