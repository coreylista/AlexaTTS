const talkback = require("talkback");

const opts = {
  host: "https://alexa.amazon.com",
  port: 5555,
  path: "./my-tapes"
};
const server = talkback(opts);
server.start(() => console.log("Talkback Started"));
//server.close();
