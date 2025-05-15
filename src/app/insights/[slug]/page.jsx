'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/lib/hooks';
import PresentationViewer from '@/components/PresentationViewer';
import { motion } from 'framer-motion';

/* -------------------------------------------------------------------------- */
/*                               INSIGHT DATA                                 */
/* -------------------------------------------------------------------------- */
export const insightData = {
  /* ---------------------------------------------------------------------- */
  'green-hydrogen-india': {
    title: 'Green Hydrogen Production Costs in India',
    heroImage: '/images/case-studies/hydrogen-india-hero.jpg',
    thumbnail: '/images/case-studies/hydrogen-india.jpg',
    reportType: 'pdf',
    reportUrl:  '/reports/ORF-GH2.pdf',
  },

  /* ---------------------------------------------------------------------- */
  'transitions-harvest-kenya': {
    title: "Transition's Harvest: Green Fertilizer in Kenya",
    heroImage: '/images/case-studies/fertilizer-kenya-hero.jpg',
    thumbnail:  '/images/case-studies/fertilizer-kenya.jpg',
    status:     'upcoming',          
    releaseDate:'July 2025',
  },
  

  /* ---------------------------------------------------------------------- */
  'green-fertilizer-brazil': {
    title: 'Green Fertilizer Development in Brazil',
    heroImage: '/images/case-studies/fertilizer-brazil-hero.jpg',
    thumbnail:  '/images/case-studies/fertilizer-brazil.jpg',
    /* this insight ships a slide deck that is already a PDF */
    presentation: {
      type: 'pdf',
      url:  '/reports/Fertilizer Roundtable Presentation.pdf',
    },
  },

  /* ---------------------------------------------------------------------- */
  'green-fertilizer-kenya': {
    title: 'Green Fertilizer Analysis in Kenya',
    heroImage: '/images/case-studies/fertilizer-kenya-analysis-hero.jpg',
    thumbnail:  '/images/case-studies/fertilizer-kenya-analysis.jpg',
    reportType: 'pdf',
    reportUrl:  '/reports/AHP Conference Presentation.pdf',
  },

  'gas-risk-europe': {
    title: 'Hedging Geopolitical Gas Risk for European Power',
    heroImage: '/images/case-studies/gas-europe-hero.jpg',
    thumbnail:  '/images/case-studies/gas-europe.jpg',
    status:     'upcoming',          
    releaseDate:'October 2025',     
  },  

  /* ---------------------------------------------------------------------- */
  'e-saf-sarep': {
    title: 'e-SAF Analysis for SAREP',
    heroImage: '/images/case-studies/e-saf-sarep-hero.jpg',
    thumbnail:  '/images/case-studies/e-saf-sarep.jpg',
    presentation: {
      type: 'pdf',
      url:  '/reports/e-saf-sarep.pdf',
    },
  },
};
/* -------------------------------------------------------------------------- */
/*                            HELPER FUNCTION                                 */
/* -------------------------------------------------------------------------- */
function getPdfUrl(insight) {
  // 1) prefer a presentation if it's a PDF
  if (insight.presentation?.type === 'pdf') return insight.presentation.url;
  // 2) otherwise use the main report if it's a PDF
  if (insight.reportType === 'pdf') return insight.reportUrl;
  // 3) fallback: none available
  return null;
}

/* -------------------------------------------------------------------------- */
/*                               PAGE COMPONENT                               */
/* -------------------------------------------------------------------------- */
export default function InsightReader({ params }) {
  const { slug } = params;
  const [insight, setInsight] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const data = insightData[slug];
    setInsight(data || null);
    setPdfUrl(data ? getPdfUrl(data) : null);
  }, [slug]);

  /* ----------------------------- loading state ---------------------------- */
  if (!insight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cloud-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-cyan mb-4" />
        <p className="text-graphite text-lg">Loading insight…</p>
      </div>
    );
  }

  /* ------------------------------- no-PDF case ---------------------------- */
  if (!pdfUrl) {
    return (
      <div className="min-h-screen flex flex-col bg-cloud-white">
        <header className="bg-night-navy">
          <div className="container mx-auto px-6 py-4 flex items-center space-x-4">
            <Link href="/insights" className="text-white/80 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h1 className="text-white text-lg font-medium truncate">{insight.title}</h1>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-night-navy/20 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l6 6v12a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-night-navy text-2xl font-semibold mb-2">PDF unavailable</h2>
          <p className="text-graphite max-w-md">
            This insight doesn’t include an embeddable PDF yet. Please&nbsp;
            <Link href="/contact" className="text-sky-cyan font-medium hover:underline">
              get in touch
            </Link>{' '}
            if you’d like more information.
          </p>
        </main>
      </div>
    );
  }

  /* ------------------------------- PDF view ------------------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-cloud-white">
      {/* ------------------------------------------------------------------- */}
      {/*                               HEADER                                */}
      {/* ------------------------------------------------------------------- */}
      <header className="relative h-56 md:h-72 bg-night-navy">
        {/* hero image (subtly faded) */}
        <Image src={insight.heroImage || insight.thumbnail} alt={insight.title} fill className="object-cover opacity-25" priority />
        <div className="absolute inset-0 bg-night-navy/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 flex items-center space-x-4">
            <Link href="/insights" className="text-white/80 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h1 className="text-white text-xl md:text-2xl font-semibold truncate">{insight.title}</h1>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/*                             PDF VIEWER                              */}
      {/* ------------------------------------------------------------------- */}
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-10">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
            <iframe
              src={pdfUrl}
              title="Insight PDF"
              className="w-full h-[80vh] md:h-[85vh]"
            />
          </div>

          <div className="mt-6 text-center">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-cyan hover:bg-sky-cyan/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
