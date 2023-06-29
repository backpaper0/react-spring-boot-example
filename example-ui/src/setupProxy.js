const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:8080',
        onProxyReq: (proxyReq, req, res, options) => {
            // Server-Sent Eventsを使えるようにする
            if (req.accepts().includes("text/event-stream")) {
                req.headers["accept-encoding"] = "identity";
            }
        }
    }));
};
