
/**
 * Created by eaTong on 2018-04-08 .
 * Description: auto generated in  2018-04-08
 */

const {LogicError} = require("../framework/errors");
const {addPassword , updatePassword , deletePasswords , getPasswordList , getPasswordById} = require('../services/PasswordService');
const BaseApi = require('../framework/BaseApi');


class PasswordApi extends BaseApi {
  static async addPassword(ctx) {
    return await addPassword(ctx.request.body);
  }

  static async updatePassword(ctx) {
    return await updatePassword(ctx.request.body);
  }

  static async deletePasswords(ctx) {
    return await deletePasswords(ctx.request.body.ids);
  }

  static async getPasswordList(ctx) {
    const {pageIndex = 0, pageSize = 20} = ctx.request.body;
    return await getPasswordList(pageIndex, pageSize);
  }

  static async getPasswordById(ctx) {
    return await getPasswordById(ctx.request.body);
  }

}

module.exports = PasswordApi;
  