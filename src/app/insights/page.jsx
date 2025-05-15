'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView, useReducedMotion } from '@/lib/hooks';

// Updated case studies based on your examples
const caseStudies = [
  {
    title: 'Green Hydrogen Production Costs in India',
    client: 'ORF America',
    year: 2023,
    description: 'Comprehensive techno-economic modeling assessing the production economics of green hydrogen across Indian states, with policy framework recommendations.',
    image: '/images/hydrogen-india.jpg',
    stat: '$5.30/kg',
    statLabel: 'Current cost without policy support',
    link: '/insights/green-hydrogen-india'
  },
  {
    title: 'Transition\'s Harvest: Green Fertilizer in Kenya',
    client: 'Development Partner',
    year: 2024,
    description: 'Analysis of the economics of green hydrogen use for fertilizer production in Kenya, with market competitiveness and transition pathways.',
    image: '/images/kenya-green-fertilizer.jpg',
    stat: '$450M',
    statLabel: 'Annual import substitution potential',
    link: '/insights/transitions-harvest-kenya'
  },
  {
    title: 'Hedging Geopolitical Gas Risk for European Power',
    client: 'Satnam Energy',
    year: 2025,
    description: 'Strategic analysis of hedging geopolitical gas supply risks for European power sector growth, with energy security scenarios and mitigation strategies.',
    image: '/images/hedging-georisk.jpg',
    stat: 'Coming Soon',
    statLabel: 'Full report to be published in October 2025.',
    link: '/insights/gas-risk-europe'
  },
  {
    title: 'Green Fertilizer Development in Brazil',
    client: 'Green Fertilizer Development Network',
    year: 2024,
    description: 'Market analysis and development pathway assessment for green fertilizer in Brazil, including renewable integration and production economics.',
    image: '/images/gfdn-brazil.jpg',
    stat: '30%',
    statLabel: 'Green cost gap after Rehidro and PHBC incentives.',
    link: '/insights/green-fertilizer-brazil'
  },
  {
    title: 'Financing the Transition: Evaluating Pathways to Green Molecule Cost Competitiveness',
    client: 'African Hydrogen Partnership',
    year: 2024,
    description: 'Regional cost modeling and market assessment for green ammonia and fertilizer production deployment in Kenya.',
    image: '/images/ahp-ethiopia-presentation.jpg',
    stat: '$305/ton',
    statLabel: 'Green urea cost gap',
    link: '/insights/green-fertilizer-kenya'
  },
  {
    title: 'e-SAF Analysis for SAREP',
    client: 'SAREP',
    year: 2024,
    description: 'Technical and economic assessment of sustainable aviation fuel production pathways and deployment scenarios.',
    image: '/images/e-saf-india.jpg',
    stat: '$1600/ton',
    statLabel: 'Breakeven Sales Price',
    link: '/insights/e-saf-sarep'
  }
];

export default function InsightsPage() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const carouselRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  
  // Get filtered case studies
  const filteredCaseStudies = filter === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => {
        const title = study.title.toLowerCase();
        if (filter === 'hydrogen') return title.includes('hydrogen');
        if (filter === 'fertilizer') return title.includes('fertilizer') || title.includes('fertiliser');
        if (filter === 'gas') return title.includes('gas');
        if (filter === 'aviation') return title.includes('saf') || title.includes('aviation');
        return true;
      });
  
  // Handle scrolling the carousel
  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    
    if (index < 0) index = 0;
    if (index >= filteredCaseStudies.length) index = filteredCaseStudies.length - 1;
    
    const scrollAmount = index * (carouselRef.current.scrollWidth / filteredCaseStudies.length);
    
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
    <div className="bg-cloud-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-night-navy to-night-navy/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Energy Transition Insights
            </h1>
            <p className="text-xl text-cloud-white/90 mb-8">
              Rigorous analysis and strategic recommendations that have shaped real-world energy decisions
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button 
                onClick={() => setFilter('all')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'all' 
                    ? 'bg-sky-cyan text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                All Projects
              </button>
              <button 
                onClick={() => setFilter('hydrogen')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'hydrogen' 
                    ? 'bg-sky-cyan text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Hydrogen
              </button>
              <button 
                onClick={() => setFilter('fertilizer')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'fertilizer' 
                    ? 'bg-sky-cyan text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Fertilizer
              </button>
              <button 
                onClick={() => setFilter('gas')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'gas' 
                    ? 'bg-sky-cyan text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Gas & Energy Security
              </button>
              <button 
                onClick={() => setFilter('aviation')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'aviation' 
                    ? 'bg-sky-cyan text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Aviation
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Case Studies Section */}
      <section ref={ref} className="py-20" id="case-studies">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-night-navy">
            Proof in Practice: Insights that Moved Real Megawatts
          </h2>
          
          <p className="text-xl text-center text-graphite mb-16 max-w-3xl mx-auto">
            Our analysis has informed policy decisions and investment strategies across the global energy landscape.
          </p>
          
          {/* Grid Layout for Larger Screens */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
            {filteredCaseStudies.map((study, index) => (
              <div 
                key={study.title}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-48">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIUBdAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/9k="
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  <div className="absolute top-0 left-0 bg-night-navy/80 text-white text-xs font-medium py-1 px-3 rounded-br-lg">
                    {study.year}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="text-sm text-sky-cyan font-medium mb-2">{study.client}</div>
                  <h3 className="text-xl font-semibold mb-3 text-night-navy">{study.title}</h3>
                  <p className="text-graphite text-sm mb-4 line-clamp-3">{study.description}</p>
                  
                  {/* Key stat */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="bg-night-navy/5 p-3 rounded-lg inline-block">
                      <div className="text-2xl font-bold text-sky-cyan">{study.stat}</div>
                      <div className="text-xs text-graphite">{study.statLabel}</div>
                    </div>
                    
                    <Link 
                      href={study.link}
                      className="text-sky-cyan font-medium flex items-center hover:text-night-navy transition-colors"
                    >
                      Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel for Mobile/Tablet */}
          <div className="lg:hidden">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredCaseStudies.map((study, index) => (
                <div 
                  key={study.title}
                  className="min-w-[80vw] max-w-[80vw] px-4 snap-center"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      {/* Image */}
                      <div className="relative h-48 md:h-auto">
                        <Image
                          src={study.image}
                          alt={study.title}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIUBdAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/9k="
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                          }}
                        />
                        <div className="absolute top-0 left-0 bg-night-navy/80 text-white text-xs font-medium py-1 px-3 rounded-br-lg">
                          {study.year}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex flex-col justify-between">
                        <div>
                          <div className="text-sm text-sky-cyan font-medium mb-2">{study.client}</div>
                          <h3 className="text-xl font-semibold mb-3 text-night-navy">{study.title}</h3>
                          <p className="text-graphite mb-4 text-sm">{study.description}</p>
                        </div>
                        
                        {/* Key stat */}
                        <div>
                          <div className="mb-6 bg-night-navy/5 p-4 rounded-lg">
                            <div className="text-3xl font-bold text-sky-cyan">{study.stat}</div>
                            <div className="text-sm text-graphite">{study.statLabel}</div>
                          </div>
                          
                          <Link
                            href={study.link}
                            className="block w-full text-center bg-sky-cyan text-white py-3 rounded-lg hover:bg-sky-cyan/90 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-8">
              {filteredCaseStudies.map((_, index) => (
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
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-night-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your energy strategy?</h2>
            <p className="text-xl text-white/80 mb-8">
              Our expertise in technical modeling, policy analysis, and geopolitical risk can help you navigate the complexities of the energy transition.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-sky-cyan hover:bg-sky-cyan/90 text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-lg"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}