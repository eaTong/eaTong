/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import TestStore from './TestStore';
import PasswordStore from './PasswordStore';
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
test: new TestStore(),
password: new PasswordStore(),
//UPDATE_TAG:registerStore
}
