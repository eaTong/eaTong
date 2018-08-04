const Router = require('koa-router');
const {checkArguments} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');

const TodoApi = require('./apis/todoApi');
const FormApi = require('./apis/formApi');
const UserApi = require('./apis/userApi');
const FileApi = require('./apis/fileApi');
const BlogApi = require('./apis/blogApi');
const WeChatApi = require('./apis/weChatApi');
const VisitLogApi = require('./apis/visitLogApi');
const TestApi = require('./apis/TestApi');
const PasswordApi = require('./apis/PasswordApi');
//UPDATE_TAG:importApi

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

router.post('/api/pub/*', async (ctx, next) => {
  ctx.header[`Access-Control-Allow-Origin`] = '*';
  ctx.header[`Access-Control-Allow-Methods`] = 'POST';

  ctx.set(`Access-Control-Allow-Origin`, '*');
  ctx.set(`Access-Control-Allow-Methods`, 'POST');
  return await next();
});

router.post('/api/pub/wechat/auth', WeChatApi.auth);
router.get('/api/pub/wechat/auth', WeChatApi.auth);

router.post('/api/pub/todo/get', TodoApi.getTodo);
router.post('/api/pub/todo/add', TodoApi.addTodo);
router.post('/api/pub/todo/toggle', TodoApi.toggleTodo);

router.post('/api/pub/form/get', FormApi.getFormList);
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

router.post('/api/test/add',checkArguments(['name']), TestApi.addTest);
router.post('/api/test/get', TestApi.getTestList);
router.post('/api/test/update', checkArguments(['id', 'name']), TestApi.updateTest);
router.post('/api/test/delete',  checkArguments(['ids']), TestApi.deleteTests);  
router.post('/api/test/detail',  checkArguments(['id']), TestApi.getTestById); 

router.post('/api/password/add',checkArguments(['name']), PasswordApi.addPassword);
router.post('/api/password/get', PasswordApi.getPasswordList);
router.post('/api/password/update', checkArguments(['id', 'name']), PasswordApi.updatePassword);
router.post('/api/password/delete',  checkArguments(['ids']), PasswordApi.deletePasswords);  
router.post('/api/password/detail',  checkArguments(['id']), PasswordApi.getPasswordById); 
//UPDATE_TAG:defineRouter

router.post('/api/visit-log/list', VisitLogApi.getVisitLogs);


router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
