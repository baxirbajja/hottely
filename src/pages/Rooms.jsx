import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

// Sample room data (to be replaced with API data)
const roomsData = [
  {
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
      '49" Smart TV'
    ],
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format'],
    type: 'deluxe'
  },
  {
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
      '55" Smart TV'
    ],
    images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format'],
    type: 'suite'
  },
  {
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
      '50" Smart TV'
    ],
    images: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&auto=format'],
    type: 'family'
  },
  {
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
      'Dining Room'
    ],
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format'],
    type: 'penthouse'
  }
]

const Rooms = () => {
  const navigate = useNavigate()
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    capacity: 'all',
    minPrice: 0,
    maxPrice: 1000,
    amenities: {
      pool: false,
      tv: false,
      wifi: false,
      breakfast: false
    }
  })

  const [sortBy, setSortBy] = useState('price-low')

  const filterRooms = () => {
    return roomsData.filter(room => {
      if (selectedFilters.type !== 'all' && room.type !== selectedFilters.type) return false
      if (selectedFilters.capacity !== 'all' && room.capacity < parseInt(selectedFilters.capacity)) return false
      if (room.price < selectedFilters.minPrice || room.price > selectedFilters.maxPrice) return false

      const selectedAmenities = Object.entries(selectedFilters.amenities)
        .filter(([_, isSelected]) => isSelected)
        .map(([amenity]) => amenity)

      if (selectedAmenities.length > 0) {
        const hasAllSelectedAmenities = selectedAmenities.every(amenity => {
          const amenityText = amenity.toLowerCase()
          return room.amenities.some(roomAmenity => {
            const roomAmenityLower = roomAmenity.toLowerCase()
            switch (amenityText) {
              case 'wifi':
                return roomAmenityLower.includes('wifi')
              case 'tv':
                return roomAmenityLower.includes('tv')
              case 'pool':
                return roomAmenityLower.includes('pool')
              case 'breakfast':
                return roomAmenityLower.includes('breakfast')
              default:
                return false
            }
          })
        })
        if (!hasAllSelectedAmenities) return false
      }

      return true
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'size-low':
          return a.size - b.size
        case 'size-high':
          return b.size - a.size
        default:
          return 0
      }
    })
  }

  const filteredRooms = filterRooms()

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-brown/95 via-deep-brown/90 to-deep-brown/95 relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjY1NyAwIDMgMS4zNDMgMyAzdjE4YzAgMS42NTctMS4zNDMgMy0zIDMtMS42NTcgMC0zLTEuMzQzLTMtM1YyMWMwLTEuNjU3IDEuMzQzLTMgMy0zeiIgZmlsbD0icmdiYSgyMzAsIDIxMywgMTg0LCAwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
      
      <div className="container mx-auto px-4 py-8 relative">
        <div className="mb-8">
          <Logo className="justify-center" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display text-warm-beige text-center mb-12"
        >
          Our Rooms & Suites
        </motion.h1>

        {/* Filters */}
        <div className="bg-gradient-to-br from-warm-beige/10 to-warm-beige/5 backdrop-blur-md p-6 rounded-lg mb-8 shadow-xl border border-warm-beige/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Room Type Filter */}
            <div>
              <label className="block text-warm-beige mb-2">Room Type</label>
              <select
                value={selectedFilters.type}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-warm-beige/20 text-warm-beige p-2 rounded"
              >
                <option value="all">All Types</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="family">Family</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>

            {/* Capacity Filter */}
            <div>
              <label className="block text-warm-beige mb-2">Guests</label>
              <select
                value={selectedFilters.capacity}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, capacity: e.target.value }))}
                className="w-full bg-warm-beige/20 text-warm-beige p-2 rounded"
              >
                <option value="all">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-warm-beige mb-2">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={selectedFilters.minPrice}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, minPrice: parseInt(e.target.value) || 0 }))}
                  placeholder="Min"
                  className="w-1/2 bg-warm-beige/20 text-warm-beige p-2 rounded"
                />
                <input
                  type="number"
                  value={selectedFilters.maxPrice}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) || 1000 }))}
                  placeholder="Max"
                  className="w-1/2 bg-warm-beige/20 text-warm-beige p-2 rounded"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-warm-beige mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-warm-beige/20 text-warm-beige p-2 rounded"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="size-low">Size: Small to Large</option>
                <option value="size-high">Size: Large to Small</option>
              </select>
            </div>

            {/* Others (Amenities) Filter */}
            <div>
              <label className="block text-warm-beige mb-2">Others</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-warm-beige/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.amenities.wifi}
                    onChange={(e) => setSelectedFilters(prev => ({
                      ...prev,
                      amenities: { ...prev.amenities, wifi: e.target.checked }
                    }))}
                    className="form-checkbox bg-warm-beige/20 text-accent-gold rounded"
                  />
                  <span>WiFi</span>
                </label>
                <label className="flex items-center gap-2 text-warm-beige/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.amenities.tv}
                    onChange={(e) => setSelectedFilters(prev => ({
                      ...prev,
                      amenities: { ...prev.amenities, tv: e.target.checked }
                    }))}
                    className="form-checkbox bg-warm-beige/20 text-accent-gold rounded"
                  />
                  <span>TV</span>
                </label>
                <label className="flex items-center gap-2 text-warm-beige/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.amenities.pool}
                    onChange={(e) => setSelectedFilters(prev => ({
                      ...prev,
                      amenities: { ...prev.amenities, pool: e.target.checked }
                    }))}
                    className="form-checkbox bg-warm-beige/20 text-accent-gold rounded"
                  />
                  <span>Pool</span>
                </label>
                <label className="flex items-center gap-2 text-warm-beige/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.amenities.breakfast}
                    onChange={(e) => setSelectedFilters(prev => ({
                      ...prev,
                      amenities: { ...prev.amenities, breakfast: e.target.checked }
                    }))}
                    className="form-checkbox bg-warm-beige/20 text-accent-gold rounded"
                  />
                  <span>Free Breakfast</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map(room => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-deep-brown/60 to-deep-brown/40 backdrop-blur-md rounded-lg overflow-hidden shadow-xl border border-warm-beige/10 hover:border-warm-beige/20 transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-deep-brown/90 to-deep-brown/80 backdrop-blur-sm text-warm-beige px-4 py-2 rounded-full shadow-lg">
                  ${room.price}/night
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl text-warm-beige mb-2 group-hover:text-accent-gold transition-colors duration-300">{room.name}</h3>
                <p className="text-warm-beige/80 mb-4 line-clamp-2">{room.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs bg-warm-beige/10 text-warm-beige/90 px-3 py-1 rounded-full backdrop-blur-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs bg-warm-beige/10 text-warm-beige/90 px-3 py-1 rounded-full backdrop-blur-sm">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-warm-beige/80">
                    <span>{room.size}m² • </span>
                    <span>Up to {room.capacity} guests</span>
                  </div>
                  <button
                    onClick={() => navigate(`/rooms/${room.id}`)}
                    className="px-4 py-2 bg-gradient-to-r from-accent-gold to-accent-gold/90 text-deep-brown hover:from-accent-gold/90 hover:to-accent-gold transition-all duration-300 rounded-full shadow-lg transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredRooms.length === 0 && (
          <div className="text-center text-warm-beige mt-8">
            <p>No rooms match your current filters. Try adjusting your criteria.</p>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-warm-beige/60 tracking-widest text-sm text-center">
            &copy; BACHIR BAJJA
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rooms
