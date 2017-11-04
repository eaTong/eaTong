/**
 * Created by eatong on 17-11-4.
 */
import Todo from '../schema/TodoSchema';

export async function findAllTodo() {
  return await Todo.find();
}

export async function addTodo(name) {
  const todo = new Todo({name, completed: false});
  return await todo.save();
}

export async function toggleTodo(_id) {
  const todo = await Todo.findById(_id);
  // const result = await Todo.update({_id: _id}, {completed: !todo.completed});
  todo.completed = !todo.completed;
  await todo.save();
  return todo;
}

export default {
  findAllTodo, addTodo, toggleTodo
}
