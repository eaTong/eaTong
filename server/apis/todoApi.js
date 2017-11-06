import todoServer from '../services/todoServer';

export async function getTodo(ctx) {
  return await todoServer.findAllTodo();
}

export async function addTodo(ctx) {
  const data = ctx.request.body;
  return await todoServer.addTodo(data.name);
}

export async function toggleTodo(ctx) {
  const data = ctx.request.body;
  console.log(ctx.session);
  return await todoServer.toggleTodo(data._id);
}
