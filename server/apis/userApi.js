/**
 * Created by eatong on 17-11-7.
 */
const {checkArgument} = require ('../framework/apiDecorator');
const {LogicError} = require ('../framework/errors');
const userServer = require ('../services/userServer');

module.exports =class UserApi {

 // @checkArgument(['account', 'password'])
  static async login(ctx) {
    const data = ctx.request.body;
    const user = await userServer.login(data.account, data.password);
    if (user) {
      ctx.session.loginUser = data;
      return true;
    } else {
      throw (new LogicError('账号或密码错误'));
    }
  }
}
