/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: 'verticalatlas.vercel.app',
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
