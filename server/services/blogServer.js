/**
 * Created by eatong on 17-11-16.
 */
import Blog from '../schema/BlogSchema';

export async function writeBlog(data) {
  const blog = new Blog({...data, viewCount: 0, publishTime: new Date()});
  return await blog.save();
}

export async function getBlog() {
  return Blog.find().select('title publishTime')
}

export default {writeBlog, getBlog}
