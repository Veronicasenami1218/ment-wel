import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import FeaturesPage from './pages/FeaturesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import SSOCallback from './pages/auth/SSOCallback'
import DashboardPage from './pages/dashboard/DashboardPage'
import TherapistDirectoryPage from './pages/therapists/TherapistDirectoryPage'
import TherapistDetailPage from './pages/therapists/TherapistDetailPage'
import SessionBookingPage from './pages/sessions/SessionBookingPage'
import MoodTrackingPage from './pages/mood/MoodTrackingPage'
import ProfilePage from './pages/profile/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Helmet>
        <title>MentWel - Mental Health Platform</title>
        <meta name="description" content="Connect with licensed therapists across Nigeria for anonymous, secure, and flexible therapy sessions via text, voice, and video." />
        <meta name="keywords" content="mental health, therapy, therapists, counseling, Nigeria, online therapy, mental wellness" />
        <meta name="author" content="MentWel" />
        <meta property="og:title" content="MentWel - Mental Health Platform" />
        <meta property="og:description" content="Connect with licensed therapists across Nigeria for anonymous, secure, and flexible therapy sessions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mentwel.com" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MentWel - Mental Health Platform" />
        <meta name="twitter:description" content="Connect with licensed therapists across Nigeria for anonymous, secure, and flexible therapy sessions." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://mentwel.com" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>

      <Routes>
        {/* Public Routes - Only Landing, Login, Register */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="sso-callback" element={<SSOCallback />} />
          
          {/* Protected Routes - Require Authentication */}
          <Route path="features" element={
            <ProtectedRoute>
              <FeaturesPage />
            </ProtectedRoute>
          } />
          <Route path="about" element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          } />
          <Route path="contact" element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          } />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="therapists" element={
            <ProtectedRoute>
              <TherapistDirectoryPage />
            </ProtectedRoute>
          } />
          <Route path="therapists/:id" element={
            <ProtectedRoute>
              <TherapistDetailPage />
            </ProtectedRoute>
          } />
          <Route path="sessions" element={
            <ProtectedRoute>
              <SessionBookingPage />
            </ProtectedRoute>
          } />
          <Route path="mood" element={
            <ProtectedRoute>
              <MoodTrackingPage />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
