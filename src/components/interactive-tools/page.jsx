import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Interactive Tools',
  description: 'Explore our interactive data-driven tools for energy security analysis and renewable finance tracking.',
};

export default function InteractiveToolsPage() {
  // Tool descriptions
  const tools = [
    {
      title: 'Global Energy-Security Stress Map',
      description: 'Explore global patterns of energy security vulnerability through import dependency, supplier concentration, and geopolitical risk indicators.',
      image: '/images/tools/energy-security-map.jpg',
      href: '/interactive-tools/energy-security-map',
    },
    {
      title: 'Renewable-Finance Sentiment Tracker',
      description: 'Track financing trends, capital costs, and investment flows for renewable energy technologies across key global markets.',
      image: '/images/tools/renewable-finance.jpg',
      href: '/interactive-tools/renewable-finance-tracker',
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-night-navy">
            Interactive Tools
          </h1>
          <p className="mt-4 text-xl text-graphite">
            Data-driven applications for energy transition analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <div 
              key={tool.title}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              {/* Tool Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Tool Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3">
                  {tool.title}
                </h2>
                
                <p className="text-graphite mb-4">
                  {tool.description}
                </p>

                <Link
                  href={tool.href}
                  className="inline-block bg-sky-cyan text-white px-6 py-2 rounded-md font-medium hover:bg-sky-cyan/90 transition-colors"
                >
                  Launch Tool
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}