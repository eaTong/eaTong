/**
 * Created by eatong on 17-11-28.
 */
const User = require ('../schema/UserSchema');
const MD5 = require ('crypto-js/md5');

async function login(account, password) {
  return await User.findOne({account, password: MD5(password).toString()});
}

module.exports ={login}
