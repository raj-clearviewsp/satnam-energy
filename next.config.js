/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Old addresses from the previous site, kept alive so existing links still land somewhere useful.
  async redirects() {
    return [
      { source: '/insights', destination: '/#work', permanent: false },
      { source: '/insights/green-hydrogen-india', destination: '/reports/ORF-GH2.pdf', permanent: false },
      { source: '/insights/green-fertilizer-kenya', destination: '/reports/AHP%20Conference%20Presentation.pdf', permanent: false },
      { source: '/insights/green-fertilizer-brazil', destination: '/reports/Fertilizer%20Roundtable%20Presentation.pdf', permanent: false },
      { source: '/insights/e-saf-sarep', destination: '/reports/e-saf-sarep.pdf', permanent: false },
      { source: '/insights/:slug', destination: '/#work', permanent: false },
      { source: '/services', destination: '/', permanent: false },
      { source: '/about', destination: '/#about', permanent: false },
      { source: '/case-studies', destination: '/#work', permanent: false },
      { source: '/interactive-tools', destination: '/#work', permanent: false },
      { source: '/interactive-tools/:slug', destination: '/#work', permanent: false },
    ];
  },
};

module.exports = nextConfig;
