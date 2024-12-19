import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Payment from './pages/Payment'
import BookingConfirmation from './pages/BookingConfirmation'
import ErrorBoundary from './components/ErrorBoundary'
import { CssBaseline } from '@mui/material'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorBoundary showHome={false} />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorBoundary showHome={true} />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorBoundary showHome={true} />
  },
  {
    path: '/rooms',
    element: <Rooms />,
    errorElement: <ErrorBoundary showHome={true} />
  },
  {
    path: '/rooms/:id',
    element: <RoomDetail />,
    errorElement: <ErrorBoundary 
      showHome={true}
      fallback="We couldn't load this room's details. Please try again or browse other rooms."
    />
  },
  {
    path: '/payment',
    element: <Payment />,
    errorElement: <ErrorBoundary showHome={true} />
  },
  {
    path: '/booking-confirmation',
    element: <BookingConfirmation />,
    errorElement: <ErrorBoundary showHome={true} />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{
      "client-id": "test", // Replace with your PayPal client ID in production
      currency: "USD"
    }}>
      <CssBaseline />
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </PayPalScriptProvider>
  </React.StrictMode>
)
