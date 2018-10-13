const myDb = require('../managers/testDbManager');

async function indexAction (ctx) {
 await ctx.render('index');
}

module.exports = {indexAction};
