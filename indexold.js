'use strict';

const util = require('util');
const reqCaptcha = require('request');
const Request = util.promisify(require('request'));
const cookieJar = Request.jar();
const request = Request.defaults({ jar: cookieJar, forever: true });
const path = require('path');
const fs = require('fs');
const regEx = new RegExp(/<input\s(?=[^>]*type=["'\s]?hidden["'\s]?)(?=[^>]*name=["'\s]?([^"'\s]+))(?=[^>]*value=["'\s]?([^"'\s]+)["'\s]?)/, 'ig');
const regExCap = new RegExp(/<img\s(?=[^>]*id=["'\s]?auth-captcha-image["'\s]?)(?=[^>]*src=["'\s]?([^"'\s]+))/, 'ig');
const sendHeaders = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
  'accept-language': 'en-US,en;q=0.9',
  'upgrade-insecure-requests': 1,
  'content-type': 'text/plain;charset=UTF-8',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'origin':'https://www.amazon.com'
};
const amazonBaseURL = 'amazon.com';
const referer = `https://www.${amazonBaseURL}/ap/signin/`;
const amazonURL = `https://www.${amazonBaseURL}`;
const alexaURL = `https://alexa.${amazonBaseURL}`;
const bodyParams = {};

async function runMe(email, password) {

  let captcha;
  let match;

  try {
    // make first call to set cookies
    await request({ url: alexaURL, headers: sendHeaders });
    // make second call and store hidden for posting
    const req1 = await request({
      url: alexaURL,
      headers: sendHeaders
    });

    while ((match = regEx.exec(req1.body)) !== null) {
      bodyParams[match[1]] = match[2];
    }

    sendHeaders['referer'] = referer + JSON.parse(JSON.stringify(cookieJar))._jar.cookies.find(cookie => cookie.key === 'session-id').value;
    bodyParams['email'] = email;
    bodyParams['password'] = password;
    bodyParams['rememberMe'] = true;

    reqCaptcha
      .post(amazonURL + req1.request.path)
      .headers(sendHeaders)
      .jar(cookieJar)
      .form(bodyParams)


    const req2 = await request({
      url: amazonURL + req1.request.path,
      headers: sendHeaders,
      method: 'post',
      form: bodyParams
    });

    match = regExCap.exec(req2.body);
    if (match !== null) {
      captcha = match[1];

      while ((match = regEx.exec(req2.body)) !== null) {
        bodyParams[match[1]] = match[2];
      }
    }

    const captchaImage = await request({ url: captcha, headers: sendHeaders }); //.pipe(fs.createWriteStream('captcha.jpg'))
    console.log(captchaImage);

    //console.log(captcha);
    //const captchaImage = await request({ url: captcha, headers: sendHeaders });


  } catch (e) {
    console.error(e);
  }
}

runMe('coreylista@mac.com', 'IforgetAddy67');

/*
function firstCall() {
  unirest
    .get(nextURL)
    .headers(sendHeaders)
    .jar(cookieJar)
    .end(function(response) {
      secondCall();
    });
}

function secondCall() {
  unirest
  .get(nextURL)
  .headers(sendHeaders)
  .jar(cookieJar)
  .end(function(response) {
    nextURL = `https://www.amazon.com${response.request.path}`;
    let match;
    while ((match = regEx.exec(response.body)) !== null) {
      bodyParams[match[1]] = match[2];
    }
    cookieJar.getCookies('.amazon.com').forEach(cookies => {
      cookies
        .toString()
        .split(';')
        .forEach(cookie => {
          if (cookie.match(/session-id=/)) {
            referer += cookie.replace('session-id=', '');
          }
        });
    });

    sendHeaders['Referer'] = referer
    sendHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    bodyParams['email'] = 'coreylista@mac.com';
    bodyParams['password'] = 'IforgetAddy67';
    bodyParams['rememberMe'] = true;

    thirdCall();
  });
}

function thirdCall() {
  unirest
  .post(nextURL)
  .headers(sendHeaders)
  .send(bodyParams)
  .jar(cookieJar)
    .end(function(response) {
    let match = regExCap.exec(response.body);
      if (match !== null) {
        captcha = match[1];

        while ((match = regEx.exec(response.body)) !== null) {
          bodyParams[match[1]] = match[2];
        }
      }
      unirest.get(captcha);
      const buffer = Buffer.from(captcha, 'utf8');
      fs.writeFileSync(path.join(__dirname, buffer + '.jpg'));
    //console.log(captcha);
  });
}

firstCall();
*/
