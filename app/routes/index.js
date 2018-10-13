const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {indexAction} = require('../controllers/indexController');




const router = new Router();

    router
        .get('/', indexAction);

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};
