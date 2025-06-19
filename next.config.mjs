/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.pexels.com"],
        
    },
    eslint: {
  ignoreDuringBuilds: false
},
  typescript: {
    ignoreBuildErrors: true, 
  },

};



export default nextConfig;
