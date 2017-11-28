/**
 * Created by eatong on 17-11-28.
 */
import User from '../schema/UserSchema';
import MD5 from 'crypto-js/md5';

async function login(account, password) {
  return await User.findOne({account, password: MD5(password).toString()});
}

export default {login}
