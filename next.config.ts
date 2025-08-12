const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heval-group-rrgaeg144.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "swiperjs.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
