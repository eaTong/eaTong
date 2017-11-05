import Router from 'koa-router';

import {getTodo, addTodo, toggleTodo} from './apis/todoApi';

const router = new Router();

router.post('/api/*', async (ctx, next) => {
  try {
    ctx.res.statusCode = 200;
    const result = await next();
    ctx.body = {success: true, data: result, message: ''};
  } catch (ex) {
    ctx.body = {success: false, data: {}, message: ex};
  }
});

router.post('/api/todo/get', getTodo);
router.post('/api/todo/add', addTodo);
router.post('/api/todo/toggle', toggleTodo);


router.post('/api/*', async ctx => {
  ctx.statusCode = 404;
  ctx.body = 'api not found';
});

export default router;
