/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_FLUTTERWAVE_PUBLIC_KEY?: string
  readonly VITE_APP_NAME?: string
  readonly VITE_APP_VERSION?: string
  readonly VITE_APP_ENVIRONMENT?: 'development' | 'staging' | 'production'
  readonly VITE_ENABLE_MOOD_TRACKING?: string
  readonly VITE_ENABLE_AI_INSIGHTS?: string
  readonly VITE_ENABLE_VIDEO_SESSIONS?: string
  readonly VITE_GOOGLE_ANALYTICS_ID?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_TWITTER_HANDLE?: string
  readonly VITE_FACEBOOK_PAGE?: string
  readonly VITE_INSTAGRAM_HANDLE?: string
  readonly VITE_SUPPORT_EMAIL?: string
  readonly VITE_SUPPORT_PHONE?: string
  readonly VITE_PRIVACY_POLICY_URL?: string
  readonly VITE_TERMS_OF_SERVICE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
