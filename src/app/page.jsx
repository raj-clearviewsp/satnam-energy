import Link from 'next/link';
import CoverRibbons from '@/components/charts/CoverRibbons';
import FeaturedChart from '@/components/charts/FeaturedChart';
import { FEATURED, TALKS, WORK } from '@/content/work';

const external = (href) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {});

export default function HomePage() {
  return (
    <>
      <div className="band-navy">
        <section className="container cover" aria-labelledby="cover-title">
          <h1 id="cover-title">
            We research energy markets in <span>the United States, South Asia and Southeast Asia.</span>
          </h1>
          <div className="cover-row">
            <div className="ideas">
              <div>
                <h2>Energy demand is shifting to South and Southeast Asia.</h2>
                <p>
                  The two regions are projected to add more energy demand than anywhere else in the world through
                  2035.
                </p>
              </div>
              <div>
                <h2>The United States can help build what comes next.</h2>
                <p>
                  U.S. policy, technology and finance can drive that growth, and open export markets for emerging
                  American energy technologies.
                </p>
              </div>
            </div>
            <CoverRibbons />
          </div>
        </section>
      </div>

      <div className="band-white">
        <section className="container featured" aria-labelledby="featured-title">
          <p className="label">Featured</p>
          <h2 className="title" id="featured-title">
            <Link href={FEATURED.href}>{FEATURED.title}</Link>
          </h2>
          <div className="featured-row">
            <div className="featured-text">
              {FEATURED.excerpt.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <Link className="more" href={FEATURED.href}>
                Continue reading →
              </Link>
              <span className="meta">{FEATURED.meta}</span>
            </div>
            <div className="featured-chart">
              <FeaturedChart />
            </div>
          </div>
        </section>
      </div>

      <section className="container work" id="work" aria-labelledby="work-title">
        <h2 className="label" id="work-title">
          More work
        </h2>
        {WORK.map((w) => (
          <a className="entry" href={w.href} key={w.href} {...external(w.href)}>
            <span className="entry-text">
              <span className="entry-title">
                {w.title} <span className="arrow">↗</span>
              </span>
              <span className="entry-line">{w.line}</span>
              <span className="meta">{w.meta}</span>
            </span>
            <span className="stat">
              <span className="stat-number">{w.stat}</span>
              <span className="stat-label">{w.statLabel}</span>
            </span>
          </a>
        ))}
        <div className="talks">
          <h3>Talks and slides</h3>
          <ul>
            {TALKS.map((t) => (
              <li key={t.href}>
                <a href={t.href} {...external(t.href)}>
                  {t.title} ↗
                </a>
                <br />
                <span>{t.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
