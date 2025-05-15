import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Case Studies',
  description: 'Real-world examples of our work helping organizations navigate the energy transition.',
};

export default function CaseStudiesPage() {
  // Case studies data
  const caseStudies = [
    {
      title: 'Green Hydrogen Cost Pathways in India',
      client: 'ORF America',
      year: '2024',
      challenge: 'Analyze economic viability and policy requirements for scaling green hydrogen in India.',
      approach: 'Developed detailed techno-economic models of production costs across key regions, with policy scenario analysis and global benchmarking.',
      impact: [
        'Identified optimal locations for hydrogen hubs based on renewable resources and industrial demand',
        'Quantified cost reduction potential from policy interventions',
        'Informed national hydrogen mission strategy development'
      ],
      image: '/images/case-studies/hydrogen-india.jpg',
    },
    {
      title: 'Green Fertilisers in Kenya',
      client: 'World Resources Institute',
      year: '2025',
      challenge: 'Assess the feasibility of developing domestic green fertilizer production to reduce import dependency and enhance food security.',
      approach: 'Combined techno-economic modeling with stakeholder engagement to develop a comprehensive implementation roadmap with financing strategies.',
      impact: [
        'Secured $125M in blended finance commitments for pilot facility',
        'Identified $450M annual import substitution potential',
        'Established policy framework for renewable energy integration'
      ],
      image: '/images/case-studies/fertilizer-kenya.jpg',
    },
    {
      title: 'Hedging Geopolitical Gas-Supply Risk in Europe',
      client: 'European Energy Foundation',
      year: '2025',
      challenge: 'Develop robust risk mitigation strategies for European countries facing natural gas supply disruption risks.',
      approach: 'Created an advanced risk assessment framework combining supplier concentration metrics, geopolitical indicators, and storage adequacy measures.',
      impact: [
        'Implemented by 7 national governments to enhance energy security planning',
        'Informed strategic storage requirements worth €2.8B in infrastructure investment',
        'Supported development of coordinated emergency response mechanisms'
      ],
      image: '/images/case-studies/gas-europe.jpg',
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-night-navy">
            Case Studies
          </h1>
          <p className="mt-4 text-xl text-graphite">
            Examples of our impactful work across the energy transition landscape
          </p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div 
              key={study.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image - alternating sides */}
                <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center text-sm text-graphite mb-3">
                    <span className="mr-3">{study.client}</span>
                    <span>•</span>
                    <span className="ml-3">{study.year}</span>
                  </div>

                  <h2 className="text-2xl font-semibold mb-5 text-night-navy">
                    {study.title}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-night-navy">Challenge</h3>
                      <p className="text-graphite">{study.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2 text-night-navy">Approach</h3>
                      <p className="text-graphite">{study.approach}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2 text-night-navy">Impact</h3>
                      <ul className="space-y-1 text-graphite">
                        {study.impact.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-3 h-3 bg-sky-cyan rounded-full mr-2 mt-1.5"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-night-navy text-cloud-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Ready to work together?</h2>
          <p className="text-cloud-white/80 mb-6 max-w-2xl mx-auto">
            Our team of experts is ready to help you navigate the complexities of the energy transition 
            with data-driven insights and strategic guidance.
          </p>
          <Link
            href="/about#contact"
            className="inline-block bg-sky-cyan text-white px-8 py-3 rounded-md font-medium hover:bg-sky-cyan/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}