import EnergySecurityMap from '@/components/interactive-tools/EnergySecurityMap';

export const metadata = {
  title: 'Global Energy-Security Stress Map',
  description: 'Interactive visualization of energy security risks and vulnerabilities across global markets.',
};

export default function EnergySecurityMapPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto mb-12">
          <nav className="mb-6">
            <ol className="flex text-sm">
              <li className="text-graphite hover:text-sky-cyan">
                <a href="/">Home</a>
              </li>
              <li className="mx-2 text-graphite">/</li>
              <li className="text-graphite hover:text-sky-cyan">
                <a href="/interactive-tools">Interactive Tools</a>
              </li>
              <li className="mx-2 text-graphite">/</li>
              <li className="text-sky-cyan">Energy Security Map</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-night-navy">
            Global Energy-Security Stress Map
          </h1>
          <p className="mt-4 text-lg text-graphite">
            Visualize import dependency, supplier concentration, and geopolitical risk 
            to identify energy security vulnerabilities and optimal hedging strategies.
          </p>
        </div>

        {/* Interactive Map Component */}
        <div className="max-w-6xl mx-auto">
          <EnergySecurityMap />
        </div>

        {/* Tool Information */}
        <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">About This Tool</h2>
          <p className="text-graphite mb-4">
            The Global Energy-Security Stress Map combines multiple indicators to provide a 
            comprehensive view of national vulnerabilities to energy supply disruptions. 
            It helps policymakers, investors, and analysts identify risks and 
            develop appropriate mitigation strategies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Methodology</h3>
              <p className="text-graphite">
                This tool analyzes three key dimensions of energy security risk:
              </p>
              <ul className="mt-2 space-y-2 text-graphite list-disc pl-5">
                <li>
                  <strong>Import Dependency:</strong> The percentage of total energy 
                  consumption that is imported from abroad.
                </li>
                <li>
                  <strong>Supplier Concentration:</strong> The Herfindahl-Hirschman Index (HHI) 
                  measuring the concentration of energy suppliers.
                </li>
                <li>
                  <strong>Geopolitical Risk:</strong> A combined index of political stability 
                  and regulatory risk in supplier countries.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Data Sources</h3>
              <p className="text-graphite">
                The map integrates data from multiple sources:
              </p>
              <ul className="mt-2 space-y-2 text-graphite list-disc pl-5">
                <li>International Energy Agency (IEA) energy balance statistics</li>
                <li>UN Comtrade bilateral trade data for energy commodities</li>
                <li>World Bank Worldwide Governance Indicators</li>
                <li>BP Statistical Review of World Energy</li>
                <li>Proprietary geopolitical risk assessments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}