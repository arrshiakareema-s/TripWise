import { Link } from 'react-router-dom'
import { FiStar, FiMapPin, FiHeart } from 'react-icons/fi'
import './DestinationCard.css'

export function DestinationCard({ destination, variant = 'default', onWishlist }) {
  const { _id, name, slug, description, location, images, categories, rating, reviewCount, highlights, isWishlisted } = destination

  const primaryImage = images?.find(img => img.isPrimary) || images?.[0]
  const imageUrl = primaryImage?.url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop'

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onWishlist) onWishlist(_id)
  }

  return (
    <article className={`destination-card card ${variant}`}>
      <Link to={`/destinations/${slug}`} className="destination-card-link" aria-label={`Explore ${name}`}>
        <div className="destination-card-image">
          <img 
            src={imageUrl} 
            alt={primaryImage?.alt || name}
            loading="lazy"
            className="destination-card-img"
          />
          
          <div className="destination-card-overlay">
            <button
              className={`destination-wishlist-btn ${isWishlisted ? 'saved' : ''}`}
              onClick={handleWishlistClick}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={isWishlisted}
            >
              <FiHeart size={20} />
            </button>
          </div>
          
          {categories && categories.length > 0 && (
            <div className="destination-categories">
              {categories.slice(0, 2).map((cat, i) => (
                <span key={i} className="category-tag">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="destination-card-content">
          <div className="destination-card-header">
            <h3 className="destination-name">{name}</h3>
            <span className="destination-location">
              <FiMapPin size={14} />
              {location?.city}, {location?.country}
            </span>
          </div>
          
          {description && (
            <p className="destination-description">
              {description.substring(0, 120)}...
            </p>
          )}
          
          {highlights && highlights.length > 0 && (
            <div className="destination-highlights">
              {highlights.slice(0, 3).map((highlight, i) => (
                <span key={i} className="highlight-tag">{highlight}</span>
              ))}
            </div>
          )}
          
          <div className="destination-card-footer">
            <div className="destination-rating">
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
            
            <span className="explore-text">
              Explore
              <FiStar size={14} className="explore-icon" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}