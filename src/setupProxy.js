const { createProxyMiddleware } = require('http-proxy-middleware');

const backendTarget = process.env.REACT_APP_PROXY_TARGET || 'http://localhost:3000';

module.exports = function setupProxy(app) {
  app.use(
    ['/posts', '/users'],
    createProxyMiddleware({
      target: backendTarget,
      changeOrigin: true,
    })
  );
};
