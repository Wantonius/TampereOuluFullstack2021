const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app) {
	app.use("/api",createProxyMiddleware({
		target:"http://localhost:3001",
		changeOrigin:true
	}));
	app.use("/register",createProxyMiddleware({
		target:"http://localhost:3001",
		changeOrigin:true
	}));
	app.use("/login",createProxyMiddleware({
		target:"http://localhost:3001",
		changeOrigin:true
	}));
	app.use("/logout",createProxyMiddleware({
		target:"http://localhost:3001",
		changeOrigin:true
	}));	
	app.use("/hoclog",createProxyMiddleware({
		target:"http://localhost:3002",
		changeOrigin:true
	}));

}