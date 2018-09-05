
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

const http = require('http');
const httpProxy = require('http-proxy');
const httpProxyRules = require('http-proxy-rules');
const proxy = httpProxy.createProxyServer({});
const regEx = new RegExp(/\/ap\//);

/*
proxy.on('proxyRes', function(proxyRes, req, res, options) {
  //console.log(proxyRes.connection._host);
  if (proxyRes.connection._host === 'www.amazon.com') {
    proxyRes.target = 'https://www.amazon.com'
  }
  // I can find the host name using proxyReq variable,
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  //console.log(proxyRes.connection._host);
  if (proxyReq.connection._host === 'www.amazon.com') {
    proxyReq.target = 'https://www.amazon.com';
  }
  // I can find the host name using proxyReq variable,
});
*/
const server = http.createServer(function(req, res) {

  let theTarget = 'https://alexa.amazon.com';

  if (regEx.exec(req.url) !== null) {
    console.log(req.url);
    theTarget = 'https://www.amazon.com';
  }


  proxy.web(req, res, {
   target: theTarget,
   secure: false,
   changeOrigin: true,
   protocolRewrite: true,
   followRedirects: true,
   cookieDomainRewrite: {
     "localhost": "amazon.com",
   }
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
