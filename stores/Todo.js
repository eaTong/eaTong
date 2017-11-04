/**
 * Created by eatong on 17-10-24.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '~util/ajaxUtil';

export default class Todo {
  @observable itemList = [];

  @action
  async addTodo(name) {
    const todo = await ajax('/api/todo/add', {name});
    this.itemList = [...this.itemList, todo];
  }

  @action
  async toggleTodo(index) {
    const todo = await ajax('/api/todo/toggle', {_id: this.itemList[index]._id});
    console.log(todo);
    this.itemList[index] = todo;
  }
}
