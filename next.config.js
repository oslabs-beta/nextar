// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['flagsapi.com'], // Add 'flagsapi.com' to the list of allowed domains
    },
    env: {
      timezoneKey: '02f249b24b414f5388a66cbd0152c747'
    }
  };
  
  module.exports = nextConfig;
  