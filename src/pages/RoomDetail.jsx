import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Sample room data (to be replaced with API data)
const roomsData = {
  1: {
    id: 1,
    name: 'Deluxe King Room',
    description: 'Experience luxury and comfort in our spacious Deluxe King Room. Featuring a plush king-size bed, elegant furnishings, and stunning city views, this room offers the perfect blend of sophistication and modern amenities.',
    price: 299,
    size: 35, // in m²
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
    ]
  }
  // Add more rooms as needed
}

const RoomDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  })

  const room = roomsData[id]

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

  const handleBookingChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBooking = (e) => {
    e.preventDefault()
    // TODO: Implement booking logic
    console.log('Booking data:', bookingData)
  }

  return (
    <div className="min-h-screen bg-deep-brown/95">
      {/* Image Gallery */}
      <div className="relative h-[60vh]">
        <motion.img
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={room.images[selectedImage]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-2 bg-gradient-to-t from-deep-brown/80 to-transparent">
          {room.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedImage === index ? 'border-accent-gold' : 'border-transparent'
              }`}
            >
              <img src={image} alt={`Room view ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Room Information */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-display text-warm-beige mb-4"
              >
                {room.name}
              </motion.h1>
              <p className="text-warm-beige/80 leading-relaxed">{room.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-2xl text-warm-beige mb-4">Highlights</h2>
              <div className="grid grid-cols-2 gap-4">
                {room.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-warm-beige/80"
                  >
                    <span className="mr-2">•</span>
                    {highlight}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl text-warm-beige mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-warm-beige/80"
                  >
                    <span className="mr-2">•</span>
                    {amenity}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-2xl text-warm-beige mb-4">Policies</h2>
              <div className="space-y-2">
                {room.policies.map((policy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-warm-beige/80"
                  >
                    {policy}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-deep-brown/50 backdrop-blur-md rounded-lg p-6 sticky top-8"
            >
              <h2 className="text-2xl text-warm-beige mb-6">Book This Room</h2>
              <div className="text-2xl text-warm-beige mb-6">
                ${room.price}<span className="text-lg text-warm-beige/60">/night</span>
              </div>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-warm-beige/80 text-sm mb-2">Check-in Date</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleBookingChange}
                    className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-warm-beige/80 text-sm mb-2">Check-out Date</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleBookingChange}
                    className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-warm-beige/80 text-sm mb-2">Number of Guests</label>
                  <select
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleBookingChange}
                    className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                  >
                    {[...Array(room.capacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-warm-beige/80 text-sm mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleBookingChange}
                    rows="4"
                    className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                    placeholder="Any special requests?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-warm-beige text-deep-brown hover:bg-accent-gold hover:text-warm-beige transition-colors duration-300 rounded"
                >
                  Book Now
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-warm-beige/60 tracking-widest text-sm text-center">
          ©️ BACHIR BAJJA
        </div>
      </div>
    </div>
  )
}

export default RoomDetail
