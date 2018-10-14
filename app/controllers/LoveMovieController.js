const qs = require('qs');
const axios = require('axios');
const _ = require('lodash');


async function apiAction (ctx) {
  const { geners: queryGeners = [], text } = qs.parse(ctx.query);
  const res = await axios(`http://api.hackathon.media/search?text=${encodeURIComponent(text)}`);
  if (!queryGeners.length) {
    ctx.body = _.get(res, 'data.data.video_list', []);
    return
  }
  ctx.body = (_.get(res, 'data.data.video_list', [])).filter(({ genres }) => {
    let includes = false;
    genres.forEach(gener => {
      if (queryGeners.includes(gener)) includes = true;
    });
    return includes;
  });

}

async function indexAction (ctx) {
    await ctx.render('index');
}

module.exports = {
  apiAction,
  indexAction
};