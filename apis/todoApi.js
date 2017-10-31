export async function getTodo(ctx) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  if (!global.todos) {
    global.todos = [
      {id: 0, name: 'first todo', completed: false}
    ];
  }
  return global.todos;
}

export async function addTodo(ctx) {
  const data = ctx.request.body;
  const item = {id: global.todos.length, name: data.name, completed: false};
  global.todos.push(item);
  return item;
}

export async function toggleTodo(ctx) {
  const data = ctx.request.body;
  const index = data.index;
  global.todos[index].completed = !global.todos[index].completed;
  return global.todos[index];
}
