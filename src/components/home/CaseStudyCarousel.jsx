'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView, useReducedMotion } from '@/lib/hooks';

// Mock data for case studies
const caseStudies = [
  {
    title: 'Green Hydrogen Cost Pathways in India',
    client: 'ORF America',
    year: 2024,
    description: 'Comprehensive analysis of production economics and policy framework for scaling green hydrogen across key industrial applications.',
    image: '/images/hydrogen-india.jpg', // Corrected path
    stat: '$5.30/kg',
    statLabel: 'Current cost, without policy support',
    link: '/case-studies/green-hydrogen-india'
  },
  {
    title: 'Green Fertilisers in Kenya',
    client: 'World Resources Institute',
    year: 2025,
    description: 'Feasibility assessment for domestic green ammonia production to enhance food security and reduce import dependency.',
    image: '/images/kenya-green-fertilizer.jpg',
    stat: '$450M',
    statLabel: 'Annual import substitution potential',
    link: '/case-studies/green-fertilisers-kenya'
  },
  {
    title: 'Hedging Geopolitical Gas-Supply Risk in Europe',
    client: 'Satnam Energy',
    year: 2025,
    description: 'Novel assessment framework combining supplier concentration metrics, geopolitical indicators, and storage adequacy.',
    image: '/images/hedging-georisk.jpg',
    stat: 'Coming Soon',
    statLabel: 'Full report to be published in October 2025',
    link: '/case-studies/gas-supply-europe'
  }
];

export default function CaseStudyCarousel() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const carouselRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Handle scrolling the carousel
  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    
    if (index < 0) index = 0;
    if (index >= caseStudies.length) index = caseStudies.length - 1;
    
    const scrollAmount = index * (carouselRef.current.scrollWidth / caseStudies.length);
    
    if (reduceMotion) {
      carouselRef.current.scrollLeft = scrollAmount;
    } else {
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
    
    setActiveIndex(index);
  };

  return (
    <section ref={ref} className="py-20 bg-cloud-white" id="case-studies">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-3 text-night-navy">
          Proof in practice: insights that moved real megawatts
        </h2>
        
        <p className="text-xl text-center text-graphite mb-12 max-w-3xl mx-auto">
          Our work has helped governments, organizations, and companies make better energy decisions.
        </p>
        
        {/* Case Study Carousel */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {caseStudies.map((study, index) => (
            <div 
              key={study.title}
              className="min-w-[80vw] max-w-[80vw] px-4 snap-center"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                      // Add placeholder while loading
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIUBdAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/9k="
                      // Handle missing images gracefully
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center text-sm text-graphite mb-3">
                      <span className="mr-3">{study.client}</span>
                      <span>•</span>
                      <span className="ml-3">{study.year}</span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-4 text-night-navy">
                      {study.title}
                    </h3>
                    
                    <p className="text-graphite mb-6">
                      {study.description}
                    </p>
                    
                    {/* Key stat */}
                    <div className="mb-6 bg-night-navy/5 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-sky-cyan">{study.stat}</div>
                      <div className="text-sm text-graphite">{study.statLabel}</div>
                    </div>
                    
                    <a 
                      href="/insights" 
                      className="block w-full text-center bg-sky-cyan text-white py-3 rounded-lg hover:bg-sky-cyan/90 transition-colors"
                    >
                      Explore All Insights
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-8">
          {caseStudies.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-2 transition-all ${
                activeIndex === index ? 'bg-sky-cyan scale-125' : 'bg-night-navy/20'
              }`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}