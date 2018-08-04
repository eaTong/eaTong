
/**
 * Created by eaTong on 2018-04-08 .
 * Description: auto generated in  2018-04-08
 */

const Password = require('../schema/PasswordSchema');

async function addPassword(data) {
  const password = new Password(data);
  await password.save();
  return password;
}

async function updatePassword(data) {
  const password = await Password.findById(data.id);
  Object.assign(password, data);
  await password.save();
  return password;
}

async function getPasswordList() {
  return Password.find()
}

async function deletePassword(id) {
  await Password.findById(id).remove();
}

async function getPasswordById(id) {
  return await Password.findById(id);
}

module.exports = {addPassword, getPasswordList, getPasswordById, updatePassword, deletePassword};
 