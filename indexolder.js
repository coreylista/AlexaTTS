'use strict';

const scrape = require('website-scraper');
const sendHeaders = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
  'accept-language': 'en-US,en;q=0.9',
  'upgrade-insecure-requests': 1,
  'content-type': 'text/plain;charset=UTF-8',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'origin': 'https://www.amazon.com'
};
const amazonBaseURL = 'amazon.com';
const referer = `https://www.${amazonBaseURL}/ap/signin/`;
const amazonURL = `https://www.${amazonBaseURL}`;
const alexaURL = `https://alexa.${amazonBaseURL}`;
const bodyParams = {};


const scrapeIt = require("scrape-it")

const myFunction = async () => {
  return await scrapeIt("https://nmotw.in", {
      tagLine: ".tagline"
    })
}
myFunction().then(res => console.log(res));

scrape({
  urls: [alexaURL],
  directory: '/tmp',
  request: {
    headers: sendHeaders
    },
sources:[
  {
    selector: 'img',
    attr: 'src'
  },
  {
    selector: 'input[type="hidden"]',
    attr: 'value'
  }
]
})
  .then(console.log)
  .catch(console.log);
