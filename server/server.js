import fs from 'fs';
import os from 'os';
import path from 'path';
import next from 'next';
import {useStaticRendering} from 'mobx-react';
import Koa from 'koa';
import koaBody from 'koa-body';
import cookie from 'koa-cookie';
import session from 'koa-session-store';
import mongoStore from 'koa-session-mongo';
import {createLogger, transports} from 'winston';
import router from './routers';
import {connection} from './mongoConfig';


const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();
//define logger
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

  // app.use(koaLogger());
  app.use(cookie());
//define mongo session storage...
  app.use(session({
    name: 'eaTong-session-id',
    signed: true,
    overwrite: true,
    store: mongoStore.create({mongoose: connection})
  }));
  app.keys = ['key for eaTong'];
  //inject logger to ctx
  app.use(async (ctx, next) => {
    ctx.logger = logger;
    await next();
  });

  //use koaBody to resolve data
  app.use(koaBody({multipart: true}));


  app.use(async function (ctx, next) {
    // ignore non-POSTs
    if ('POST' !== ctx.method) return await next();

    const file = ctx.request.body.files.file;
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
    reader.pipe(stream);
    console.log('uploading %s -> %s', file.name, stream.path);

    ctx.redirect('/');
  });
//all routes just all API
  app.use(router.routes());

  // /admin pages need to check login
  router.get('/admin*', async (ctx, next) => {
    if (!ctx.session.loginUser) {
      ctx.redirect('/login');
    } else {
      await next();
    }
  });

  //next handle all router
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`)
  });
});
