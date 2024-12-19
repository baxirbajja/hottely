import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Logo = ({ className = '' }) => {
  return (
    <Link to="/">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center ${className}`}
      >
        <div className="text-3xl font-display text-warm-beige flex items-center gap-2">
          <span className="text-accent-gold">H</span>otelly
          <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
        </div>
      </motion.div>
    </Link>
  )
}

export default Logo
