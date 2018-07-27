
/**
 * Created by eaTong on 2018-27-07 .
 * Description: auto generated in  2018-27-07
 */

const Test = require('../schema/TestSchema');

async function addTest(data) {
  const test = new Test(data);
  await test.save();
  return test;
}

async function updateTest(data) {
  const test = await Test.findById(data.id);
  Object.assign(test, data);
  await test.save();
  return test;
}

async function getTestList() {
  return Test.find()
}

async function deleteTest(id) {
  await Test.findById(id).remove();
}

async function getTestById(id) {
  return await Test.findById(id);
}

module.exports = {addTest, getTestList, getTestById, updateTest, deleteTest};
 