import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'
import './Layout.css'

export function Layout() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className="layout">
      <ScrollToTop />
      <Header isAuthPage={isAuthPage} />
      <main className="layout-main" id="main-content">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}