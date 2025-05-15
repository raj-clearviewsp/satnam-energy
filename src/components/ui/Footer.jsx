import Link from 'next/link';
import { NAVIGATION, SITE_NAME } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-night-navy text-cloud-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="md:col-span-1">
            <Link 
              href="/"
              className="text-cloud-white font-headline text-xl flex items-center"
              aria-label={`${SITE_NAME} - Home`}
            >
              <span className="text-sky-cyan font-bold">Satnam</span>
              <span className="ml-1">Energy</span>
            </Link>
            <p className="mt-2 text-graphite">
              Data-Driven Insights to Secure Low-Carbon Energy
            </p>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
                <li>
                <Link
                    href="/"
                    className="text-graphite hover:text-sky-cyan transition-colors"
                >
                    Home
                </Link>
                </li>
                <li>
                <Link
                    href="/insights"
                    className="text-graphite hover:text-sky-cyan transition-colors"
                >
                    Insights
                </Link>
                </li>
                <li>
                <Link
                    href="/services"
                    className="text-graphite hover:text-sky-cyan transition-colors"
                >
                    Services
                </Link>
                </li>
                <li>
                <Link
                    href="/about"
                    className="text-graphite hover:text-sky-cyan transition-colors"
                >
                    About
                </Link>
                </li>
            </ul>
          </div>
          {/* Secondary Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {NAVIGATION.slice(4).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-graphite hover:text-sky-cyan transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-graphite hover:text-sky-cyan transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-graphite">
              <p>info@satnam-energy.com</p>
              <p className="mt-2">+1 (202) 555-1234</p>
              <p className="mt-2">
                1234 Clean Energy Blvd<br />
                Washington, DC 20001
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-graphite/20 text-center text-graphite">
          <p>© {currentYear} Satnam Energy Strategies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}