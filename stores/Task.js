/**
 * Created by eatong on 17-10-24.
 */
import {observable, action, computed, toJS} from 'mobx';
import axios from 'axios';

export default class Task {
  @observable itemList = [];

  @action
  async getTaskList() {
    const req = await axios.post('/api/task/get');
    console.log(req.data.data);
    this.itemList = req.data.data;
  }

}
