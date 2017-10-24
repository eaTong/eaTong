/**
 * Created by eatong on 17-10-24.
 */
import {observable, action, computed, toJS} from 'mobx';

export default class Task {
  @observable itemList = [
    {name: '123123', id: 0, completed: false}
  ]
}
