import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../services/api'
import { Hero } from '../components/Hero'
import { TripCard } from '../components/TripCard'
import { DestinationCard } from '../components/DestinationCard'
import { SectionHeader } from '../components/SectionHeader'
import { SkeletonTripCard, SkeletonDestinationCard } from '../components/SkeletonLoaders'
import { FiArrowRight, FiStar, FiMapPin, FiCalendar, FiUsers, FiShield } from 'react-icons/fi'
import './Home.css'

export function Home() {
  const [featuredTrips, setFeaturedTrips] = useState([])
  const [popularDestinations, setPopularDestinations] = useState([])
  const [loadingTrips, setLoadingTrips] = useState(true)
  const [loadingDestinations, setLoadingDestinations] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripsRes, destRes] = await Promise.all([
          api.get('/trips?limit=6&sort=-bookingCount&featured=true'),
          api.get('/destinations?limit=8&sort=-popularity&featured=true')
        ])
        setFeaturedTrips(tripsRes.data.trips || [])
        setPopularDestinations(destRes.data.destinations || [])
      } catch (err) {
        setError('Failed to load featured content')
        console.error(err)
      } finally {
        setLoadingTrips(false)
        setLoadingDestinations(false)
      }
    }

    fetchData()
  }, [])

  const features = [
    { icon: FiStar, title: 'Curated Experiences', description: 'Hand-picked trips designed by travel experts for unforgettable memories.' },
    { icon: FiMapPin, title: 'Global Destinations', description: 'Explore 100+ destinations across 50+ countries worldwide.' },
    { icon: FiCalendar, title: 'Flexible Booking', description: 'Book with confidence with free cancellation on most trips.' },
    { icon: FiUsers, title: 'Small Groups', description: 'Intimate group sizes for authentic experiences and new friendships.' },
    { icon: FiShield, title: 'Secure Payments', description: 'SSL encrypted payments with multiple payment options.' },
    { icon: FiArrowRight, title: '24/7 Support', description: 'Round-the-clock assistance before, during, and after your trip.' }
  ]

  const stats = [
    { value: '50,000+', label: 'Happy Travelers' },
    { value: '100+', label: 'Destinations' },
    { value: '500+', label: 'Unique Trips' },
    { value: '4.9/5', label: 'Customer Rating' }
  ]

  return (
    <div className="home-page">
      <Hero />
      
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-trips-section">
        <div className="container">
          <SectionHeader
            title="Featured Trips"
            subtitle="Hand-picked adventures loved by our community"
            action={{
              label: 'View All Trips',
              href: '/trips'
            }}
          />
          
          <div className="trips-grid grid grid-3">
            {loadingTrips ? (
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonTripCard key={i} />
              ))
            ) : featuredTrips.length > 0 ? (
              featuredTrips.map(trip => (
                <TripCard key={trip._id} trip={trip} />
              ))
            ) : (
              <div className="empty-state">
                <p>No featured trips available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="destinations-section">
        <div className="container">
          <SectionHeader
            title="Popular Destinations"
            subtitle="Discover the world's most sought-after places"
            action={{
              label: 'Explore All',
              href: '/destinations'
            }}
          />
          
          <div className="destinations-grid grid grid-4">
            {loadingDestinations ? (
              Array.from({ length: 8 }).map((_, i) => (
                <SkeletonDestinationCard key={i} />
              ))
            ) : popularDestinations.length > 0 ? (
              popularDestinations.map(dest => (
                <DestinationCard key={dest._id} destination={dest} />
              ))
            ) : (
              <div className="empty-state">
                <p>No destinations available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <SectionHeader
            title="Why Choose TripWise?"
            subtitle="We make travel planning effortless and enjoyable"
          />
          
          <div className="features-grid grid grid-3">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">
                  <feature.icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Start Your Adventure?</h2>
            <p>Join thousands of travelers who trust TripWise for their journeys</p>
            <div className="cta-actions">
              <Link to="/trips" className="btn btn-primary btn-lg">Browse Trips</Link>
              <Link to="/destinations" className="btn btn-outline btn-lg">Explore Destinations</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}