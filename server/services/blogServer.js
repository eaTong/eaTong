/**
 * Created by eatong on 17-11-16.
 */
import Blog from '../schema/BlogSchema';

export async function writeBlog(data) {
  const blog = new Blog({...data, viewCount: 0, publishTime: new Date()});
  return await blog.save();
}

export async function updateBlog(data) {
  const blog = await Blog.findById(data.id);
  console.log(blog);
  blog.title = data.title;
  blog.content = data.content;
  blog.updateTime = new Date();
  await blog.save();
  return blog;
}

export async function getBlogList() {
  return Blog.find().select('title publishTime')
}

export async function getBlogById(id) {
  return Blog.findById(id);
}

export default {writeBlog, getBlogList, getBlogById, updateBlog}
