import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AvailabilityCalendar from '../components/AvailabilityCalendar'
import { format } from 'date-fns'
import Logo from '../components/Logo'

// Sample room data (to be replaced with API data)
const roomsData = {
  1: {
    id: 1,
    name: 'Deluxe King Room',
    description: 'Experience luxury and comfort in our spacious Deluxe King Room. Featuring a plush king-size bed, elegant furnishings, and stunning city views, this room offers the perfect blend of sophistication and modern amenities.',
    price: 299,
    size: 35,
    capacity: 2,
    amenities: [
      'King-Size Bed',
      'City View',
      'Free High-Speed Wi-Fi',
      'Mini Bar',
      '24/7 Room Service',
      '49" Smart TV',
      'Rain Shower',
      'Premium Toiletries',
      'In-Room Safe',
      'Coffee Machine',
      'Air Conditioning',
      'Work Desk'
    ],
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format',
      'https://images.unsplash.com/photo-1614649024145-7f847b1c803f?w=800&auto=format',
      'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&auto=format'
    ],
    type: 'deluxe',
    bedType: 'King',
    view: 'City View',
    smoking: false,
    highlights: [
      'Spacious 35m² Room',
      'Premium Bedding',
      'Complimentary Breakfast',
      'Evening Turndown Service'
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 12:00 PM',
      'Non-smoking room',
      'No pets allowed',
      'Extra bed: $50 per night'
    ],
    bookedDates: [
      { start: '2024-12-24', end: '2024-12-26' },
      { start: '2024-12-31', end: '2025-01-02' },
      { start: '2025-01-15', end: '2025-01-18' }
    ]
  },
  2: {
    id: 2,
    name: 'Ocean View Suite',
    description: 'Indulge in luxury with our Ocean View Suite. Wake up to breathtaking ocean views, enjoy the separate living area, and unwind in the spa-like bathroom. Perfect for those seeking an elevated hotel experience.',
    price: 499,
    size: 55,
    capacity: 3,
    amenities: [
      'King-Size Bed',
      'Ocean View',
      'Separate Living Area',
      'Premium Mini Bar',
      '24/7 Butler Service',
      '55" Smart TV',
      'Deep Soaking Tub',
      'Walk-in Rain Shower',
      'Luxury Toiletries',
      'Nespresso Machine',
      'Private Balcony',
      'Executive Work Space'
    ],
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format',
      'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=800&auto=format'
    ],
    type: 'suite',
    bedType: 'King',
    view: 'Ocean View',
    smoking: false,
    highlights: [
      'Panoramic Ocean Views',
      'Separate Living Area',
      'Premium Bedding',
      'Complimentary Breakfast'
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 12:00 PM',
      'Non-smoking room',
      'No pets allowed',
      'Extra bed: $50 per night'
    ],
    bookedDates: [
      { start: '2024-12-23', end: '2024-12-27' },
      { start: '2024-12-30', end: '2025-01-03' },
      { start: '2025-01-20', end: '2025-01-25' }
    ]
  },
  3: {
    id: 3,
    name: 'Family Garden Room',
    description: 'Perfect for families, our Garden Room offers direct access to the hotel\'s lush gardens. With two queen beds and a spacious layout, it provides comfort and convenience for your family getaway.',
    price: 399,
    size: 45,
    capacity: 4,
    amenities: [
      'Two Queen Beds',
      'Garden Access',
      'Family Bath Amenities',
      'Mini Fridge',
      'Room Service',
      '50" Smart TV',
      'Premium Toiletries',
      'In-Room Safe',
      'Coffee & Tea Facilities',
      'Air Conditioning',
      'Kids Welcome Pack'
    ],
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&auto=format',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format'
    ],
    type: 'family',
    bedType: 'Queen',
    view: 'Garden View',
    smoking: false,
    highlights: [
      'Direct Garden Access',
      'Spacious Layout',
      'Family-Friendly Amenities',
      'Complimentary Breakfast'
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 12:00 PM',
      'Non-smoking room',
      'No pets allowed',
      'Extra bed: $50 per night'
    ],
    bookedDates: [
      { start: '2024-12-20', end: '2024-12-28' },
      { start: '2024-12-31', end: '2025-01-04' },
      { start: '2025-01-10', end: '2025-01-15' }
    ]
  },
  4: {
    id: 4,
    name: 'Penthouse Suite',
    description: 'Our crown jewel, the Penthouse Suite offers unparalleled luxury with panoramic views, a private terrace, and exclusive amenities. Experience the epitome of sophisticated living.',
    price: 999,
    size: 120,
    capacity: 4,
    amenities: [
      'Master Bedroom with King Bed',
      'Second Bedroom with Queen Bed',
      'Panoramic Views',
      'Private Terrace',
      'Full Kitchen',
      'Dining Room',
      'Living Room',
      'Premium Mini Bar',
      '24/7 Butler Service',
      '65" Smart TVs',
      'Jacuzzi Tub',
      'Steam Shower',
      'Wine Cellar',
      'Private Gym Access'
    ],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&auto=format',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800&auto=format',
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&auto=format'
    ],
    type: 'penthouse',
    bedType: 'King',
    view: 'Panoramic View',
    smoking: false,
    highlights: [
      'Panoramic Views',
      'Private Terrace',
      'Exclusive Amenities',
      'Complimentary Breakfast'
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 12:00 PM',
      'Non-smoking room',
      'No pets allowed',
      'Extra bed: $50 per night'
    ],
    bookedDates: [
      { start: '2024-12-22', end: '2024-12-28' },
      { start: '2024-12-30', end: '2025-01-05' },
      { start: '2025-01-15', end: '2025-01-20' }
    ]
  }
}

const RoomDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookingData, setBookingData] = useState({
    dates: null,
    guests: 1,
    specialRequests: '',
    name: '',
    email: '',
    phone: ''
  })

  const [bookingStatus, setBookingStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null
  })

  // Convert id from string to number since URL parameters are strings
  const roomId = parseInt(id)
  const room = roomsData[roomId]

  if (!room) {
    return (
      <div className="min-h-screen bg-deep-brown/95 flex items-center justify-center">
        <div className="text-warm-beige text-center">
          <h2 className="text-2xl mb-4">Room Not Found</h2>
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

  const handleDateChange = (dateRange) => {
    setBookingData(prev => ({
      ...prev,
      dates: dateRange
    }))
  }

  const handleBookingChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateBooking = () => {
    const errors = []
    if (!bookingData.dates) {
      errors.push('Please select check-in and check-out dates')
    }
    if (!bookingData.name.trim()) {
      errors.push('Please enter your name')
    }
    if (!bookingData.email.trim()) {
      errors.push('Please enter your email')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      errors.push('Please enter a valid email address')
    }
    if (!bookingData.phone.trim()) {
      errors.push('Please enter your phone number')
    }
    if (bookingData.guests < 1 || bookingData.guests > room.capacity) {
      errors.push(`Number of guests must be between 1 and ${room.capacity}`)
    }
    return errors
  }

  const calculateTotalPrice = () => {
    if (!bookingData.dates) return 0
    const startDate = new Date(bookingData.dates.startDate)
    const endDate = new Date(bookingData.dates.endDate)
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    return room.price * nights
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const errors = validateBooking()
    if (errors.length > 0) {
      setBookingStatus({
        isSubmitting: false,
        isSuccess: false,
        error: errors.join('. ')
      })
      return
    }

    setBookingStatus({
      isSubmitting: true,
      isSuccess: false,
      error: null
    })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Generate a unique booking ID
      const bookingId = `BK${Date.now()}`

      // Navigate to payment page with booking details
      navigate('/payment', {
        state: {
          booking: {
            bookingId,
            roomId: room.id,
            roomName: room.name,
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            guests: parseInt(bookingData.guests),
            dates: bookingData.dates,
            totalPrice: calculateTotalPrice(),
            specialRequests: bookingData.specialRequests
          }
        }
      })
    } catch (error) {
      setBookingStatus({
        isSubmitting: false,
        isSuccess: false,
        error: 'Failed to process booking. Please try again.'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-brown/95 via-deep-brown/90 to-deep-brown/95 relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjY1NyAwIDMgMS4zNDMgMyAzdjE4YzAgMS42NTctMS4zNDMgMy0zIDMtMS42NTcgMC0zLTEuMzQzLTMtM1YyMWMwLTEuNjU3IDEuMzQzLTMgMy0zeiIgZmlsbD0icmdiYSgyMzAsIDIxMywgMTg0LCAwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
      
      <div className="container mx-auto px-4 py-8 relative">
        <div className="mb-8">
          <Logo className="justify-center" />
        </div>

        {/* Room Details Section */}
        <div className="bg-gradient-to-br from-deep-brown/60 to-deep-brown/40 backdrop-blur-md rounded-lg shadow-xl border border-warm-beige/10 overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-[60vh] overflow-hidden">
            <img
              src={room.images[selectedImage]}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-deep-brown/90 to-transparent">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {room.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-accent-gold scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${room.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Room Information */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Room Details */}
              <div className="flex-1">
                <h1 className="text-4xl font-display text-warm-beige mb-4">{room.name}</h1>
                <p className="text-warm-beige/80 mb-6 text-lg">{room.description}</p>

                {/* Room Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-warm-beige/10 to-warm-beige/5 backdrop-blur-sm p-4 rounded-lg">
                    <span className="text-warm-beige/60">Size</span>
                    <p className="text-warm-beige text-lg">{room.size}m²</p>
                  </div>
                  <div className="bg-gradient-to-br from-warm-beige/10 to-warm-beige/5 backdrop-blur-sm p-4 rounded-lg">
                    <span className="text-warm-beige/60">Capacity</span>
                    <p className="text-warm-beige text-lg">Up to {room.capacity} guests</p>
                  </div>
                  <div className="bg-gradient-to-br from-warm-beige/10 to-warm-beige/5 backdrop-blur-sm p-4 rounded-lg">
                    <span className="text-warm-beige/60">Price</span>
                    <p className="text-warm-beige text-lg">${room.price}/night</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h2 className="text-2xl text-warm-beige mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-warm-beige/80"
                      >
                        <span className="w-2 h-2 bg-accent-gold rounded-full"></span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Policies */}
                {room.policies && (
                  <div className="mb-8">
                    <h2 className="text-2xl text-warm-beige mb-4">Policies</h2>
                    <div className="space-y-2">
                      {room.policies.map((policy, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-warm-beige/80"
                        >
                          <span className="w-2 h-2 bg-accent-gold rounded-full"></span>
                          {policy}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Booking Form */}
              <div className="lg:w-1/3">
                <div className="bg-gradient-to-br from-warm-beige/10 to-warm-beige/5 backdrop-blur-md p-6 rounded-lg shadow-lg border border-warm-beige/10">
                  <h2 className="text-2xl text-warm-beige mb-6">Book Your Stay</h2>
                  
                  {/* Calendar */}
                  <div className="mb-6">
                    <AvailabilityCalendar
                      onDateChange={handleDateChange}
                      bookedDates={room.bookedDates}
                      minDays={1}
                      maxDays={30}
                    />
                  </div>

                  {/* Guest Information Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-warm-beige mb-2">Number of Guests</label>
                      <select
                        value={bookingData.guests}
                        onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                        className="w-full bg-warm-beige/20 text-warm-beige p-2 rounded"
                      >
                        {[...Array(room.capacity)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-warm-beige mb-2">Full Name</label>
                      <input
                        type="text"
                        value={bookingData.name}
                        onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-warm-beige/20 text-warm-beige p-2 rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-warm-beige mb-2">Email</label>
                      <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-warm-beige/20 text-warm-beige p-2 rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-warm-beige mb-2">Phone</label>
                      <input
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-warm-beige/20 text-warm-beige p-2 rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-warm-beige mb-2">Special Requests</label>
                      <textarea
                        value={bookingData.specialRequests}
                        onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                        className="w-full bg-warm-beige/20 text-warm-beige p-2 rounded h-24 resize-none"
                        placeholder="Any special requests?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={bookingStatus.isSubmitting || !bookingData.dates}
                      className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-accent-gold to-accent-gold/90 text-deep-brown font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 ${
                        (bookingStatus.isSubmitting || !bookingData.dates) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {bookingStatus.isSubmitting ? 'Processing...' : 'Book Now'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetail
