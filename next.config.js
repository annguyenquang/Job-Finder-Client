// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/viec-lam',
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-platform.99static.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: false // Don't allow Next.js to run with TypeScript errors
  }
}
