/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: '/',
        destination: '/about',
        permanent: true,
      },
    ]
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/articles",
  //       destination: "/",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
