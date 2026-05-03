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
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import TherapistDirectoryPage from './pages/therapists/TherapistDirectoryPage'
import TherapistDetailPage from './pages/therapists/TherapistDetailPage'
import SessionBookingPage from './pages/sessions/SessionBookingPage'
import MoodTrackingPage from './pages/mood/MoodTrackingPage'
import ProfilePage from './pages/profile/ProfilePage'
import AssessmentsPage from './pages/assessments/AssessmentsPage'
import TakeAssessmentPage from './pages/assessments/TakeAssessmentPage'
import AssessmentResultsPage from './pages/assessments/AssessmentResultsPage'
import AssessmentHistoryPage from './pages/assessments/AssessmentHistoryPage'
import ResourcesPage from './pages/resources/ResourcesPage'
import ResourceDetailPage from './pages/resources/ResourceDetailPage'
import BookmarksPage from './pages/resources/BookmarksPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage'
import AdminPlaceholderPage from './pages/admin/AdminPlaceholderPage'
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
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          
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
          <Route path="mood/calendar" element={
            <ProtectedRoute>
              <MoodTrackingPage />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="assessments" element={
            <ProtectedRoute>
              <AssessmentsPage />
            </ProtectedRoute>
          } />
          <Route path="assessments/history" element={
            <ProtectedRoute>
              <AssessmentHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="assessments/:id/take" element={
            <ProtectedRoute>
              <TakeAssessmentPage />
            </ProtectedRoute>
          } />
          <Route path="assessments/:id/results" element={
            <ProtectedRoute>
              <AssessmentResultsPage />
            </ProtectedRoute>
          } />
          <Route path="resources" element={
            <ProtectedRoute>
              <ResourcesPage />
            </ProtectedRoute>
          } />
          <Route path="resources/:id" element={
            <ProtectedRoute>
              <ResourceDetailPage />
            </ProtectedRoute>
          } />
          <Route path="bookmarks" element={
            <ProtectedRoute>
              <BookmarksPage />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />

        {/* Admin Routes - separate layout */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="counselors" element={<AdminPlaceholderPage title="Counselors" description="Manage counselor accounts and assignments." />} />
          <Route path="resources" element={<AdminPlaceholderPage title="Resources" description="Manage the resource library content." />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminPlaceholderPage title="Settings" description="Platform configuration and settings." />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
