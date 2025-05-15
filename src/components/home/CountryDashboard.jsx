// Home Page Services Section
export default function HomeServicesSection() {
  const services = [
    {
      id: 'policy',
      title: 'Energy Policy Analysis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: 'Evidence-based policy frameworks for clean energy transitions',
      highlights: ['Regulatory impact assessment', 'International best practices', 'Implementation roadmaps']
    },
    {
      id: 'technical',
      title: 'Technical Modeling',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      description: 'Advanced power sector modeling with PyPSA and OSeMOSYS',
      highlights: ['Capacity expansion planning', 'Green hydrogen economics', 'Grid integration analysis']
    },
    {
      id: 'geopolitical',
      title: 'Geopolitical Risk',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Strategic assessment of energy security and transition risks',
      highlights: ['Supply chain resilience', 'Market risk analysis', 'Scenario planning']
    },
    {
      id: 'finance',
      title: 'Project Finance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Economic analysis for wind and solar project development',
      highlights: ['LCOE optimization', 'Risk assessment', 'Financial modeling']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-night-navy mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-700">
            Comprehensive solutions for navigating the energy transition with technical rigor and strategic insight
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-sky-cyan/10 text-sky-cyan rounded-lg flex items-center justify-center mb-4">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-night-navy mb-2">
                {service.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-1">
                {service.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-sky-cyan rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="text-xs text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Key Differentiators */}
        <div className="bg-night-navy/5 rounded-xl p-8 max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-night-navy text-center mb-6">
            What Sets Us Apart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-energy/20 text-green-energy rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-night-navy mb-2">Technical Rigor</h4>
              <p className="text-sm text-gray-600">
                Deep expertise in PyPSA, OSeMOSYS, and custom energy system modeling
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-harvest/20 text-amber-harvest rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h4 className="font-semibold text-night-navy mb-2">Global Perspective</h4>
              <p className="text-sm text-gray-600">
                Experience across continents with deep understanding of regional contexts
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-clay-rust/20 text-clay-rust rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-night-navy mb-2">Actionable Insights</h4>
              <p className="text-sm text-gray-600">
                Practical recommendations that bridge technical analysis and real-world implementation
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a 
            href="/services"
            className="inline-flex items-center px-8 py-3 bg-sky-cyan text-white font-medium rounded-full hover:bg-sky-cyan/90 transition-all shadow-lg hover:shadow-xl"
          >
            Explore All Services
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
