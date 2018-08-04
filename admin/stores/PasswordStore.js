
/**
 * Created by eaTong on 2018-04-08 .
 * Description: auto generated in  2018-04-08
 */

import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore'

export default class PasswordStore extends BaseStore {
  listApi = '/api/password/get';
  addApi = '/api/password/add';
  updateApi = '/api/password/update';
  deleteApi = '/api/password/delete';
  detailApi = '/api/password/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}