import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const { loginHandler, isLoading, error } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (formError) setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all required fields.')
      return
    }

    const res = await loginHandler({
      email: formData.email,
      password: formData.password
    })

    console.log(res)

    if (res?.success) {
      navigate('/')
    }
  }

  const handleGoogleSignIn = () => {
    // Standard Google OAuth redirect or mock trigger
    window.location.href = '/api/auth/google'
  }

  return (
    <div className="min-h-screen w-full flex bg-[#FAF9F9] text-[#1B1C1C]">
      {/* LEFT COLUMN: High-Fashion Editorial Visual */}
      <div className="hidden md:flex md:w-1/2 lg:w-7/12 relative min-h-screen overflow-hidden bg-[#111111] select-none">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop"
          alt="Snitch Luxury Campaign"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85 transition-transform duration-1000 ease-out hover:scale-105"
        />
        {/* Subtle Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />

        {/* Top Campaign Bar */}
        <div className="absolute top-10 left-10 right-10 flex items-center justify-between z-10">
          <Link
            to="/"
            className="font-editorial text-2xl tracking-[0.25em] text-white font-light hover:opacity-80 transition-opacity"
          >
            SNITCH
          </Link>
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/70 font-medium px-3 py-1 border border-white/20 backdrop-blur-xs">
            Autumn / Winter Edition
          </span>
        </div>

        {/* Bottom Campaign Editorial Details */}
        <div className="absolute bottom-12 left-10 right-10 z-10 space-y-4">
          <div className="flex items-center space-x-3 text-white/60 text-xs tracking-widest uppercase font-medium">
            <span className="inline-block w-8 h-px bg-white/40"></span>
            <span>The Modern Silhouette</span>
          </div>
          <h2 className="font-editorial text-3xl lg:text-5xl text-white font-normal leading-tight tracking-tight max-w-lg">
            Redefining contemporary style with pure intent.
          </h2>
          <p className="text-white/75 text-sm max-w-md font-light leading-relaxed pt-2">
            Experience curated apparel crafted for those who value structure, distinction, and quiet sophistication.
          </p>

          <div className="pt-4 flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-white/50">
            <span>[ Bespoke Curation ]</span>
            <span>[ Limited Drops ]</span>
            <span>[ Effortless Fit ]</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Pristine & Spacious Login Form */}
      <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-between p-8 sm:p-12 lg:p-16 xl:p-20 min-h-screen bg-[#FFFFFF] overflow-y-auto">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between pb-8">
          <Link to="/" className="font-editorial text-2xl tracking-[0.2em] font-medium text-black">
            SNITCH
          </Link>
          <Link
            to="/register"
            className="text-xs uppercase tracking-widest text-[#5D5F5B] hover:text-black font-semibold"
          >
            Register
          </Link>
        </div>

        {/* Main Form Container with Ample Breathing Space */}
        <div className="w-full max-w-105 mx-auto my-auto py-8">
          {/* Header Title */}
          <div className="mb-10 text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7E7576] font-semibold block mb-2">
              Member Access
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#1B1C1C] tracking-tight leading-tight">
              Sign In
            </h1>
            <p className="text-[#5D5F5B] text-sm mt-3 font-normal leading-relaxed">
              Enter your credentials to access your bespoke wardrobe & orders.
            </p>
          </div>

          {/* Feedback Alerts */}
          {(formError || error) && (
            <div className="mb-6 p-4 bg-[#FDF2F2] border-l-2 border-[#BA1A1A] text-[#BA1A1A] text-xs font-medium tracking-wide flex items-center justify-between">
              <span>{formError || error}</span>
              <button
                type="button"
                onClick={() => setFormError('')}
                className="text-[#BA1A1A] hover:opacity-75 text-sm ml-2 font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="luxury-input-group">
              <input
                id="login-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className="luxury-input"
                autoComplete="email"
              />
              <label htmlFor="login-email" className="luxury-label">
                Email Address
              </label>
            </div>

            {/* Password Field */}
            <div className="luxury-input-group">
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                  className="luxury-input pr-10"
                  autoComplete="current-password"
                />
                <label htmlFor="login-password" className="luxury-label">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-[#7E7576] hover:text-black transition-colors focus:outline-hidden cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[19px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Options: Remember Me & Forgot Password */}
            <div className="flex justify-end pt-1">
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault()
                  alert('Password reset link will be sent to your email.')
                }}
                className="text-xs text-[#7E7576] hover:text-black uppercase tracking-wider transition-colors border-b border-transparent hover:border-black pb-0.5"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit CTA Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#000000] text-white py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#222222] active:bg-[#000000] transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating...</span>
                  </span>
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E8E6E3]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7E7576] font-semibold">
              Or
            </span>
            <div className="flex-1 h-px bg-[#E8E6E3]" />
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white border border-[#D5D3CF] text-[#1B1C1C] py-3.5 px-4 text-xs tracking-[0.12em] font-medium uppercase hover:border-black hover:bg-[#FAF9F9] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-[#1B1C1C] group-hover:text-black">
              Continue with Google
            </span>
          </button>

          {/* Switch to Register */}
          <p className="mt-8 text-center text-xs text-[#5D5F5B]">
            New to Snitch?{' '}
            <Link
              to="/register"
              className="text-black font-semibold uppercase tracking-wider hover:opacity-75 border-b border-black pb-0.5 ml-1 transition-opacity"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer / Copyright */}
        <div className="pt-6 border-t border-[#F0EFEB] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7E7576] tracking-wider uppercase gap-2">
          <span>© {new Date().getFullYear()} SNITCH COUTURE</span>
          <div className="flex items-center gap-4 text-[10px]">
            <a href="#privacy" className="hover:text-black transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-black transition-colors">Terms</a>
            <a href="#support" className="hover:text-black transition-colors">Concierge</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
