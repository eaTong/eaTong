/**
 * Created by eatong on 17-11-7.
 */
const {LogicError} = require('../framework/errors');
const userServer = require('../services/userServer');


async function login(ctx) {
  const data = ctx.request.body;
  const user = await userServer.login(data.account, data.password);
  if (user) {
    ctx.session.loginUser = data;
    return true;
  } else {
    throw (new LogicError('账号或密码错误'));
  }
}

module.exports = {login};
