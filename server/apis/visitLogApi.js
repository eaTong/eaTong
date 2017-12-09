/**
 * Created by eatong on 17-12-9.
 */
import {checkArgument} from '../framework/apiDecorator';
import visitLogServer from '../services/visitLogServer';


export default class TodoApi {

  static async getVisitLogs(ctx) {
    return await visitLogServer.getVisitLogs();
  }
}



