import next from 'next';
import {useStaticRendering} from 'mobx-react';
import Koa from 'koa';
import koaBody from 'koa-body';
import koaLogger from 'koa-logger';
import router from './routers';

const {createLogger, format, transports} = require('winston');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

const logger = createLogger({
  level: 'info',
  transports: dev ? undefined : [
    new transports.File({filename: 'error.log', level: 'error'}),
    new transports.File({filename: 'combined.log'})
  ]
});

useStaticRendering(true);

nextApp.prepare().then(() => {
  const app = new Koa();

  app.use(koaLogger());
  app.use(async (ctx, next) => {
    ctx.logger = logger;
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
