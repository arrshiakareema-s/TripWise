import { Link } from 'react-router-dom'
import {
  FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiMapPin, FiPhone
} from 'react-icons/fi'
import './Footer.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
      { label: 'Partnerships', href: '/partnerships' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Cancellation Policy', href: '/cancellation-policy' },
      { label: 'Travel Insurance', href: '/insurance' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' }
    ],
    travel: [
      { label: 'Destinations', href: '/destinations' },
      { label: 'Trip Types', href: '/trip-types' },
      { label: 'Group Travel', href: '/group-travel' },
      { label: 'Custom Trips', href: '/custom-trips' },
      { label: 'Gift Cards', href: '/gift-cards' }
    ]
  }

  const socialLinks = [
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiYoutube, href: 'https://youtube.com', label: 'YouTube' }
  ]

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="TripWise Home">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="#2563eb" strokeWidth="2"/>
                <path d="M16 8L22 14V22L16 28L10 22V14L16 8Z" fill="#2563eb"/>
                <circle cx="16" cy="16" r="4" fill="white"/>
              </svg>
              <span>TripWise</span>
            </Link>
            <p className="footer-tagline">
              Your journey starts here. Discover amazing destinations, 
              curated itineraries, and seamless booking experiences.
            </p>
            <div className="footer-social">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a 
                  key={label} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <nav className="footer-nav" aria-label="Company links">
            <h3>Company</h3>
            <ul>
              {footerLinks.company.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-nav" aria-label="Support links">
            <h3>Support</h3>
            <ul>
              {footerLinks.support.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-nav" aria-label="Legal links">
            <h3>Legal</h3>
            <ul>
              {footerLinks.legal.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-nav" aria-label="Travel links">
            <h3>Travel</h3>
            <ul>
              {footerLinks.travel.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <div className="contact-items">
            <a href="mailto:hello@tripwise.com" className="contact-item">
              <FiMail size={20} />
              <span>hello@tripwise.com</span>
            </a>
            <a href="tel:+1800TRIPWISE" className="contact-item">
              <FiPhone size={20} />
              <span>+1 800-TRIPWISE</span>
            </a>
            <address className="contact-item">
              <FiMapPin size={20} />
              <span>123 Travel Street, San Francisco, CA 94102</span>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} TripWise. All rights reserved.
          </p>
          <div className="footer-badges">
            <span className="badge badge-primary">Secure Booking</span>
            <span className="badge badge-primary">24/7 Support</span>
            <span className="badge badge-primary">Best Price Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  )
}