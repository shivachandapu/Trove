const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // You can specify the path you want to proxy, e.g., '/api' or '/'
    createProxyMiddleware({
      target: 'http://127.0.0.1:5001', // Replace with your IPFS server URL
      changeOrigin: true,
    })
  );
};
