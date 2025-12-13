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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Header isScrolled={isScrolled} />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}
