const geners = require('../../ganers');

async function indexAction (ctx) {
  console.log(geners)
  await ctx.render('geners', { geners });
}

module.exports = { indexAction };