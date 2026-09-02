import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const { registerHandler, isLoading, error } = useAuth()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    password: '',
    role: 'buyer' // 'buyer' or 'seller'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    if (formError) setFormError('')
  }

  const handleRoleSelect = (selectedRole) => {
    setFormData((prev) => ({
      ...prev,
      role: selectedRole
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.contact || !formData.password) {
      setFormError('Please fill in all required fields.')
      return
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long.')
      return
    }

    const res = await registerHandler({
      fullName: formData.fullName,
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
      role: formData.role
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
    <div className="h-screen w-full flex bg-[#FAF9F9] text-[#1B1C1C] overflow-hidden">
      {/* LEFT COLUMN: High-Fashion Editorial Visual */}
      <div className="hidden md:flex md:w-1/2 lg:w-7/12 relative h-screen overflow-hidden bg-[#111111] select-none">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
          alt="Snitch Luxury Editorial"
          className="absolute inset-0 w-full h-full object-contain opacity-85 transition-transform duration-1000 ease-out hover:scale-105"
        />
        {/* Subtle Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/40" />
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
            Haute Couture & Atelier
          </span>
        </div>

        {/* Bottom Campaign Editorial Details */}
        <div className="absolute bottom-12 left-10 right-10 z-10 space-y-4">
          <div className="flex items-center space-x-3 text-white/60 text-xs tracking-widest uppercase font-medium">
            <span className="inline-block w-8 h-px bg-white/40"></span>
            <span>Join The Collective</span>
          </div>
          <h2 className="font-editorial text-3xl lg:text-5xl text-white font-normal leading-tight tracking-tight max-w-lg">
            Where craftsmanship meets contemporary vision.
          </h2>
          <p className="text-white/75 text-sm max-w-md font-light leading-relaxed pt-2">
            Create an account to discover exclusive drops, bespoke tailoring, and private runway presentations.
          </p>

          <div className="pt-4 flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-white/50">
            <span>[ Signature Series ]</span>
            <span>[ Worldwide Shipping ]</span>
            <span>[ Buyer & Merchant Portal ]</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Pristine & Spacious Register Form */}
      <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-between p-8 sm:p-12 lg:p-14 xl:p-16 bg-[#FFFFFF] h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between pb-6">
          <Link to="/" className="font-editorial text-2xl tracking-[0.2em] font-medium text-black">
            SNITCH
          </Link>
          <Link
            to="/login"
            className="text-xs uppercase tracking-widest text-[#5D5F5B] hover:text-black font-semibold"
          >
            Sign In
          </Link>
        </div>

        {/* Main Form Container with Ample Breathing Space */}
        <div className="w-full max-w-110 mx-auto py-3 flex-1 flex flex-col justify-center">
          {/* Header Title */}
          <div className="mb-8 text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7E7576] font-semibold block mb-2">
              New Account Registration
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#1B1C1C] tracking-tight leading-tight">
              Create Account
            </h1>
            <p className="text-[#5D5F5B] text-sm mt-2.5 font-normal leading-relaxed">
              Join our community to shop curated collections or launch your storefront.
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

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="luxury-input-group">
              <input
                id="reg-fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder=" "
                className="luxury-input"
                autoComplete="name"
              />
              <label htmlFor="reg-fullName" className="luxury-label">
                Full Name
              </label>
            </div>

            {/* Email Address */}
            <div className="luxury-input-group">
              <input
                id="reg-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className="luxury-input"
                autoComplete="email"
              />
              <label htmlFor="reg-email" className="luxury-label">
                Email Address
              </label>
            </div>

            {/* Contact Number */}
            <div className="luxury-input-group">
              <input
                id="reg-contact"
                name="contact"
                type="tel"
                required
                value={formData.contact}
                onChange={handleChange}
                placeholder=" "
                className="luxury-input"
                autoComplete="tel"
              />
              <label htmlFor="reg-contact" className="luxury-label">
                Contact Number
              </label>
            </div>

            {/* Password */}
            <div className="luxury-input-group">
              <div className="relative">
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                  className="luxury-input pr-10"
                  autoComplete="new-password"
                />
                <label htmlFor="reg-password" className="luxury-label">
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

            {/* Role Selection (Buyer / Seller) */}
            <div className="pt-3">
              <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#5D5F5B] mb-3">
                I am joining as a
              </label>
              <div className="grid grid-cols-2 gap-3.5">
                {/* Buyer Radio Card */}
                <div
                  onClick={() => handleRoleSelect('buyer')}
                  className={`relative p-3.5 border cursor-pointer transition-all duration-200 flex items-start gap-3 select-none ${
                    formData.role === 'buyer'
                      ? 'border-black bg-[#FAF9F9] shadow-xs'
                      : 'border-[#E2E0DC] bg-white hover:border-[#999999]'
                  }`}
                >
                  <div className="mt-0.5 relative flex items-center justify-center w-4 h-4 rounded-full border border-black/40">
                    <input
                      type="radio"
                      name="role"
                      value="buyer"
                      checked={formData.role === 'buyer'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {formData.role === 'buyer' && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#1B1C1C] tracking-wide">
                      Buyer
                    </span>
                    <span className="block text-[11px] text-[#7E7576] mt-0.5 leading-tight">
                      Personal Wardrobe
                    </span>
                  </div>
                </div>

                {/* Seller Radio Card */}
                <div
                  onClick={() => handleRoleSelect('seller')}
                  className={`relative p-3.5 border cursor-pointer transition-all duration-200 flex items-start gap-3 select-none ${
                    formData.role === 'seller'
                      ? 'border-black bg-[#FAF9F9] shadow-xs'
                      : 'border-[#E2E0DC] bg-white hover:border-[#999999]'
                  }`}
                >
                  <div className="mt-0.5 relative flex items-center justify-center w-4 h-4 rounded-full border border-black/40">
                    <input
                      type="radio"
                      name="role"
                      value="seller"
                      checked={formData.role === 'seller'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {formData.role === 'seller' && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#1B1C1C] tracking-wide">
                      Seller
                    </span>
                    <span className="block text-[11px] text-[#7E7576] mt-0.5 leading-tight">
                      Brand / Merchant
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and conditions snippet */}
            <p className="text-[11px] text-[#7E7576] leading-normal pt-1">
              By creating an account, you agree to our{' '}
              <a href="#terms" className="underline hover:text-black">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#privacy" className="underline hover:text-black">
                Privacy Policy
              </a>
              .
            </p>

            {/* Submit CTA Button */}
            <div className="pt-2">
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
                    <span>Creating Account...</span>
                  </span>
                ) : (
                  <>
                    <span>CREATE ACCOUNT</span>
                    <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
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

          {/* Switch to Login */}
          <p className="mt-6 text-center text-xs text-[#5D5F5B]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-black font-semibold uppercase tracking-wider hover:opacity-75 border-b border-black pb-0.5 ml-1 transition-opacity"
            >
              Sign In
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

export default Register
