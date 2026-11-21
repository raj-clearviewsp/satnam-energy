import '@fontsource-variable/mona-sans';
import '@fontsource-variable/source-serif-4';
import '@fontsource-variable/source-serif-4/wght-italic.css';
import './globals.css';
import Link from 'next/link';

export const metadata = {
  metadataBase: new URL('https://satnamenergy.com'),
  title: { default: 'Satnam Energy', template: '%s | Satnam Energy' },
  description:
    'Satnam Energy researches energy markets in the United States, South Asia and Southeast Asia.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="topbar">
          <header className="container topbar-inner">
            <Link href="/" className="logo-link" aria-label="Satnam Energy, home">
              <img src="/brand/logo-dark.svg" alt="Satnam Energy" height="26" />
            </Link>
            <nav aria-label="Main">
              <Link href="/#work">Work</Link>
              <Link href="/#about">About</Link>
            </nav>
          </header>
        </div>
        <main>{children}</main>
        <div className="band band-navy" id="about">
          <div className="container">
            <section className="about" aria-label="About">
              <div className="about-text">
                <img src="/brand/logo-dark.svg" alt="Satnam Energy" height="34" />
                <p>
                  Satnam Energy is a research lab led by Raj Sawhney, a non-resident adjunct fellow in the
                  Energy Security and Climate Change Program at CSIS. Everything here is public. Use it,
                  cite it, and tell us where it is wrong.
                </p>
              </div>
              <div className="about-links">
                <a href="mailto:info@satnamenergy.com">info@satnamenergy.com</a>
                <a href="https://www.csis.org/people/raj-sawhney">Raj at CSIS ↗</a>
              </div>
            </section>
            <footer className="footer">
              <span>© {new Date().getFullYear()} Satnam Energy</span>
              <span>Orange County, California</span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
