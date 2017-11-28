/**
 * Created by eatong on 17-11-16.
 */
import Blog from '../schema/BlogSchema';
import {grabContent} from '../framework/util';

const INFO_LENGTH = 200;

export async function writeBlog(data) {
  const blog = new Blog({...data, viewCount: 0, publishTime: new Date()});
  blog.info = grabContent(data.content).slice(0, INFO_LENGTH);
  return await blog.save();
}

export async function updateBlog(data) {
  const blog = await Blog.findById(data.id);
  blog.title = data.title;
  blog.content = data.content;
  blog.info = grabContent(data.content).slice(0, INFO_LENGTH);
  blog.updateTime = new Date();
  blog.history = blog.history ? blog.history : [];
  blog.history.push({time: new Date(), commit: data.commit, content: data.content});
  await blog.save();
  return blog;
}

export async function getBlogList() {
  return Blog.find().select('title publishTime info viewCount')
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
