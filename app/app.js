const http = require('http'),
    {middlewarePsp} = require('./helpers/middleware')
      Koa = require('koa'),
      config = require('config'),
      err = require('./helpers/error'),
     {routes, allowedMethods}  = require('./routes'),
      app = new Koa();

const render = require('koa-ejs');
const path = require('path');
const serve = require('koa-static');
const mount =  require('koa-mount');

app.use(err);
app.use(routes());
app.use(allowedMethods());
//middleware
app.use(middlewarePsp);

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false,
  debug: false,
});

app.use(mount('/public', serve('./public', {
  // gzip: config.gzip
})));

const server = http.createServer(app.callback()).listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});

module.exports = {
    closeServer() {
        server.close();
    }
};