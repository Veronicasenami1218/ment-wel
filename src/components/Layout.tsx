import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from '../hooks/useAuth'

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 transition-colors duration-200">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
        <Header isScrolled={isScrolled} />

        <main className="flex-1 w-full overflow-x-hidden">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}
