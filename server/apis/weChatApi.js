/**
 * Created by eatong on 18-4-26.
 */
const sha1 = require('sha1');
const config = require('../config');
const queryString = require('query-string');


async function auth(ctx) {
  const body = queryString.parse(ctx.req._parsedUrl.query);

  const token = config.wechat.token;
  const signature = body.signature;
  const nonce = body.nonce;
  const timestamp = body.timestamp;
  const echostr = body.echostr;
  const str = [token, timestamp, nonce].sort().join(''); //按字典排序，拼接字符串
  const sha = sha1(str); //加密
  ctx.body = (sha === signature) ? 'success' : 'failed';
  console.log(ctx.body);
  ctx.res.statusCode = 200;

}

module.exports = {auth};
