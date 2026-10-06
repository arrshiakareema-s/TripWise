import { Link } from 'react-router-dom'
import { FiStar, FiMapPin, FiCalendar, FiUsers, FiHeart } from 'react-icons/fi'
import { formatDistanceToNow } from 'date-fns'
import './TripCard.css'

export function TripCard({ trip, variant = 'default', onSave }) {
  const { 
    _id, title, slug, subtitle, duration, price, images, destination, 
    difficulty, rating, reviewCount, bookingCount, highlights, isSaved 
  } = trip

  const primaryImage = images?.find(img => img.isPrimary) || images?.[0]
  const imageUrl = primaryImage?.url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop'
  const discountedPrice = price?.discountedPrice || price?.base || 0
  const currency = price?.currency || 'USD'
  
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const difficultyLabels = {
    easy: 'Easy',
    moderate: 'Moderate',
    challenging: 'Challenging',
    extreme: 'Extreme'
  }

  const difficultyColors = {
    easy: 'success',
    moderate: 'warning',
    challenging: 'error',
    extreme: 'error'
  }

  const handleSaveClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onSave) onSave(_id)
  }

  return (
    <article className={`trip-card card ${variant}`}>
      <Link to={`/trips/${_id || slug}`} className="trip-card-link" aria-label={`View ${title}`}>
        <div className="trip-card-image">
          <img 
            src={imageUrl} 
            alt={primaryImage?.alt || title}
            loading="lazy"
            className="trip-card-img"
          />
          
          <div className="trip-card-badges">
            {difficulty && (
              <span className={`badge badge-${difficultyColors[difficulty] || 'primary'} trip-difficulty`}>
                {difficultyLabels[difficulty] || difficulty}
              </span>
            )}
            {price?.discount && price.discount > 0 && (
              <span className="badge badge-error trip-discount">
                -{price.discount}%
              </span>
            )}
          </div>
          
          <button
            className={`trip-save-btn ${isSaved ? 'saved' : ''}`}
            onClick={handleSaveClick}
            aria-label={isSaved ? 'Remove from saved' : 'Save trip'}
            aria-pressed={isSaved}
          >
            <FiHeart size={18} />
          </button>
        </div>
        
        <div className="trip-card-content">
          <div className="trip-card-header">
            <span className="trip-destination">
              <FiMapPin size={14} />
              {destination?.location?.city || destination?.name || 'Unknown'}
            </span>
          </div>
          
          <h3 className="trip-card-title">{title}</h3>
          
          {subtitle && <p className="trip-card-subtitle">{subtitle}</p>}
          
          <div className="trip-card-meta">
            <span className="trip-meta-item">
              <FiCalendar size={14} />
              {duration?.days} {duration?.days === 1 ? 'day' : 'days'}
            </span>
            {duration?.nights && duration.nights > 0 && (
              <span className="trip-meta-item">
                {duration?.nights} {duration?.nights === 1 ? 'night' : 'nights'}
              </span>
            )}
            <span className="trip-meta-item">
              <FiUsers size={14} />
              {duration?.groupSize?.max || 'Small group'}
            </span>
          </div>
          
          {highlights && highlights.length > 0 && (
            <div className="trip-highlights">
              {highlights.slice(0, 3).map((highlight, i) => (
                <span key={i} className="highlight-tag">{highlight}</span>
              ))}
            </div>
          )}
          
          <div className="trip-card-footer">
            <div className="trip-rating">
              {rating > 0 && (
                <>
                  <FiStar size={16} className="filled" />
                  <span className="rating-value">{rating.toFixed(1)}</span>
                </>
              )}
              {reviewCount > 0 && (
                <span className="review-count">({reviewCount} reviews)</span>
              )}
            </div>
            
            <div className="trip-price">
              <span className="price-amount">{formatPrice(discountedPrice)}</span>
              <span className="price-period">/ person</span>
              {price?.base && price.discount > 0 && (
                <span className="price-original">{formatPrice(price.base)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}