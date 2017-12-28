/**
 * Created by eatong on 17-12-28.
 */

const {ArgMissError} = require('./errors');

module.exports.checkArguments = (args) => {
  return async (ctx, next) => {
    if (args) {
      const bodyKeys = Object.keys(ctx.request.body);
      if (typeof args === 'string') {
        if (bodyKeys.indexOf(args) === -1) {
          throw(new ArgMissError(args));
        }
      } else {
        for (let arg of args) {
          if (bodyKeys.indexOf(arg) === -1) {
            throw(new ArgMissError(arg));
          }
        }
      }
    }
    await next();
  }
};
