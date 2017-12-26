/**
 * Created by eatong on 17-12-9.
 */
const {checkArgument} = require ('../framework/apiDecorator');
const visitLogServer = require ('../services/visitLogServer');


module.exports =class TodoApi {

  static async getVisitLogs(ctx) {
    return await visitLogServer.getVisitLogs();
  }
}



