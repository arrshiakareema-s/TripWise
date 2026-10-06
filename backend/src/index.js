import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// In-memory storage (for MVP - no MongoDB)
let trips = [];
let bookings = [];
let users = [];
let nextTripId = 1;
let nextBookingId = 1;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Trips API
app.get('/api/trips', (req, res) => {
  const { page = 1, limit = 10, destination, minPrice, maxPrice, difficulty, search } = req.query;
  let results = [...trips];
  
  if (destination) results = results.filter(t => t.destination === destination);
  if (minPrice || maxPrice) {
    results = results.filter(t => {
      const price = t.price.discountedPrice || t.price.base || 0;
      if (minPrice && price < Number(minPrice)) return false;
      if (maxPrice && price > Number(maxPrice)) return false;
      return true;
    });
  }
  if (difficulty) results = results.filter(t => t.difficulty === difficulty);
  if (search) results = results.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || (t.subtitle && t.subtitle.toLowerCase().includes(search.toLowerCase())));
  
  const start = (Number(page) - 1) * Number(limit);
  const paginated = results.slice(start).slice(0, Number(limit));
  
  res.json({ success: true, trips: paginated, total: results.length });
});

app.get('/api/trips/featured', (req, res) => {
  const featured = trips.filter(t => t.isFeatured);
  res.json({ success: true, trips: featured.slice(0, 6) });
});

app.get('/api/trips/:id', (req, res) => {
  const trip = trips.find(t => t.id === Number(req.params.id));
  if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
  res.json({ success: true, trip });
});

app.post('/api/trips', (req, res) => {
  const { title, destination, duration, difficulty, price, highlights } = req.body;
  const trip = {
    id: nextTripId++,
    title,
    destination,
    duration,
    difficulty,
    price,
    highlights: highlights || [],
    isFeatured: false,
    isActive: true,
    createdAt: new Date().toISOString()
  };
  trips.push(trip);
  res.status(201).json({ success: true, trip });
});

// Bookings API
app.get('/api/bookings', (req, res) => {
  let results = [...bookings];
  const { status } = req.query;
  if (status) results = results.filter(b => b.status === status);
  res.json({ success: true, bookings: results });
});

app.post('/api/bookings', (req, res) => {
  const { tripId, startDate, passengers } = req.body;
  const trip = trips.find(t => t.id === tripId);
  if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
  
  const booking = {
    id: nextBookingId++,
    tripId,
    startDate,
    passengers: passengers || [{ name: 'Passenger 1' }],
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: new Date().toISOString()
  };
  bookings.push(booking);
  res.status(201).json({ success: true, booking });
});

// Users API
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });
  
  const user = { id: users.length + 1, name, email, password: 'hashed_' + password, createdAt: new Date().toISOString() };
  users.push(user);
  res.status(201).json({ success: true, user });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === 'hashed_' + password);
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  res.json({ success: true, user });
});

export default app;

// Start server only when run directly (not when imported by tests)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`TripWise MVP Backend running on http://localhost:${PORT}`);
    console.log('Using in-memory storage (no MongoDB required)');
  });
}
