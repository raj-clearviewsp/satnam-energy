import { SERVICES } from '@/lib/constants';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Services',
  description: 'Expert energy transition consulting through technical modeling, policy analysis, and geopolitical risk assessment.',
};

// Updated services data
const UPDATED_SERVICES = [
  {
    title: 'Energy Policy Analysis',
    description: 'Evidence-based policy insights for governments and organizations navigating clean energy transitions.',
    icon: 'policy',
    href: '#policy'
  },
  {
    title: 'Technical Modeling',
    description: 'Advanced power sector and energy system modeling using PyPSA, OSeMOSYS, and custom frameworks.',
    icon: 'technical',
    href: '#technical'
  },
  {
    title: 'Geopolitical Risk',
    description: 'Strategic assessment of energy security challenges and transition risks in a changing global landscape.',
    icon: 'geopolitical',
    href: '#geopolitical'
  },
  {
    title: 'Project Finance',
    description: 'Economic evaluation and financial structuring for renewable energy projects, particularly wind and solar.',
    icon: 'finance',
    href: '#finance'
  }
];

const getIconPath = (icon) => {
  const paths = {
    policy: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    technical: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    geopolitical: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    finance: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  };
  return paths[icon];
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-night-navy mb-6">
            Powering the Global Energy Transition
          </h1>
          <p className="text-xl text-graphite leading-relaxed">
            We provide rigorous technical analysis and strategic insights for governments, 
            international organizations, and companies navigating the complex landscape of clean energy deployment.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-20">
          {UPDATED_SERVICES.map((service) => (
            <a 
              key={service.title}
              href={service.href}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-start">
                <div className="w-14 h-14 bg-sky-cyan/10 text-sky-cyan rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={getIconPath(service.icon)}
                    />
                  </svg>
                </div>

                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-night-navy mb-2">
                    {service.title}
                  </h3>
                  <p className="text-graphite leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-night-navy text-center mb-12">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-graphite/5 p-6 rounded-lg">
              <div className="text-sky-cyan text-sm font-medium mb-2">Technical Analysis</div>
              <h3 className="font-semibold text-night-navy mb-2">Green Hydrogen Production Costs in India</h3>
              <p className="text-sm text-graphite">
                Comprehensive techno-economic modeling for ORF America assessing the production economics of green hydrogen across Indian states.
              </p>
            </div>

            <div className="bg-graphite/5 p-6 rounded-lg">
              <div className="text-sky-cyan text-sm font-medium mb-2">Agricultural Economics</div>
              <h3 className="font-semibold text-night-navy mb-2">Transition's Harvest: Green Fertilizer in Kenya</h3>
              <p className="text-sm text-graphite">
                Economics of green hydrogen use for fertilizer production, analyzing cost competitiveness and market transition pathways.
              </p>
            </div>

            <div className="bg-graphite/5 p-6 rounded-lg">
              <div className="text-sky-cyan text-sm font-medium mb-2">Geopolitical Risk</div>
              <h3 className="font-semibold text-night-navy mb-2">European Power Sector Gas Risk</h3>
              <p className="text-sm text-graphite">
                Strategic analysis of hedging geopolitical gas supply risks for European power sector growth and energy security.
              </p>
            </div>

            <div className="bg-graphite/5 p-6 rounded-lg">
              <div className="text-sky-cyan text-sm font-medium mb-2">Market Development</div>
              <h3 className="font-semibold text-night-navy mb-2">Green Fertilizer Development in Brazil</h3>
              <p className="text-sm text-graphite">
                Market analysis and development pathway assessment for the Green Fertilizer Development Network.
              </p>
            </div>

            <div className="bg-graphite/5 p-6 rounded-lg">
              <div className="text-sky-cyan text-sm font-medium mb-2">Comparative Analysis</div>
              <h3 className="font-semibold text-night-navy mb-2">Green Fertilizer Analysis in Kenya</h3>
              <p className="text-sm text-graphite">
                Regional cost modeling and market assessment for green ammonia and fertilizer production deployment.
              </p>
            </div>

            <div className="bg-graphite/5 p-6 rounded-lg">
              <div className="text-sky-cyan text-sm font-medium mb-2">Aviation Decarbonization</div>
              <h3 className="font-semibold text-night-navy mb-2">e-SAF Analysis for SAREP</h3>
              <p className="text-sm text-graphite">
                Technical and economic assessment of sustainable aviation fuel production pathways and deployment scenarios.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Service Sections */}
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Energy Policy Analysis */}
          <section id="policy" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold text-night-navy mb-6">
                  Energy Policy Analysis
                </h2>

                <p className="text-graphite mb-8 text-lg leading-relaxed">
                  We provide evidence-based policy analysis to help governments and organizations design 
                  effective frameworks for clean energy deployment. Our approach combines quantitative modeling 
                  with stakeholder engagement to develop implementable policy solutions.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-night-navy">Core Capabilities</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Regulatory impact assessment and policy design</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">International policy comparison and best practice analysis</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Stakeholder mapping and coalition building strategies</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Implementation roadmaps and monitoring frameworks</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-night-navy">Deliverables</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Policy briefings and white papers</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Regulatory frameworks and implementation guidelines</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Multi-stakeholder workshop facilitation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-navy-light/5 p-8 rounded-lg border border-navy-light/10">
                  <h3 className="text-xl font-semibold mb-6 text-night-navy">
                    Case Study
                  </h3>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sky-cyan">Green Hydrogen Policy Framework</h4>
                    <p className="text-sm text-graphite leading-relaxed">
                      For ORF America, we developed comprehensive policy recommendations for scaling green hydrogen 
                      production in India. Our analysis included:
                    </p>
                    <ul className="text-sm text-graphite space-y-2">
                      <li>• State-wise production cost modeling</li>
                      <li>• Policy incentive impact assessment</li>
                      <li>• Industrial demand analysis</li>
                      <li>• Infrastructure development roadmap</li>
                    </ul>
                    <p className="text-sm text-graphite leading-relaxed">
                      The resulting framework provided actionable recommendations for production incentives, 
                      demand-side mandates, and strategic infrastructure investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Modeling */}
          <section id="technical" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold text-night-navy mb-6">
                  Technical Modeling
                </h2>

                <p className="text-graphite mb-8 text-lg leading-relaxed">
                  Our technical modeling capabilities span the full energy value chain, from power sector planning 
                  to industrial decarbonization pathways. We leverage advanced modeling frameworks to provide 
                  rigorous quantitative insights for decision-makers.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-night-navy">Modeling Frameworks</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Power sector capacity expansion (PyPSA, OSeMOSYS)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Techno-economic analysis for renewable technologies</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Grid integration and flexibility assessment</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Industrial process modeling and optimization</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-night-navy">Applications</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Least-cost energy system pathways</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Technology learning curves and cost projections</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Marginal abatement cost curves</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Scenario analysis and sensitivity testing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-navy-light/5 p-8 rounded-lg border border-navy-light/10">
                  <h3 className="text-xl font-semibold mb-6 text-night-navy">
                    Case Study
                  </h3>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sky-cyan">Green Fertilizer Production Economics</h4>
                    <p className="text-sm text-graphite leading-relaxed">
                      Our analysis "Transition's Harvest" modeled the economics of green hydrogen use for 
                      fertilizer production in Kenya, including:
                    </p>
                    <ul className="text-sm text-graphite space-y-2">
                      <li>• Renewable energy integration scenarios</li>
                      <li>• Electrolyzer technology selection</li>
                      <li>• Production cost optimization</li>
                      <li>• Market competitiveness analysis</li>
                    </ul>
                    <p className="text-sm text-graphite leading-relaxed">
                      The study provided crucial insights for investors and policymakers on the viability 
                      of green fertilizer production in East Africa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Geopolitical Risk */}
          <section id="geopolitical" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold text-night-navy mb-6">
                  Geopolitical Risk Assessment
                </h2>

                <p className="text-graphite mb-8 text-lg leading-relaxed">
                  Energy security and geopolitical dynamics are increasingly critical to successful energy transitions. 
                  We provide strategic insights on supply chain vulnerabilities, resource dependencies, and transition 
                  risks in an evolving global landscape.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-night-navy">Analysis Areas</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Energy security and supply chain resilience</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Critical mineral dependencies and diversification</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Trade policy impacts on clean energy deployment</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Scenario planning for geopolitical disruptions</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-night-navy">Strategic Outputs</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Risk assessment frameworks and mitigation strategies</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Supply chain diversification roadmaps</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Strategic scenario planning exercises</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-navy-light/5 p-8 rounded-lg border border-navy-light/10">
                  <h3 className="text-xl font-semibold mb-6 text-night-navy">
                    Case Study
                  </h3>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sky-cyan">European Gas Risk Hedging</h4>
                    <p className="text-sm text-graphite leading-relaxed">
                      Our analysis examined strategies for hedging geopolitical gas supply risks for European 
                      power sector growth, including:
                    </p>
                    <ul className="text-sm text-graphite space-y-2">
                      <li>• Supply disruption scenario modeling</li>
                      <li>• Alternative supply pathway assessment</li>
                      <li>• Renewable acceleration strategies</li>
                      <li>• Strategic reserve optimization</li>
                    </ul>
                    <p className="text-sm text-graphite leading-relaxed">
                      The study provided actionable recommendations for enhancing energy security while 
                      maintaining decarbonization goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Project Finance */}
          <section id="finance" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold text-night-navy mb-6">
                  Project Finance Analysis
                </h2>

                <p className="text-graphite mb-8 text-lg leading-relaxed">
                  We provide economic evaluation and financial structuring analysis for renewable energy projects, 
                  with particular expertise in wind and solar development. Our work helps developers and investors 
                  optimize project economics and assess financial viability.
                </p>

                <div className="bg-amber-100/60 p-6 rounded-lg mb-8 border border-amber-300">
                  <p className="text-sm text-amber-900">
                    <strong>Note:</strong> We provide analytical services only and do not offer financial advice or 
                    regulated financial services. Our work focuses on economic modeling and technical assessment 
                    to support project development decisions.
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-night-navy">Financial Analysis</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Project cash flow modeling and IRR analysis</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Levelized cost of energy (LCOE) calculations</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Sensitivity analysis for key project variables</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-sky-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Revenue optimization strategies</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-night-navy">Project Support</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Economic feasibility studies</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">PPA structuring analysis</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-night-navy rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-graphite">Risk assessment and mitigation strategies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-navy-light/5 p-8 rounded-lg border border-navy-light/10">
                  <h3 className="text-xl font-semibold mb-6 text-night-navy">
                    Expertise Areas
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-sky-cyan mb-2">Wind Energy</h4>
                      <p className="text-sm text-graphite">
                        Onshore and offshore wind project economics, including resource assessment 
                        integration, O&M optimization, and grid connection costs.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sky-cyan mb-2">Solar PV</h4>
                      <p className="text-sm text-graphite">
                        Utility-scale solar financial modeling, including technology selection, 
                        tracking systems analysis, and degradation modeling.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sky-cyan mb-2">Hybrid Projects</h4>
                      <p className="text-sm text-graphite">
                        Wind-solar hybrid systems with battery storage, optimizing capacity 
                        ratios and storage sizing for revenue maximization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Call to Action */}
        <div className="mt-24 bg-night-navy/5 rounded-lg p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-night-navy mb-4">
            Ready to accelerate your energy transition?
          </h2>
          <p className="text-lg text-graphite mb-8">
            Let's discuss how our expertise can support your clean energy objectives.
          </p>
          <Button href="/contact" size="large">
            Get in Touch
          </Button>
        </div>

      </div>
    </div>
  );
}
