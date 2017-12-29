/**
 * Created by eatong on 17-11-16.
 */
const Blog = require('../schema/BlogSchema');
const {grabContent} = require('../framework/util');

const INFO_LENGTH = 200;

async function writeBlog(data) {
  const blog = new Blog({...data, viewCount: 0});
  blog.info = grabContent(data.content).slice(0, INFO_LENGTH);
  if (data.publish) {
    blog.publishTime = new Date();
    blog.published = true;
    blog.publishedContent = data.content;
  }
  return await blog.save();
}

async function updateBlog(data) {
  const blog = await Blog.findById(data.id);
  blog.title = data.title;
  blog.content = data.content;
  blog.info = grabContent(data.content).slice(0, INFO_LENGTH);
  blog.updateTime = new Date();
  if (data.publish) {
    blog.published = true;
    blog.history = blog.history ? blog.history : [];
    blog.history.push({time: new Date(), commit: data.commit, content: data.content});
    blog.publishedContent = data.content;
  }
  await blog.save();
  return blog;
}

async function getBlogList(published) {
  const filter = published ? {published} : undefined;
  return Blog.find(filter).select('title publishTime info viewCount isMarkdown').sort({publishTime: -1})
}

async function getBlogById(id, countShouldAdd) {
  const blog = await Blog.findById(id);
  if (countShouldAdd) {
    blog.viewCount = blog.viewCount ? blog.viewCount + 1 : 1;
    await blog.save();
  }
  return blog;
}

module.exports = {writeBlog, getBlogList, getBlogById, updateBlog};
