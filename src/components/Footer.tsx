import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-fuchsia-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <span className="bg-gradient-to-r from-sky-500 to-fuchsia-600 bg-clip-text text-transparent">
                MentWel
              </span>
            </Link>
            <p className="text-neutral-400 mb-6 leading-relaxed max-w-sm">
              Making mental health support accessible, secure, and effective for everyone in Nigeria.
            </p>
            <div className="flex gap-4">
              {['twitter', 'facebook', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:bg-sky-500 hover:text-white transition-all"
                  aria-label={social}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {[
                { label: 'Features', path: '/features' },
                { label: 'Find Therapists', path: '/therapists' },
                { label: 'Resources', path: '/resources' },
                { label: 'How It Works', path: '/how-it-works' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-neutral-400 hover:text-sky-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {[
                { label: 'Help Center', path: '/help' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Crisis Support', path: '/crisis' },
                { label: 'FAQ', path: '/faq' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-neutral-400 hover:text-sky-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms of Service', path: '/terms' },
                { label: 'Cookie Policy', path: '/cookies' },
                { label: 'GDPR', path: '/gdpr' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-neutral-400 hover:text-sky-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-800 pt-8 text-center space-y-4">
          <p className="text-neutral-400 text-sm">&copy; 2025 MentWel. All rights reserved.</p>
          <p className="text-neutral-500 text-sm">
            Mental health support available 24/7. In case of emergency, call 112 (Nigeria) or your local emergency
            services.
          </p>
        </div>
      </div>
    </footer>
  );
}
