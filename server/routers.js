import Router from 'koa-router';
import TodoApi from './apis/todoApi';
import UserApi from './apis/userApi';
import FileApi from './apis/fileApi';
import BlogApi from './apis/blogApi';
import {ArgMissError , LogicError} from './framework/errors';


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

router.post('/api/todo/get', TodoApi.getTodo);
router.post('/api/todo/add', TodoApi.addTodo);
router.post('/api/todo/toggle', TodoApi.toggleTodo);

router.post('/api/user/login', UserApi.login);

router.post('/api/image/upload', FileApi.uploadImage);

router.post('/api/blog/write', BlogApi.writeBlog);
router.post('/api/blog/update', BlogApi.updateBlog);
router.post('/api/pub/blog/list', BlogApi.getBlogList);
router.post('/api/pub/blog/detail', BlogApi.getBlogById);

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

export default router;
