export async function getTask(ctx, next) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  if (!global.tasks) {
    global.tasks = [
      {id: 0, name: 'first task', completed: false}
    ];
  }
  ctx.body = global.tasks;
  return global.tasks;
}

export async function addTask(ctx, next) {

}
