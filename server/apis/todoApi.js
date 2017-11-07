import {checkArgument} from '../framework/apiDecorator';
import todoServer from '../services/todoServer';


class TodoApi {

  static async getTodo(ctx) {
    return await todoServer.findAllTodo();
  }

  static async addTodo(ctx) {
    const data = ctx.request.body;
    return await todoServer.addTodo(data.name);
  }

  static async toggleTodo(ctx) {
    const data = ctx.request.body;
    return await todoServer.toggleTodo(data._id);
  }
}

export default TodoApi;


