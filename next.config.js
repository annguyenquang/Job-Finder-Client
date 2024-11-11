// next.config.js
module.exports = {
    images : {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'images-platform.99static.com',
            port: '',
            pathname: "**"
        }]
    },
    typescript: {
        ignoreBuildErrors: false, // Don't allow Next.js to run with TypeScript errors
    },
};
