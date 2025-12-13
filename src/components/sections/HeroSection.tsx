import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Shield, Users, Star } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight"
          >
            Your Journey to{' '}
            <span className="gradient-text">Mental Wellness</span>
            <br />
            Starts Here
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with licensed therapists across Nigeria for anonymous, secure, and flexible therapy sessions. 
            Your mental health matters, and we're here to support you every step of the way.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              to="/register"
              className="btn-primary btn-lg group flex items-center space-x-2 shadow-glow hover:shadow-glow-secondary transition-all duration-300"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="btn-outline btn-lg group flex items-center space-x-2">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-600"
          >
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-success-600" />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary-600" />
              <span>Licensed Therapists</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-warning-600" />
              <span>4.9/5 Rating</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '10,000+', label: 'Sessions Completed' },
            { number: '500+', label: 'Licensed Therapists' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-10 hidden lg:block"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-neutral-900">Active Users</div>
              <div className="text-xs text-neutral-600">5,000+ online</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute top-20 right-10 hidden lg:block"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-success-500 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-neutral-900">Top Rated</div>
              <div className="text-xs text-neutral-600">4.9/5 stars</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
