const Router = require('koa-router');
const TodoApi = require('./apis/todoApi');
const FormApi = require('./apis/formApi');
const UserApi = require('./apis/userApi');
const FileApi = require('./apis/fileApi');
const BlogApi = require('./apis/blogApi');
const VisitLogApi = require('./apis/visitLogApi');
const {checkArguments} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');


const router = new Router();
//define data structure for all API
router.post('/api/*', async (ctx, next) => {
  if (!/^\/api\/pub/.test(ctx.originalUrl) && ctx.originalUrl !== '/api/user/login') {
    if (!ctx.session.loginUser) {
      ctx.status = 401;
      ctx.body = {success: false, data: {}, message: 'this api is not a public api ,please login'};
      return;
    }
  }

  try {
    const data = await next();
    ctx.body = {success: true, data, message: ''};
  } catch (ex) {
    if (ex instanceof ArgMissError) {
      ctx.status = 400;
      ctx.body = {success: false, data: {}, message: ex.message};
    } else if (ex instanceof LogicError) {
      ctx.status = 200;
      ctx.body = {success: false, data: {}, message: ex.message};

    } else {
      ctx.status = 500;
      ctx.body = {success: false, data: {}, message: ex.message};
    }
  }
});

router.post('/api/pub/todo/get', TodoApi.getTodo);
router.post('/api/pub/todo/add', TodoApi.addTodo);
router.post('/api/pub/todo/toggle', TodoApi.toggleTodo);

router.post('/api/pub/form/list', FormApi.getFormList);
router.post('/api/pub/form/add', checkArguments('text', 'int'), FormApi.addForm);
router.post('/api/pub/form/update', checkArguments(['id', 'text', 'int']), FormApi.updateForm);
router.post('/api/pub/form/delete', checkArguments(['id']), FormApi.deleteForm);
router.post('/api/pub/form/detail', checkArguments(['id']), FormApi.getFormById);

router.post('/api/user/login', checkArguments(['account', 'password']), UserApi.login);

router.post('/api/image/upload', FileApi.uploadImage);

router.post('/api/blog/write', checkArguments(['content', 'title']), BlogApi.writeBlog);
router.post('/api/blog/update', checkArguments(['id', 'title', 'content']), BlogApi.updateBlog);
router.post('/api/blog/list', BlogApi.getBlogList);
router.post('/api/pub/published-blog', BlogApi.getPublishedBlog);
router.post('/api/pub/blog/detail', BlogApi.getBlogById);
router.post('/api/pub/blog/comment', checkArguments(['content', 'blog']), BlogApi.addComment);

router.post('/api/visit-log/list', VisitLogApi.getVisitLogs);

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
