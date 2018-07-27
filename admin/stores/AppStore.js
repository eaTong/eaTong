/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";


export default class AppStore {
  @observable ajaxCount = {};

  @action
  async login(values) {
    return await ajax({data: values, url: '/api/user/login'});
  }

  @action
  ajaxStart(url) {
    const ajaxCount = {...this.ajaxCount};
    ajaxCount[url] = ajaxCount[url] ? ajaxCount[url] + 1 : 1;
    this.ajaxCount = ajaxCount;
  }

  @action
  ajaxEnd(url) {
    const ajaxCount = {...this.ajaxCount};
    ajaxCount[url] = ajaxCount[url] - 1;
    this.ajaxCount = ajaxCount;
  }

}
