const qs = require('qs');
const axios = require('axios');
const _ = require('lodash');


async function indexAction (ctx) {
  const { geners: queryGeners = [], text } = qs.parse(ctx.query);
  console.log(text)
  const res = await axios(`http://api.hackathon.media/search?text=${encodeURIComponent(text)}`);
  console.log(res)
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

module.exports = {
  indexAction,
};