/**
 * Created by eatong on 17-11-16.
 */
import {checkArgument} from '../framework/apiDecorator';
import blogServer from '../services/blogServer';
import visitLogServer from "../services/visitLogServer";


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
    const {body} = ctx.request;
    const readBlog = ctx.session.readBlog || {};
    const blogHasRead = !!readBlog[body.id];
    const userAgent = ctx.req.headers['user-agent'];
    if (!blogHasRead) {
      readBlog[body.id] = true;
      ctx.session.readBlog = readBlog;
    }
    const isSpider = /(Googlebot)|(Baiduspider)/.test(userAgent);
    return await blogServer.getBlogById(body.id, body.operate !== 'edit' && !blogHasRead && !isSpider);
  }

  @checkArgument('id')
  static async deleteBlog(ctx) {

  }
}
