import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Eagerly-loaded landing experience (above-the-fold for first visit)
import LandingPage from './pages/LandingPage'

// Lazy-loaded route components — each becomes its own chunk.
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const SSOCallback = lazy(() => import('./pages/auth/SSOCallback'))
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'))
const EmailVerificationPage = lazy(() => import('./pages/auth/EmailVerificationPage'))
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'))
const TherapistDirectoryPage = lazy(() => import('./pages/therapists/TherapistDirectoryPage'))
const TherapistDetailPage = lazy(() => import('./pages/therapists/TherapistDetailPage'))
const SessionBookingPage = lazy(() => import('./pages/sessions/SessionBookingPage'))
const MoodTrackingPage = lazy(() => import('./pages/mood/MoodTrackingPage'))
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'))
const AssessmentsPage = lazy(() => import('./pages/assessments/AssessmentsPage'))
const TakeAssessmentPage = lazy(() => import('./pages/assessments/TakeAssessmentPage'))
const AssessmentResultsPage = lazy(() => import('./pages/assessments/AssessmentResultsPage'))
const AssessmentHistoryPage = lazy(() => import('./pages/assessments/AssessmentHistoryPage'))
const ResourcesPage = lazy(() => import('./pages/resources/ResourcesPage'))
const ResourceDetailPage = lazy(() => import('./pages/resources/ResourceDetailPage'))
const BookmarksPage = lazy(() => import('./pages/resources/BookmarksPage'))
const ChatDashboardPage = lazy(() => import('./pages/chat/ChatDashboardPage'))
const ChatWindowPage = lazy(() => import('./pages/chat/ChatWindowPage'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'))
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage'))
const AdminPlaceholderPage = lazy(() => import('./pages/admin/AdminPlaceholderPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500" />
  </div>
)

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

      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public + protected user-facing routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="sso-callback" element={<SSOCallback />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="verify-email/:token" element={<EmailVerificationPage />} />
            <Route path="verify-email" element={<EmailVerificationPage />} />

            {/* Protected Routes */}
            <Route path="features" element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>} />
            <Route path="about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
            <Route path="contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
            <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="therapists" element={<ProtectedRoute><TherapistDirectoryPage /></ProtectedRoute>} />
            <Route path="therapists/:id" element={<ProtectedRoute><TherapistDetailPage /></ProtectedRoute>} />
            <Route path="sessions" element={<ProtectedRoute><SessionBookingPage /></ProtectedRoute>} />
            <Route path="mood" element={<ProtectedRoute><MoodTrackingPage /></ProtectedRoute>} />
            <Route path="mood/calendar" element={<ProtectedRoute><MoodTrackingPage /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="assessments" element={<ProtectedRoute><AssessmentsPage /></ProtectedRoute>} />
            <Route path="assessments/history" element={<ProtectedRoute><AssessmentHistoryPage /></ProtectedRoute>} />
            <Route path="assessments/:id/take" element={<ProtectedRoute><TakeAssessmentPage /></ProtectedRoute>} />
            <Route path="assessments/:id/results" element={<ProtectedRoute><AssessmentResultsPage /></ProtectedRoute>} />
            <Route path="resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
            <Route path="resources/:id" element={<ProtectedRoute><ResourceDetailPage /></ProtectedRoute>} />
            <Route path="bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>} />
            <Route path="chat" element={<ProtectedRoute><ChatDashboardPage /></ProtectedRoute>} />
            <Route path="chat/:sessionId" element={<ProtectedRoute><ChatWindowPage /></ProtectedRoute>} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />

          {/* Admin */}
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
      </Suspense>
    </>
  )
}

export default App
