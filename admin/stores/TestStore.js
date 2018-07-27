
/**
 * Created by eaTong on 2018-27-07 .
 * Description: auto generated in  2018-27-07
 */

import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore'

export default class TestStore extends BaseStore {
  listApi = '/api/test/get';
  addApi = '/api/test/add';
  updateApi = '/api/test/update';
  deleteApi = '/api/test/delete';
  detailApi = '/api/test/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}