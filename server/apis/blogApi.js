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

  @checkArgument(['id', 'title', 'content'])
  static async updateBlog(ctx) {
    return await blogServer.updateBlog(ctx.request.body);
  }

  static async getBlogList(ctx) {
    return await blogServer.getBlogList();
  }

  static async getBlogById(ctx) {
    return await blogServer.getBlogById(ctx.request.body.id, ctx.request.body.operate);
  }

  @checkArgument('id')
  static async deleteBlog(ctx) {

  }
}
