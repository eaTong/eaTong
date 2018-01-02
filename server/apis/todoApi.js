const todoServer = require('../services/todoServer');


async function getTodo(ctx) {
  return await todoServer.findAllTodo();
}

async function addTodo(ctx) {
  const data = ctx.request.body;
  return await todoServer.addTodo(data.name);
}

async function toggleTodo(ctx) {
  const data = ctx.request.body;
  return await todoServer.toggleTodo(data._id);
}

module.exports = {getTodo, addTodo, toggleTodo};



