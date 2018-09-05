
/*
const talkback = require("talkback");

const opts = {
  host: "https://alexa.amazon.com",
  port: 5555,
  path: "./my-tapes"
};
const server = talkback(opts);
server.start(() => console.log("Talkback Started"));
//server.close();
*/
const extend = require('util')._extend
const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});


proxy.on('proxyRes', function(proxyRes, req, res, options) {
  //console.log(proxyRes.connection._host);
  if (proxyRes.connection._host === 'www.amazon.com') {
    proxyRes.target = 'https://www.amazon.com'
  }
  // I can find the host name using proxyReq variable,
});


const server = http.createServer(function(req, res) {

  // Need to figure out if its a call to alexa.amazon.com or www.amazon.com and change the target
  let targetSite = 'https://alexa.amazon.com';

//let targetSite = 'https://www.amazon.com';

 proxy.web(req, res, {
   target: targetSite,
    secure: false,
    changeOrigin: true,
    protocolRewrite: true,
    followRedirects: true
});

  //console.log(res.connection.parser);

/*
  for (const item in res) {
console.log(item);
  }
  */

});
console.log("listening on port 8080")
server.listen(8080);


//
// Create a proxy server with custom application logic
//
/*
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, {
    target: 'https://alexa.amazon.com'
  });
});

console.log("listening on port 5050")
server.listen(8080);

*/
