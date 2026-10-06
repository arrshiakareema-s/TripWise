import { Link } from 'react-router-dom'
import { FiSearch, FiMapPin, FiCalendar, FiUsers, FiArrowRight } from 'react-icons/fi'
import './Hero.css'

export function Hero() {
  const stats = [
    { icon: FiMapPin, value: '100+', label: 'Destinations' },
    { icon: FiCalendar, value: '500+', label: 'Unique Trips' },
    { icon: FiUsers, value: '50K+', label: 'Happy Travelers' }
  ]

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-gradient" />
        <div className="hero-pattern" />
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <h1 id="hero-title" className="hero-title">
            Plan Your Perfect <span className="highlight">Getaway</span>
          </h1>
          <p className="hero-subtitle">
            Discover curated trips, explore breathtaking destinations, and book with confidence. 
            Your next adventure starts here.
          </p>
          
          <form className="hero-search" action="/search" role="search">
            <div className="search-fields">
              <div className="search-field">
                <label htmlFor="destination" className="visually-hidden">Destination</label>
                <FiMapPin className="search-icon" size={20} />
                <input
                  type="search"
                  id="destination"
                  name="destination"
                  placeholder="Where do you want to go?"
                  className="search-input"
                  autoComplete="off"
                />
              </div>
              
              <div className="search-field">
                <label htmlFor="dates" className="visually-hidden">Travel Dates</label>
                <FiCalendar className="search-icon" size={20} />
                <input
                  type="text"
                  id="dates"
                  name="dates"
                  placeholder="Travel dates"
                  className="search-input"
                  readOnly
                />
              </div>
              
              <div className="search-field">
                <label htmlFor="travelers" className="visually-hidden">Travelers</label>
                <FiUsers className="search-icon" size={20} />
                <select id="travelers" name="travelers" className="search-input">
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5">5+ Travelers</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-lg hero-search-btn">
              <FiSearch size={20} />
              <span>Search Trips</span>
            </button>
          </form>
          
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="hero-stat">
                <div className="hero-stat-icon">
                  <stat.icon size={20} />
                </div>
                <div className="hero-stat-info">
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-image-container">
            <div className="hero-image-placeholder">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#e2e8f0"/>
                <path d="M100 250L200 100L300 250" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="350" cy="80" r="40" stroke="#f59e0b" strokeWidth="3"/>
                <circle cx="350" cy="80" r="20" fill="#f59e0b"/>
              </svg>
            </div>
            <div className="hero-badge">
              <span className="badge badge-primary">Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator" aria-hidden="true">
        <FiArrowRight size={24} />
      </div>
    </section>
  )
}