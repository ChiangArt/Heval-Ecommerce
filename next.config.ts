const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'heval-group-rrgaeg144.s3.amazonaws.com', // sin us-east-2
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'swiperjs.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
