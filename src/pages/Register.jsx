import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import bgImage from '../img/bg.jpeg'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Add registration logic here
    console.log('Registration data:', formData)
  }

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

      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <h1 className="font-display text-3xl text-warm-beige tracking-widest">HOTELLY</h1>
      </div>

      {/* Registration Form */}
      <div className="relative z-10 h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 rounded-lg bg-deep-brown/40 backdrop-blur-md"
        >
          <h2 className="text-2xl font-display text-warm-beige mb-6 text-center">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-warm-beige text-sm mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-warm-beige text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-warm-beige text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                required
              />
            </div>

            <div>
              <label className="block text-warm-beige text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-beige/60 hover:text-warm-beige"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-warm-beige text-sm mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-warm-beige/10 border border-warm-beige/20 text-warm-beige focus:outline-none focus:border-accent-gold"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-beige/60 hover:text-warm-beige"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-warm-beige text-deep-brown hover:bg-accent-gold hover:text-warm-beige transition-colors duration-300 rounded"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center text-warm-beige/80">
            Already have an account?{" "}
            <button
              onClick={() => navigate('/login')}
              className="text-accent-gold hover:text-warm-beige transition-colors"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 text-warm-beige/60 tracking-widest text-sm">
        ©️ BACHIR BAJJA
      </div>
    </div>
  )
}

export default Register
