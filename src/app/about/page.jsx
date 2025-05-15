import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description:
    'Learn about Satnam Energy—our mission, values, and commitment to a low-carbon energy future.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto">
        {/* --------------------------------------------------------------- */}
        {/*                     HERO / MISSION SECTION                     */}
        {/* --------------------------------------------------------------- */}
        <section className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl font-bold text-night-navy mb-6">
            About Satnam&nbsp;Energy&nbsp;Strategies
          </h1>

          <p className="text-xl text-graphite mb-10">
            We provide data-driven insight to secure a low-carbon energy future—uniting
            evidence-based policy analysis, techno-economic modelling, and strategic finance.
          </p>

          <div className="bg-night-navy/5 p-8 rounded-lg text-left">
            <h2 className="text-2xl font-semibold text-night-navy mb-4">Our Mission</h2>
            <p className="text-graphite leading-relaxed">
              Satnam Energy Strategies exists to accelerate the global energy transition.
              We deliver rigorous analysis and clear-eyed advice that empower governments,
              financiers, and innovators to decarbonise rapidly while strengthening energy
              security and economic prosperity.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*                          VALUES SECTION                         */}
        {/* --------------------------------------------------------------- */}
        <section className="mb-24">
          <h2 className="text-3xl font-semibold text-center mb-12 text-night-navy">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              title="Evidence-Based"
              text="Every recommendation is grounded in transparent data and reproducible methodology."
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </ValueCard>

            <ValueCard
              title="Impact-Driven"
              text="We measure success by tangible progress toward a resilient, low-carbon world."
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </ValueCard>

            <ValueCard
              title="Collaborative"
              text="Complex challenges demand partnership—across disciplines, sectors, and borders."
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </ValueCard>

            <ValueCard
              title="Innovative"
              text="We push analytic boundaries to illuminate emerging pathways and finance mechanisms."
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </ValueCard>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*                        CONTACT SECTION                           */}
        {/* --------------------------------------------------------------- */}
        <section id="contact" className="max-w-3xl mx-auto scroll-mt-24">
          <h2 className="text-3xl font-semibold text-center mb-8 text-night-navy">
            Get in Touch
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Formspree POST */}
            <form
              action="https://formspree.io/f/meogvyjv"
              method="POST"
              className="space-y-6"
            >
              {/* name & email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Name" id="name" type="text" required />
                <FormField label="Email" id="email" type="email" required />
              </div>

              {/* organisation */}
              <FormField label="Organization" id="organization" />

              {/* message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-night-navy mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-cyan focus:ring-sky-cyan"
                  placeholder="Tell us a little about your enquiry…"
                />
              </div>

              {/* optional custom subject */}
              <input
                type="hidden"
                name="_subject"
                value="New enquiry from satnamenergy.com"
              />

              {/* submit */}
              <Button type="submit" variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*                         Helper Components                              */
/* ---------------------------------------------------------------------- */

function ValueCard({ title, text, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="w-12 h-12 bg-sky-cyan/20 text-sky-cyan rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {children}
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-graphite">{text}</p>
    </div>
  );
}

function FormField({ label, id, type = 'text', required = false }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-night-navy mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-cyan focus:ring-sky-cyan"
      />
    </div>
  );
}
