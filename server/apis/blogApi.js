/**
 * Created by eatong on 17-11-16.
 */
import {checkArgument} from '../framework/apiDecorator';
import blogServer from '../services/blogServer';


export default class BlogApi {


  @checkArgument(['title', 'content'])
  static async writeBlog(ctx) {
    return await blogServer.writeBlog(ctx.request.body);
  }

  static async getBlog(ctx){
    return await blogServer.getBlog();
  }
}
