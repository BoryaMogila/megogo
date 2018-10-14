const geners = require('../../ganers');

async function indexAction (ctx) {
  await ctx.render('geners', { geners,
      title: "Давай выберем предпочитаемы жанр.",
      description: "Или даже несколько.",
      statusButton: "hide" });
}

module.exports = { indexAction };