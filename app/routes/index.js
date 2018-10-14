const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {indexAction,userAction} = require('../controllers/indexController');
const LoveMovie = require('../controllers/LoveMovieController');
const SelectGener = require('../controllers/SelectGenerController');

const router = new Router();

    router
        .get('/', indexAction)
        .get('/user', userAction)
        .get('/select-gener', SelectGener.indexAction)
        .get('/api/love-movie-search', LoveMovie.apiAction)
        .get('/love-movie-search', LoveMovie.indexAction)
    ;

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};
