import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'

// Import pages
import Home from './pages/Home'
import Login from './pages/Login'

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Apple-style black
      light: '#1d1d1f',
      dark: '#000000',
    },
    secondary: {
      main: '#06c', // Apple-style blue
      light: '#147ce5',
      dark: '#0055b3',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f7',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '40px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '32px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 20px',
          fontSize: '16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Other routes will be added as we create their components */}
          {/* <Route path="/register" element={<Register />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/bookings" element={<BookingHistory />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/hotels" element={<HotelManagement />} />
          <Route path="/admin/rooms" element={<RoomManagement />} />
          <Route path="/admin/bookings" element={<BookingManagement />} />
          <Route path="/admin/reports" element={<Reports />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
