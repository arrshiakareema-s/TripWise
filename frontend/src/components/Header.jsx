import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect, useRef } from 'react'
import {
  FiMenu, FiX, FiSearch, FiHeart, FiUser, FiLogOut, FiSettings,
  FiMapPin, FiCalendar, FiUsers, FiStar, FiArrowRight
} from 'react-icons/fi'
import './Header.css'

export function Header({ isAuthPage = false }) {
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const userMenuRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  const navLinks = [
    { path: '/trips', label: 'Trips', icon: FiMapPin },
    { path: '/destinations', label: 'Destinations', icon: FiStar },
    { path: '/search', label: 'Search', icon: FiSearch }
  ]

  const userMenuItems = [
    { path: '/profile', label: 'My Profile', icon: FiUser },
    { path: '/bookings', label: 'My Bookings', icon: FiCalendar },
    { path: '/saved-trips', label: 'Saved Trips', icon: FiHeart },
    { path: '/wishlist', label: 'Wishlist', icon: FiStar },
    { path: '/reviews', label: 'My Reviews', icon: FiStar }
  ]

  if (isAuthPage) {
    return (
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <Link to="/" className="logo" aria-label="TripWise Home">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" stroke="#2563eb" strokeWidth="2"/>
              <path d="M16 8L22 14V22L16 28L10 22V14L16 8Z" fill="#2563eb"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
            </svg>
            <span>TripWise</span>
          </Link>
          <div className="header-actions">
            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo" aria-label="TripWise Home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" stroke="#2563eb" strokeWidth="2"/>
            <path d="M16 8L22 14V22L16 28L10 22V14L16 8Z" fill="#2563eb"/>
            <circle cx="16" cy="16" r="4" fill="white"/>
          </svg>
          <span>TripWise</span>
        </Link>

        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <ul className="nav-list">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link 
                  to={path} 
                  className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions" ref={searchRef}>
          <button 
            className="header-search-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search trips"
            aria-expanded={searchOpen}
          >
            <FiSearch size={20} />
          </button>

          {searchOpen && (
            <div className="search-dropdown">
              <form onSubmit={(e) => { e.preventDefault(); setSearchOpen(false); }}>
                <input
                  type="search"
                  placeholder="Search destinations, trips..."
                  className="search-input"
                  autoFocus
                  aria-label="Search"
                />
              </form>
              <div className="search-suggestions">
                <span className="search-suggestion-label">Popular searches:</span>
                <div className="search-tags">
                  {['Bali', 'Switzerland', 'Japan', 'Maldives', 'Iceland'].map(tag => (
                    <button key={tag} type="button" className="search-tag">{tag}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isAuthenticated ? (
            <div className="user-menu-wrapper" ref={userMenuRef}>
              <button
                className="user-menu-trigger"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="" />
                  ) : (
                    <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </div>
                <span className="user-name">{user?.name}</span>
                <FiArrowRight size={16} className={`chevron ${userMenuOpen ? 'open' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="user-menu-dropdown" role="menu">
                  <div className="user-menu-header">
                    <div className="user-avatar large">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="" />
                      ) : (
                        <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                      )}
                    </div>
                    <div className="user-info">
                      <h4>{user?.name}</h4>
                      <p>{user?.email}</p>
                    </div>
                  </div>
                  <div className="user-menu-divider" />
                  <nav>
                    <ul>
                      {userMenuItems.map(({ path, label, icon: Icon }) => (
                        <li key={path}>
                          <Link to={path} className="user-menu-item" onClick={() => setUserMenuOpen(false)} role="menuitem">
                            <Icon size={18} />
                            <span>{label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="user-menu-divider" />
                  <button onClick={handleLogout} className="user-menu-item logout" role="menuitem">
                    <FiLogOut size={18} />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="header-auth">
              <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
            </div>
          )}

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
          <nav>
            <ul>
              {navLinks.map(({ path, label, icon: Icon }) => (
                <li key={path}>
                  <Link to={path} className={`mobile-nav-link ${location.pathname === path ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                    <Icon size={20} />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {isAuthenticated ? (
            <div className="mobile-user-menu">
              <div className="mobile-user-info">
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="" />
                  ) : (
                    <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </div>
                <div>
                  <p className="mobile-user-name">{user?.name}</p>
                  <p className="mobile-user-email">{user?.email}</p>
                </div>
              </div>
              <nav>
                <ul>
                  {userMenuItems.map(({ path, label, icon: Icon }) => (
                    <li key={path}>
                      <Link to={path} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                        <Icon size={20} />
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button onClick={handleLogout} className="mobile-nav-link logout">
                      <FiLogOut size={20} />
                      <span>Log out</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            <div className="mobile-auth">
              <Link to="/login" className="btn btn-ghost btn-full" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
              <Link to="/register" className="btn btn-primary btn-full" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}