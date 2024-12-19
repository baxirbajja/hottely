import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import bgImage from '../img/bg.jpeg'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-deep-brown/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 p-8 z-20">
        <ul className="space-y-4 text-warm-beige">
          <li><a href="/" className="hover:text-accent-gold transition-colors">Home</a></li>
          <li><a href="/rooms" className="hover:text-accent-gold transition-colors">Rooms</a></li>
          <li><a href="/dining" className="hover:text-accent-gold transition-colors">Dining</a></li>
          <li><a href="/events" className="hover:text-accent-gold transition-colors">Events</a></li>
          <li><a href="/about" className="hover:text-accent-gold transition-colors">About</a></li>
        </ul>
      </nav>

      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <h1 className="font-display text-3xl text-warm-beige tracking-widest">HOTELLY</h1>
      </div>

      {/* Top Right Buttons */}
      <div className="absolute top-8 right-8 z-20 flex items-center space-x-4">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/login')}
          className="border border-warm-beige text-warm-beige px-6 py-2 hover:bg-warm-beige hover:text-deep-brown transition-all duration-300"
        >
          Sign In
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/booking')}
          className="bg-warm-beige text-deep-brown px-6 py-2 hover:bg-accent-gold hover:text-warm-beige transition-all duration-300"
        >
          Book Now
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl md:text-8xl text-warm-beige mb-8"
          >
            A NEW HOTEL IN
            <br />
            COPENHAGEN
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-warm-beige/90 max-w-2xl mx-auto mb-12"
          >
            Experience the perfect blend of modern comfort and timeless elegance in the heart of the city.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              onClick={() => navigate('/rooms')}
              className="px-8 py-3 bg-warm-beige text-deep-brown hover:bg-accent-gold hover:text-warm-beige transition-colors duration-300"
            >
              View Rooms
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-8 py-3 border border-warm-beige text-warm-beige hover:bg-warm-beige hover:text-deep-brown transition-colors duration-300"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 text-warm-beige/60 tracking-widest text-sm">
      ©️ BACHIR BAJJA
      </div>
    
    </div>
  )
}

export default Home
