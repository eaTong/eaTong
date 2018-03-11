/**
 * Created by eatong on 17-11-16.
 */
const blogServer = require('../services/blogServer');
const visitLogServer = require('../services/visitLogServer');

async function writeBlog(ctx) {
  return await blogServer.writeBlog(ctx.request.body);
}

async function updateBlog(ctx) {
  return await blogServer.updateBlog(ctx.request.body);
}

async function addComment(ctx) {
  return await blogServer.addComment(ctx.request.body);
}

async function getBlogList(ctx) {
  return await blogServer.getBlogList();
}

async function getPublishedBlog(ctx) {
  const published = true;
  return await blogServer.getBlogList(published);
}

async function getBlogById(ctx) {
  const {body} = ctx.request;
  const readBlog = ctx.session.readBlog || {};
  const blogHasRead = !!readBlog[body.id];
  const userAgent = ctx.req.headers['user-agent'];
  if (!blogHasRead) {
    readBlog[body.id] = true;
    ctx.session.readBlog = readBlog;
  }
  const isSpider = /(Googlebot)|(Baiduspider)|(360Spider)|(360JK)/.test(userAgent);
  return await blogServer.getBlogById(body.id, body.operate !== 'edit' && !blogHasRead && !isSpider);
}


module.exports = {writeBlog, updateBlog, getBlogList, getPublishedBlog, getBlogById, addComment};
