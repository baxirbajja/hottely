import { Component } from 'react'
import { motion } from 'framer-motion'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-deep-brown/95 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-deep-brown/50 backdrop-blur-md rounded-lg p-8 max-w-lg w-full"
          >
            <div className="text-center">
              <h2 className="text-2xl text-warm-beige mb-4">Oops! Something went wrong</h2>
              <p className="text-warm-beige/80 mb-6">
                {this.props.fallback || "We're sorry, but something went wrong. Please try again later."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-warm-beige text-deep-brown hover:bg-accent-gold hover:text-warm-beige transition-colors duration-300 rounded"
              >
                Refresh Page
              </button>
              {this.props.showHome && (
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-2 ml-4 border border-warm-beige text-warm-beige hover:bg-warm-beige/10 transition-colors duration-300 rounded"
                >
                  Go to Home
                </button>
              )}
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-deep-brown/30 rounded-lg overflow-auto">
                <details className="text-warm-beige/60 text-sm">
                  <summary className="cursor-pointer hover:text-warm-beige">View Error Details</summary>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              </div>
            )}
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
