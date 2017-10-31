import next from 'next';
import {useStaticRendering} from 'mobx-react';
import Koa from 'koa';
import koaBody from 'koa-body';
import router from './routers';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

useStaticRendering(true);

nextApp.prepare().then(() => {
  const app = new Koa();

  app.use(async (ctx, next) => {
    const result = await next();
    if (ctx.req.method === 'POST') {
      ctx.body = {success: true, data: result, message: ''};
    }
    ctx.res.statusCode = 200;
  });
  app.use(koaBody());

  app.use(router.routes());
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false
  });


  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`)
  });
});
