/**
 * Created by eaTong on 2018-04-08 .
 * Description: auto generated in  2018-04-08
 */

const Password = require('../schema/PasswordSchema');
const {mongoose} = require('../mongoConfig');

async function addPassword(data) {
  // data.enable = true;
  const password = new Password(data);
  password.enable = true;
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
  return Password.find({enable: true})
}

async function deletePasswords(id) {
  const result = await Password.find({id: {$in: id}});
  await Password.update({id: {$in: id}}, {enable: false});
}

async function getPasswordById(id) {
  return await Password.findById(id);
}

module.exports = {addPassword, getPasswordList, getPasswordById, updatePassword, deletePasswords};
