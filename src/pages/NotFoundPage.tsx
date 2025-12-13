import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <p className="text-xl text-neutral-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
