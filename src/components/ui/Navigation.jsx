'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION } from '@/lib/constants';
import Image from 'next/image';
import logoSVG from 'public/images/logo.svg';

export default function Navigation() {
  const pathname      = usePathname();
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobile,   setIsMobileMenuOpen]   = useState(false);
  
  // Check if we're on the home page
  const isHomePage = pathname === '/';

  /* change bg on scroll */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Determine header background
  const getHeaderBackground = () => {
    if (isScrolled) {
      // Always show solid background when scrolled
      return 'bg-night-navy shadow-md';
    } else if (isHomePage) {
      // Transparent on home page when not scrolled
      return 'bg-transparent';
    } else {
      // On other pages, always have a background
      return 'bg-night-navy/90 backdrop-blur-sm';
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 w-full z-[9999] transition-all duration-200 ${getHeaderBackground()} ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* ───── Logo ───── */}
        <Link
          href="/"
          aria-label="Satnam Energy Strategies - Home"
          className="relative z-[10000] flex items-center"
        >
          <Image
            src={logoSVG}
            alt="Satnam Energy logo"
            width={355}       /* any proper width that keeps the ratio */
            height={64}       /* corresponds to ~32 px once we scale down */
            priority
            className="h-8 w-auto" /* h-8 = 32 px, width auto keeps ratio */
          />
        </Link>

        {/* ───── Desktop nav ───── */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {NAVIGATION.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors hover:text-sky-cyan ${
                    pathname === href ? 'text-sky-cyan' : 'text-cloud-white'
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ───── Mobile toggle ───── */}
        <button
          type="button"
          className="md:hidden text-cloud-white"
          onClick={() => setIsMobileMenuOpen(!isMobile)}
          aria-expanded={isMobile}
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
            fill="none"
          >
            {isMobile ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ───── Mobile nav ───── */}
      {isMobile && (
        <nav className="md:hidden bg-night-navy">
          <ul className="container py-4 space-y-4">
            {NAVIGATION.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`block px-4 py-2 text-base font-medium rounded-md ${
                    pathname === href
                      ? 'bg-sky-cyan/10 text-sky-cyan'
                      : 'text-cloud-white hover:bg-sky-cyan/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}