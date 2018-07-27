
/**
 * Created by eaTong on 2018-27-07 .
 * Description: auto generated in  2018-27-07
 */

const {LogicError} = require("../framework/errors");
const {addTest , updateTest , deleteTests , getTestList , getTestById} = require('../services/TestService');
const BaseApi = require('../framework/BaseApi');


class TestApi extends BaseApi {
  static async addTest(ctx) {
    return await addTest(ctx.request.body);
  }

  static async updateTest(ctx) {
    return await updateTest(ctx.request.body);
  }

  static async deleteTests(ctx) {
    return await deleteTests(ctx.request.body.ids);
  }

  static async getTestList(ctx) {
    const {pageIndex = 0, pageSize = 20} = ctx.request.body;
    return await getTestList(pageIndex, pageSize);
  }

  static async getTestById(ctx) {
    return await getTestById(ctx.request.body);
  }

}

module.exports = TestApi;
  