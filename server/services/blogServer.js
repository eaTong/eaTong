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
  blog.title = data.title;
  blog.content = data.content;
  blog.updateTime = new Date();
  blog.history = blog.history ? blog.history : [];
  blog.history.push({time: new Date(), commit: data.commit, content: data.content});
  await blog.save();
  return blog;
}

export async function getBlogList() {
  return Blog.find().select('title publishTime')
}

export async function getBlogById(id, operate) {
  const blog = await Blog.findById(id);
  if (operate !== 'edit') {
    blog.viewCount = blog.viewCount ? blog.viewCount + 1 : 1;
    await blog.save();
  }
  return blog;
}

export default {writeBlog, getBlogList, getBlogById, updateBlog}
