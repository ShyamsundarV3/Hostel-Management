import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, googleLogin } from '../../actions/userActions'
import '../../css/login.css'

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

const LoginView = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const handleGoogleResponse = useCallback(
    (response) => {
      if (response.credential) {
        dispatch(googleLogin(response.credential))
      }
    },
    [dispatch]
  )

  // Load Google Identity Services script
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        })
        const googleBtnContainer = document.getElementById(
          'google-signin-btn-login'
        )
        if (googleBtnContainer) {
          window.google.accounts.id.renderButton(googleBtnContainer, {
            theme: 'filled_black',
            size: 'large',
            width: '100%',
            text: 'signin_with',
            shape: 'pill',
          })
        }
      }
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      )
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [handleGoogleResponse])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className='login-page-wrapper'>
      {/* Animated Background */}
      <div className='login-bg' />

      {/* Floating Orbs */}
      <div className='login-orb login-orb--1' />
      <div className='login-orb login-orb--2' />
      <div className='login-orb login-orb--3' />

      {/* Floating Particles */}
      <div className='login-particles'>
        <div className='login-particle' />
        <div className='login-particle' />
        <div className='login-particle' />
        <div className='login-particle' />
        <div className='login-particle' />
        <div className='login-particle' />
        <div className='login-particle' />
        <div className='login-particle' />
      </div>

      {/* Login Card */}
      <div className='login-card'>
        {/* Brand */}
        <div className='login-brand'>
          <div className='login-brand__icon'>
            {/* Hostel Building SVG Icon */}
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M3 21h18' />
              <path d='M5 21V7l7-4 7 4v14' />
              <path d='M9 21v-4h6v4' />
              <path d='M9 9h1' />
              <path d='M14 9h1' />
              <path d='M9 13h1' />
              <path d='M14 13h1' />
            </svg>
          </div>
          <h1 className='login-brand__title'>Hostel Management</h1>
          <p className='login-brand__subtitle'>
            Sign in to your account to continue
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='login-error'>
            <span className='login-error__icon'>⚠️</span>
            <p className='login-error__text'>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} id='login-form'>
          {/* Email Field */}
          <div className='login-form-group'>
            <label className='login-form-group__label' htmlFor='login-email'>
              Email Address
            </label>
            <div className='login-form-group__input-wrapper'>
              <input
                id='login-email'
                className='login-form-group__input'
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete='email'
              />
              {/* Email Icon */}
              <span className='login-form-group__icon'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect x='2' y='4' width='20' height='16' rx='2' />
                  <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
                </svg>
              </span>
            </div>
          </div>

          {/* Password Field */}
          <div className='login-form-group'>
            <label
              className='login-form-group__label'
              htmlFor='login-password'
            >
              Password
            </label>
            <div className='login-form-group__input-wrapper'>
              <input
                id='login-password'
                className='login-form-group__input'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='current-password'
              />
              {/* Lock Icon */}
              <span className='login-form-group__icon'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect
                    width='18'
                    height='11'
                    x='3'
                    y='11'
                    rx='2'
                    ry='2'
                  />
                  <path d='M7 11V7a5 5 0 0 1 10 0v4' />
                </svg>
              </span>
              {/* Toggle Password Visibility */}
              <button
                type='button'
                className='login-password-toggle'
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94' />
                    <path d='M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19' />
                    <line x1='1' y1='1' x2='23' y2='23' />
                    <path d='M14.12 14.12a3 3 0 1 1-4.24-4.24' />
                  </svg>
                ) : (
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                    <circle cx='12' cy='12' r='3' />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className='login-options'>
            <label className='login-remember'>
              <input
                type='checkbox'
                className='login-remember__checkbox'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className='login-remember__text'>Remember me</span>
            </label>
            <a href='#!' className='login-forgot'>
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='login-submit-btn'
            id='login-submit'
            disabled={loading}
          >
            {loading ? (
              <>
                <span className='login-spinner' />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className='login-divider'>
          <span className='login-divider__line' />
          <span className='login-divider__text'>or continue with</span>
          <span className='login-divider__line' />
        </div>

        {/* Google Sign-In Button */}
        {GOOGLE_CLIENT_ID ? (
          <div className='login-google-wrapper'>
            <div id='google-signin-btn-login' className='login-google-btn-container' />
          </div>
        ) : (
          <button
            type='button'
            className='login-google-btn'
            onClick={() => alert('Google OAuth is not configured. Please set REACT_APP_GOOGLE_CLIENT_ID environment variable.')}
          >
            <svg width='20' height='20' viewBox='0 0 24 24'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        )}

        {/* Register Link */}
        <div className='login-register'>
          <span className='login-register__text'>
            Don&apos;t have an account?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className='login-register__link'
            >
              Create Account
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginView
