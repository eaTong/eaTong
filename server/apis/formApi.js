/**
 * Created by eatong on 17-11-16.
 */
const formServer = require('../services/formServer');

async function addForm(ctx) {
  return await formServer.writeForm(ctx.request.body);
}

async function updateForm(ctx) {
  return await formServer.updateForm(ctx.request.body);
}

async function deleteForm(ctx) {
  return await formServer.deleteForm(ctx.request.body.id);
}

async function getFormList(ctx) {
  return await formServer.getFormList();
}

async function getFormById(ctx) {
  const {body} = ctx.request;
  return await formServer.getFormById(body.id);
}


module.exports = {addForm, updateForm, getFormList, getFormById, deleteForm};
