const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: createSecureHeaders({
        frameGuard: [
          'allow-from', {
            uri: 'https://www.buymeacoffee.com/',
          },
        ],
      }),
    }];
  },
};
