module.exports = {
  webpack: (config, { isServer }) => {
      if (!isServer) {
          // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
          config.resolve.fallback = {
              fs: false
          }
          config.module.rules.push({
            test: /\.mp3$/,
            use: {
              loader: 'file-loader',
            },
          });
      }

      return config;
  }
}
