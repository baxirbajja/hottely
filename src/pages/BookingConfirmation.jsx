import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'
import PrintIcon from '@mui/icons-material/Print'
import Logo from '../components/Logo'

const BookingConfirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { booking } = location.state || {}

  if (!booking) {
    return (
      <div className="min-h-screen bg-deep-brown/95 flex items-center justify-center">
        <div className="text-warm-beige text-center">
          <h2 className="text-2xl mb-4">Booking Not Found</h2>
          <button
            onClick={() => navigate('/rooms')}
            className="px-6 py-2 bg-warm-beige text-deep-brown hover:bg-accent-gold hover:text-warm-beige transition-colors duration-300 rounded"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  const handleEmailConfirmation = () => {
    // In a real app, this would trigger an API call to send the email
    window.location.href = `mailto:${booking.email}?subject=Hotel Booking Confirmation&body=Your booking has been confirmed! Booking ID: ${booking.bookingId}`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-deep-brown/95 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Logo className="justify-center" />
        </div>
        <div className="bg-warm-beige/10 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-warm-beige/20 px-6 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-warm-beige mb-2">Booking Confirmed!</h1>
              <p className="text-warm-beige/80">Booking ID: {booking.bookingId}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="px-6 py-8 space-y-6">
            {/* Room Details */}
            <div className="flex items-start space-x-4">
              <HomeIcon className="text-accent-gold text-xl mt-1" />
              <div>
                <h3 className="text-warm-beige font-semibold">{booking.roomName}</h3>
                <p className="text-warm-beige/60">
                  {format(new Date(booking.dates.startDate), 'MMM dd, yyyy')} - {format(new Date(booking.dates.endDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Guest Name */}
              <div className="flex items-center space-x-4">
                <PersonIcon className="text-accent-gold text-xl" />
                <div>
                  <p className="text-warm-beige/60">Guest Name</p>
                  <p className="text-warm-beige">{booking.name}</p>
                </div>
              </div>

              {/* Number of Guests */}
              <div className="flex items-center space-x-4">
                <PersonIcon className="text-accent-gold text-xl" />
                <div>
                  <p className="text-warm-beige/60">Number of Guests</p>
                  <p className="text-warm-beige">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <EmailIcon className="text-accent-gold text-xl" />
                <div>
                  <p className="text-warm-beige/60">Email</p>
                  <p className="text-warm-beige">{booking.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <PhoneIcon className="text-accent-gold text-xl" />
                <div>
                  <p className="text-warm-beige/60">Phone</p>
                  <p className="text-warm-beige">{booking.phone}</p>
                </div>
              </div>
            </div>

            {/* Dates and Price */}
            <div className="border-t border-warm-beige/10 pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <CalendarMonthIcon className="text-accent-gold text-xl" />
                <div>
                  <p className="text-warm-beige/60">Stay Duration</p>
                  <p className="text-warm-beige">
                    Check-in: {format(new Date(booking.dates.startDate), 'EEEE, MMMM dd, yyyy')}
                  </p>
                  <p className="text-warm-beige">
                    Check-out: {format(new Date(booking.dates.endDate), 'EEEE, MMMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <div className="bg-warm-beige/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-warm-beige">Total Amount</span>
                  <span className="text-2xl font-bold text-warm-beige">${booking.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {booking.specialRequests && (
              <div className="border-t border-warm-beige/10 pt-6">
                <h3 className="text-warm-beige font-semibold mb-2">Special Requests</h3>
                <p className="text-warm-beige/80">{booking.specialRequests}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-warm-beige/5 px-6 py-4 flex flex-wrap gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-warm-beige text-deep-brown hover:bg-accent-gold hover:text-warm-beige transition-colors duration-300 rounded"
            >
              <PrintIcon />
              <span>Print</span>
            </button>
            <button
              onClick={handleEmailConfirmation}
              className="flex items-center space-x-2 px-4 py-2 bg-warm-beige text-deep-brown hover:bg-accent-gold hover:text-warm-beige transition-colors duration-300 rounded"
            >
              <EmailIcon />
              <span>Email Confirmation</span>
            </button>
            <button
              onClick={() => navigate('/rooms')}
              className="flex items-center space-x-2 px-4 py-2 border border-warm-beige text-warm-beige hover:bg-warm-beige hover:text-deep-brown transition-colors duration-300 rounded"
            >
              <HomeIcon />
              <span>Back to Rooms</span>
            </button>
          </div>
        </div>

        {/* Print Styles */}
        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              .max-w-3xl * {
                visibility: visible;
              }
              .max-w-3xl {
                position: absolute;
                left: 0;
                top: 0;
              }
              button {
                display: none !important;
              }
            }
          `}
        </style>
      </div>
    </motion.div>
  )
}

export default BookingConfirmation
