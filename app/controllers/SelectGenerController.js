const geners = require('../../ganers');

async function indexAction (ctx) {
  await ctx.render('geners', { geners });
}

module.exports = { indexAction };