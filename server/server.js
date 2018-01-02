const path = require('path');
const next = require('next');
const {useStaticRendering} = require('mobx-react');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaConnect = require('koa-connect');
const compression = require('compression');
const cookie = require('koa-cookie').default;
const koaLogger = require('koa-logger');
const session = require('koa-session-store');
const mongoStore = require('koa-session-mongo');
const {createLogger, transports} = require('winston');
const router = require('./routers');
const {connection} = require('./mongoConfig');
const staticCache = require('koa-static-cache');
const serve = require('koa-static');
const visitLogServer = require('./services/visitLogServer');
const {getBrowserInfo, getIpInfo} = require('./framework/util');
const routes = require('../page-routes');

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
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
//use compression
  app.use(koaConnect(compression()));
  // app.use(koaLogger());
  app.use(cookie());
  app.use(serve('.next/static'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true
  });
  app.use(staticCache(path.join(__dirname, 'static'), {
    maxAge: 365 * 24 * 60 * 60
  }));
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
    const startTime = new Date().getTime();
    await next();
    const {body} = ctx.request;
    const url = body.pageUrl || ctx.originalUrl;
    if (url.indexOf('.') === -1 && !/\/admin/.test(url) && !body.__server) {
      const userAgent = ctx.req.headers['user-agent'],
        browserInfo = getBrowserInfo(userAgent),
        ip = ctx.req.headers['x-forwarded-for'] || ctx.request.ip,
        log = {
          url,
          ip,
          userAgent: userAgent,
          spentTime: new Date().getTime() - startTime,
          version: browserInfo.version,
          browser: browserInfo.browser,
        };
      await visitLogServer.addVisitLog(log);
    }
  });

  //use koaBody to resolve data
  app.use(koaBody({multipart: true}));
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

  const handler = routes.getRequestHandler(nextApp);
  app.use(ctx => {
    ctx.respond = false;
    ctx.res.statusCode = 200; // because koa defaults to 404
    handler(ctx.req, ctx.res)
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`)
  });
});
