import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import LockIcon from '@mui/icons-material/Lock'
import SecurityIcon from '@mui/icons-material/Security'
import PaymentIcon from '@mui/icons-material/Payment'
import Logo from '../components/Logo'

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { booking } = location.state || {}
  const [paymentMethod, setPaymentMethod] = useState('card') // 'card' or 'paypal'
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  if (!booking) {
    return (
      <div className="min-h-screen bg-deep-brown/95 flex items-center justify-center">
        <div className="text-warm-beige text-center">
          <h2 className="text-2xl mb-4">Invalid Payment Session</h2>
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || ''
      if (formattedValue.length > 19) return
    }

    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').match(/^(\d{0,2})(\d{0,2})/)?.slice(1).filter(Boolean).join('/') || ''
      if (formattedValue.length > 5) return
    }

    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
  }

  const validatePayment = () => {
    const errors = []
    const cardNumberClean = paymentData.cardNumber.replace(/\s/g, '')
    
    if (cardNumberClean.length !== 16) {
      errors.push('Please enter a valid 16-digit card number')
    }
    if (!paymentData.cardName.trim()) {
      errors.push('Please enter the cardholder name')
    }
    if (!paymentData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      errors.push('Please enter a valid expiry date (MM/YY)')
    }
    if (!paymentData.cvv.match(/^\d{3,4}$/)) {
      errors.push('Please enter a valid CVV')
    }

    if (paymentData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      const [month, year] = paymentData.expiryDate.split('/')
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1)
      if (expiry < new Date()) {
        errors.push('Card has expired')
      }
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validatePayment()
    
    if (errors.length > 0) {
      setError(errors.join('. '))
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      handlePaymentSuccess()
    } catch (error) {
      setError('Payment processing failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = () => {
    navigate('/booking-confirmation', {
      state: {
        booking: {
          ...booking,
          paymentStatus: 'paid',
          paymentDate: new Date().toISOString(),
          paymentMethod,
          lastFourDigits: paymentMethod === 'card' ? paymentData.cardNumber.slice(-4) : null
        }
      }
    })
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
              <h1 className="text-3xl font-bold text-warm-beige mb-2">Payment Details</h1>
              <p className="text-warm-beige/80">Secure Payment Processing</p>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="px-6 py-4 bg-warm-beige/5">
            <h2 className="text-xl font-semibold text-warm-beige mb-4">Booking Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-warm-beige/80">Room</span>
                <span className="text-warm-beige">{booking.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-beige/80">Check-in</span>
                <span className="text-warm-beige">
                  {format(new Date(booking.dates.startDate), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-beige/80">Check-out</span>
                <span className="text-warm-beige">
                  {format(new Date(booking.dates.endDate), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-warm-beige/80">Total Amount</span>
                <span className="text-warm-beige">${booking.totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold text-warm-beige mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border transition-all duration-300 flex items-center justify-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'border-accent-gold bg-warm-beige/10 text-warm-beige'
                    : 'border-warm-beige/20 text-warm-beige/60 hover:border-warm-beige/40'
                }`}
              >
                <CreditCardIcon />
                <span>Credit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 rounded-lg border transition-all duration-300 flex items-center justify-center gap-2 ${
                  paymentMethod === 'paypal'
                    ? 'border-accent-gold bg-warm-beige/10 text-warm-beige'
                    : 'border-warm-beige/20 text-warm-beige/60 hover:border-warm-beige/40'
                }`}
              >
                <PaymentIcon />
                <span>PayPal</span>
              </button>
            </div>
          </div>

          {/* Payment Forms */}
          <div className="px-6 py-8 space-y-6">
            {paymentMethod === 'card' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="block text-warm-beige">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 pr-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                    />
                    <CreditCardIcon className="absolute left-3 top-2.5 text-warm-beige/60" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="cardName" className="block text-warm-beige">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiryDate" className="block text-warm-beige">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cvv" className="block text-warm-beige">CVV</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full pl-10 pr-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                      />
                      <SecurityIcon className="absolute left-3 top-2.5 text-warm-beige/60" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center text-warm-beige/60 gap-2">
                  <LockIcon />
                  <span>Secure Payment Processing</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 rounded font-semibold transition-all duration-300 ${
                    isProcessing
                      ? 'bg-warm-beige/50 cursor-not-allowed'
                      : 'bg-warm-beige text-deep-brown hover:bg-accent-gold hover:text-warm-beige'
                  }`}
                >
                  {isProcessing ? 'Processing Payment...' : `Pay $${booking.totalPrice}`}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <PayPalScriptProvider options={{ 
                  "client-id": "test", // Replace with your PayPal client ID in production
                  currency: "USD"
                }}>
                  <PayPalButtons
                    style={{
                      color: "gold",
                      shape: "rect",
                      label: "pay",
                      height: 50
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: booking.totalPrice.toString(),
                              currency_code: "USD"
                            },
                            description: `Booking for ${booking.roomName}`
                          }
                        ]
                      })
                    }}
                    onApprove={async (data, actions) => {
                      await actions.order.capture()
                      handlePaymentSuccess()
                    }}
                    onError={(err) => {
                      setError('PayPal payment failed. Please try again.')
                    }}
                  />
                </PayPalScriptProvider>
                <div className="text-center text-warm-beige/60 text-sm">
                  Pay securely using your PayPal account
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-400 bg-red-900/20 p-3 rounded">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Payment
