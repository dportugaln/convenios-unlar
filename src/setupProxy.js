const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/convenios/1.0/rest/convenios', // Adjust the path to match your API endpoint
    createProxyMiddleware({
      target: 'https://convenios.unlar.edu.ar',
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        // Add your authorization headers here
        proxyReq.setHeader('Authorization', 'Basic ' + Buffer.from('react_user:nuevaClave').toString('base64'));
      },
    })
  );
};
