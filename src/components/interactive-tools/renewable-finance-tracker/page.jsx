import RenewableFinanceTracker from '@/components/interactive-tools/RenewableFinanceTracker';

export const metadata = {
  title: 'Renewable Finance Sentiment Tracker',
  description: 'Track financing costs, investment flows, and market sentiment for renewable energy projects globally.',
};

export default function RenewableFinanceTrackerPage() {
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
              <li className="text-sky-cyan">Renewable Finance Tracker</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-night-navy">
            Renewable Finance Sentiment Tracker
          </h1>
          <p className="mt-4 text-lg text-graphite">
            Monitor financing trends, capital costs, and investment flows for renewable energy
            technologies across key global markets with adjustable policy scenarios.
          </p>
        </div>

        {/* Interactive Finance Tracker Component */}
        <div className="max-w-6xl mx-auto">
          <RenewableFinanceTracker />
        </div>

        {/* Tool Information */}
        <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">About This Tool</h2>
          <p className="text-graphite mb-4">
            The Renewable Finance Sentiment Tracker provides insights into the evolving cost of capital
            and investment flows for clean energy technologies. The tool allows users to explore
            different policy scenarios, hedging strategies, and regional variations to better understand
            financing dynamics in the energy transition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Key Metrics</h3>
              <ul className="mt-2 space-y-2 text-graphite list-disc pl-5">
                <li>
                  <strong>Weighted Average Cost of Capital (WACC):</strong> The blended cost of
                  debt and equity for financing renewable energy projects.
                </li>
                <li>
                  <strong>Investment Flows:</strong> Total capital deployed for project development
                  and asset financing.
                </li>
                <li>
                  <strong>Policy Impact:</strong> The effect of incentives, subsidies, and regulatory
                  frameworks on financing costs.
                </li>
                <li>
                  <strong>Currency Hedge Costs:</strong> Additional financing costs for currency risk
                  mitigation in cross-border investments.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Applications</h3>
              <p className="text-graphite">
                This tool can be used by:
              </p>
              <ul className="mt-2 space-y-2 text-graphite list-disc pl-5">
                <li>Investors assessing entry points and market timing</li>
                <li>Project developers optimizing capital structure and financing strategies</li>
                <li>Policymakers evaluating the impact of support mechanisms</li>
                <li>Researchers analyzing market trends and financing barriers</li>
                <li>Financial institutions benchmarking financing terms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}