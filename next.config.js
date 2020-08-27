module.exports = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/articles/waiting-for-network-resources-in-cypress-c9cb5cca-b5d6-49df-bd30-c8c744bad147',
        destination: '/articles/waiting-for-network-resources-in-cypress'
      }
    ];
  },
};
