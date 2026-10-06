import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Trips } from './pages/Trips'
import { TripDetail } from './pages/TripDetail'
import { Destinations } from './pages/Destinations'
import { DestinationDetail } from './pages/DestinationDetail'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Profile } from './pages/user/Profile'
import { MyBookings } from './pages/user/MyBookings'
import { MySavedTrips } from './pages/user/MySavedTrips'
import { MyWishlist } from './pages/user/MyWishlist'
import { MyReviews } from './pages/user/MyReviews'
import { BookingConfirm } from './pages/booking/BookingConfirm'
import { BookingSuccess } from './pages/booking/BookingSuccess'
import { Checkout } from './pages/booking/Checkout'
import { SearchResults } from './pages/SearchResults'
import { NotFound } from './pages/NotFound'
import { PrivateRoute } from './components/PrivateRoute'
import { useAuth } from './context/AuthContext'

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner" style={{ width: 40, height: 40 }} />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="trips" element={<Trips />} />
        <Route path="trips/:id" element={<TripDetail />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="destinations/:slug" element={<DestinationDetail />} />
        <Route path="search" element={<SearchResults />} />
        
        {/* Auth Pages */}
        <Route path="login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
        
        {/* Protected User Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="saved-trips" element={<MySavedTrips />} />
          <Route path="wishlist" element={<MyWishlist />} />
          <Route path="reviews" element={<MyReviews />} />
          
          {/* Booking Flow */}
          <Route path="booking/:tripId" element={<BookingConfirm />} />
          <Route path="checkout/:bookingId" element={<Checkout />} />
          <Route path="booking-success/:bookingId" element={<BookingSuccess />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}