import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Sample room data (to be replaced with API data)
const roomsData = [
  {
    id: 1,
    name: 'Deluxe King Room',
    description: 'Spacious room with king-size bed and city view',
    price: 299,
    size: 35, // in m²
    capacity: 2,
    amenities: ['King Bed', 'City View', 'Free Wi-Fi', 'Mini Bar', 'Room Service'],
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&auto=format'],
    type: 'deluxe'
  },
  {
    id: 2,
    name: 'Superior Twin Room',
    description: 'Comfortable room with twin beds and garden view',
    price: 249,
    size: 30,
    capacity: 2,
    amenities: ['Twin Beds', 'Garden View', 'Free Wi-Fi', 'Room Service'],
    images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=500&auto=format'],
    type: 'superior'
  },
  {
    id: 3,
    name: 'Executive Suite',
    description: 'Luxurious suite with separate living area and panoramic view',
    price: 499,
    size: 55,
    capacity: 3,
    amenities: ['King Bed', 'Panoramic View', 'Living Area', 'Free Wi-Fi', 'Mini Bar', 'Room Service', 'Bathtub'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format'],
    type: 'suite'
  },
  {
    id: 4,
    name: 'Family Room',
    description: 'Perfect for families with connecting rooms',
    price: 399,
    size: 45,
    capacity: 4,
    amenities: ['King Bed', 'Twin Beds', 'City View', 'Free Wi-Fi', 'Mini Bar', 'Room Service'],
    images: ['https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=500&auto=format'],
    type: 'family'
  }
]

const Rooms = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    type: 'all',
    minPrice: 0,
    maxPrice: 1000,
    capacity: 'all',
    amenities: {
      pool: false,
      wifi: false,
      tv: false,
      breakfast: false,
      parking: false,
      airConditioning: false,
      minibar: false,
      roomService: false
    }
  })

  const filteredRooms = roomsData.filter(room => {
    if (filters.type !== 'all' && room.type !== filters.type) return false
    if (room.price < filters.minPrice || room.price > filters.maxPrice) return false
    if (filters.capacity !== 'all' && room.capacity < parseInt(filters.capacity)) return false
    
    // Check amenities filters
    const selectedAmenities = Object.entries(filters.amenities)
      .filter(([_, isSelected]) => isSelected)
      .map(([amenity]) => amenity)

    if (selectedAmenities.length > 0) {
      const hasAllSelectedAmenities = selectedAmenities.every(amenity => 
        room.amenities.some(roomAmenity => 
          roomAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      )
      if (!hasAllSelectedAmenities) return false
    }

    return true
  })

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.startsWith('amenity-')) {
      const amenityName = name.replace('amenity-', '')
      setFilters(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [amenityName]: checked
        }
      }))
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="min-h-screen bg-deep-brown/95">
      {/* Header */}
      <header className="relative h-[40vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-deep-brown/50 backdrop-blur-[1px]" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display text-warm-beige mb-4"
          >
            Our Rooms
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-warm-beige/90 max-w-2xl mx-4"
          >
            Experience luxury and comfort in our carefully designed rooms
          </motion.p>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-deep-brown/50 backdrop-blur-md rounded-lg p-6 mb-8">
          <h2 className="text-warm-beige text-xl mb-4">Filter Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-warm-beige/80 text-sm mb-2">Room Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
              >
                <option value="all">All Types</option>
                <option value="deluxe">Deluxe</option>
                <option value="superior">Superior</option>
                <option value="suite">Suite</option>
                <option value="family">Family</option>
              </select>
            </div>

            <div>
              <label className="block text-warm-beige/80 text-sm mb-2">Price Range</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    name="minPrice"
                    min="0"
                    max="1000"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="flex-1"
                  />
                  <span className="text-warm-beige/80 w-20">${filters.minPrice}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    name="maxPrice"
                    min="0"
                    max="1000"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="flex-1"
                  />
                  <span className="text-warm-beige/80 w-20">${filters.maxPrice}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-warm-beige/80 text-sm mb-2">Capacity</label>
              <select
                name="capacity"
                value={filters.capacity}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
              >
                <option value="all">Any</option>
                <option value="1">1+ Person</option>
                <option value="2">2+ People</option>
                <option value="3">3+ People</option>
                <option value="4">4+ People</option>
              </select>
            </div>

            <div>
              <label className="block text-warm-beige/80 text-sm mb-2">Other Options</label>
              <div className="grid grid-cols-2 gap-2 text-warm-beige/80">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="amenity-wifi"
                    checked={filters.amenities.wifi}
                    onChange={handleFilterChange}
                    className="rounded border-warm-beige/20 bg-warm-beige/10 text-accent-gold focus:ring-accent-gold"
                  />
                  <span>WiFi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="amenity-tv"
                    checked={filters.amenities.tv}
                    onChange={handleFilterChange}
                    className="rounded border-warm-beige/20 bg-warm-beige/10 text-accent-gold focus:ring-accent-gold"
                  />
                  <span>TV</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="amenity-breakfast"
                    checked={filters.amenities.breakfast}
                    onChange={handleFilterChange}
                    className="rounded border-warm-beige/20 bg-warm-beige/10 text-accent-gold focus:ring-accent-gold"
                  />
                  <span>Breakfast</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="amenity-pool"
                    checked={filters.amenities.pool}
                    onChange={handleFilterChange}
                    className="rounded border-warm-beige/20 bg-warm-beige/10 text-accent-gold focus:ring-accent-gold"
                  />
                  <span>Pool</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="amenity-parking"
                    checked={filters.amenities.parking}
                    onChange={handleFilterChange}
                    className="rounded border-warm-beige/20 bg-warm-beige/10 text-accent-gold focus:ring-accent-gold"
                  />
                  <span>Parking</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="amenity-airConditioning"
                    checked={filters.amenities.airConditioning}
                    onChange={handleFilterChange}
                    className="rounded border-warm-beige/20 bg-warm-beige/10 text-accent-gold focus:ring-accent-gold"
                  />
                  <span>AC</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="amenity-minibar"
                    checked={filters.amenities.minibar}
                    onChange={handleFilterChange}
                    className="rounded border-warm-beige/20 bg-warm-beige/10 text-accent-gold focus:ring-accent-gold"
                  />
                  <span>Mini Bar</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="amenity-roomService"
                    checked={filters.amenities.roomService}
                    onChange={handleFilterChange}
                    className="rounded border-warm-beige/20 bg-warm-beige/10 text-accent-gold focus:ring-accent-gold"
                  />
                  <span>Room Service</span>
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
              className="bg-deep-brown/50 backdrop-blur-md rounded-lg overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-deep-brown/90 text-warm-beige px-4 py-2 rounded">
                  ${room.price}/night
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl text-warm-beige mb-2">{room.name}</h3>
                <p className="text-warm-beige/80 mb-4">{room.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs bg-warm-beige/10 text-warm-beige/90 px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs bg-warm-beige/10 text-warm-beige/90 px-2 py-1 rounded">
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
                    className="px-4 py-2 bg-warm-beige text-deep-brown hover:bg-accent-gold hover:text-warm-beige transition-colors duration-300 rounded"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-warm-beige/60 tracking-widest text-sm text-center">
          &copy; BACHIR BAJJA
        </div>
      </div>
    </div>
  )
}

export default Rooms
