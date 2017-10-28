/**
 * Created by eatong on 17-10-24.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from 'util/ajaxUtil';

export default class Task {
  @observable itemList = [];

  @action
  async getTaskList() {
    const a = await ajax('/api/task/get');
    console.log(a);
    // const req = await axios.post('/api/task/get');
    // console.log(req.data.data);
    // this.itemList = req.data.data;
  }

}
