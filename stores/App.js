/**
 * Created by eatong on 17-10-28.
 */
import {observable, action, computed, toJS} from 'mobx';

export default class App {
  @observable loadingCount = 0;

  @action
  loading() {
    this.loadingCount++;
  }

  @action
  cancelLoading() {
    this.loadingCount = this.loadingCount > 0 ? 0 : this.loadingCount--;
  }
}
