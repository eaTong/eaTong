/**
 * Created by eatong on 17-11-16.
 */
const Form = require('../schema/FormSchema');
const Comment = require('../schema/CommentSchema');
const {grabContent, getKeywords} = require('../framework/util');

async function writeForm(data) {
  const form = new Form(data);
  await form.save();
  return form;
}

async function updateForm(data) {
  const form = await Form.findById(data.id);
  Object.assign(form, data);
  await form.save();
  return form;
}

async function getFormList() {
  return Form.find()
}

async function deleteForm(id) {
  await Form.removeById(id);
}

async function getFormById(id) {
  return await Form.findById(id).populate('comments');
}

module.exports = {writeForm, getFormList, getFormById, updateForm, deleteForm};
