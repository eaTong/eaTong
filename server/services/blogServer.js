/**
 * Created by eatong on 17-11-16.
 */
const Blog = require('../schema/BlogSchema');
const {grabContent, getKeywords} = require('../framework/util');
const {insertUrlToSitemap} = require('./sitemapServer');

const INFO_LENGTH = 200;

async function writeBlog(data) {
  const blog = new Blog({...data, viewCount: 0});
  blog.info = grabContent(data.content).slice(0, INFO_LENGTH);
  if (data.publish) {
    blog.publishTime = new Date();
    blog.published = true;
    blog.publishedContent = data.content;
    blog.keywords = getKeywords(blog.content);
  }
  await blog.save();
  if (data.publish) {
    await insertUrlToSitemap('/blog/' + blog._id.toString());
  }
  return blog;
}

async function updateBlog(data) {
  const blog = await Blog.findById(data.id);
  blog.title = data.title;
  blog.content = data.content;
  blog.info = grabContent(data.content).slice(0, INFO_LENGTH);
  blog.updateTime = new Date();
  if (data.publish) {
    if (!blog.published) {
      await insertUrlToSitemap('/blog/' + blog._id.toString());
    }
    blog.published = true;
    blog.publishedContent = data.content;
    blog.publishTime = new Date();
    blog.keywords = getKeywords(blog.content);
  }
  await blog.save();
  return blog;
}

async function getBlogList(published) {
  const filter = published ? {published} : undefined;
  return Blog.find(filter).select('title publishTime info viewCount isMarkdown published keywords').sort({publishTime: -1})
}

async function getBlogById(id, countShouldAdd) {
  const blog = await Blog.findById(id);
  if (countShouldAdd && blog) {
    blog.viewCount = blog.viewCount ? blog.viewCount + 1 : 1;
    await blog.save();
  }
  return blog;
}

module.exports = {writeBlog, getBlogList, getBlogById, updateBlog};
