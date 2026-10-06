import { createContext, useContext, useState, useCallback } from 'react'
import api from '../services/api'

const TripContext = createContext(null)

export function TripProvider({ children }) {
  const [filters, setFilters] = useState({
    search: '',
    destination: '',
    minPrice: '',
    maxPrice: '',
    duration: '',
    difficulty: '',
    categories: [],
    sort: '-createdAt',
    startDate: ''
  })
  const [currentTrip, setCurrentTrip] = useState(null)
  const [currentDestination, setCurrentDestination] = useState(null)

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      destination: '',
      minPrice: '',
      maxPrice: '',
      duration: '',
      difficulty: '',
      categories: [],
      sort: '-createdAt',
      startDate: ''
    })
  }, [])

  const fetchTrip = useCallback(async (id) => {
    try {
      const response = await api.get(`/trips/${id}`)
      setCurrentTrip(response.data.trip)
      return response.data.trip
    } catch (err) {
      throw err
    }
  }, [])

  const fetchDestination = useCallback(async (slug) => {
    try {
      const response = await api.get(`/destinations/slug/${slug}`)
      setCurrentDestination(response.data.destination)
      return response.data.destination
    } catch (err) {
      throw err
    }
  }, [])

  const value = {
    filters,
    updateFilters,
    resetFilters,
    currentTrip,
    currentDestination,
    fetchTrip,
    fetchDestination
  }

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  )
}

export function useTrip() {
  const context = useContext(TripContext)
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider')
  }
  return context
}