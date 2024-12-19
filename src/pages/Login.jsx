import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import bgImage from '../img/bg.jpeg'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login submitted:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
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
        <div className="absolute inset-0 bg-deep-brown/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <button 
          onClick={() => navigate('/')}
          className="font-display text-2xl text-warm-beige tracking-widest hover:text-accent-gold transition-colors"
        >
          HOTELLY
        </button>
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-8 py-12 mx-4"
      >
        <div className="bg-warm-beige/10 backdrop-blur-lg rounded-lg p-8 border border-warm-beige/20">
          <h2 className="font-display text-3xl text-warm-beige mb-8 text-center">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-warm-beige/90 text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-warm-beige/10 border border-warm-beige/20 rounded-md text-warm-beige placeholder-warm-beige/50 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-warm-beige/90 text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-warm-beige/10 border border-warm-beige/20 rounded-md text-warm-beige placeholder-warm-beige/50 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-beige/70 hover:text-warm-beige"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-warm-beige/90">
                <input type="checkbox" className="mr-2 rounded border-warm-beige/20 bg-warm-beige/10 text-accent-gold focus:ring-accent-gold" />
                Remember me
              </label>
              <button
                type="button"
                className="text-warm-beige/90 hover:text-accent-gold transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-warm-beige text-deep-brown font-medium rounded-md hover:bg-accent-gold hover:text-warm-beige transition-colors duration-300"
            >
              Sign In
            </button>

            <div className="text-center text-warm-beige/90">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-accent-gold hover:text-warm-beige transition-colors"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 text-warm-beige/60 tracking-widest text-sm">
      ©️BACHIR BAJJA
      </div>
     
    </div>
  )
}

export default Login
