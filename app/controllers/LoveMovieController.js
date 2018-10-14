const qs = require('qs');
const axios = require('axios');
const _ = require('lodash');


async function apiAction (ctx) {
  const { geners: queryGeners = [], text } = qs.parse(ctx.query);
  const res = await axios(`http://api.hackathon.media/search?text=${encodeURIComponent(text)}`);
  let videos = _.get(res, 'data.data.video_list', []);
  if (!videos.length) {
    const res = await axios(`http://api.hackathon.media/video`);
    videos = _.get(res, 'data.data.video_list', []);
    videos.sort((a, b) => {
      const rangeA = (a.rating_imdb + a.rating_kinopoisk) / 2;
      const rangeB = (b.rating_imdb + b.rating_kinopoisk) / 2;
      return rangeB - rangeA;
    })
  }
  if (!queryGeners.length) {
    ctx.body = videos;
    return
  }
  ctx.body = videos.filter(({ genres }) => {
    let includes = false;
    genres.forEach(gener => {
      if (queryGeners.includes(gener)) includes = true;
    });
    return includes;
  }).slice(0, 12);

}

async function indexAction (ctx) {
  const { geners: queryGeners = [], text } = qs.parse(ctx.query);
  const res = await axios(`http://api.hackathon.media/video`);
  let videos = _.get(res, 'data.data.video_list', []);
  videos.sort((a, b) => {
    const rangeA = (a.rating_imdb + a.rating_kinopoisk) / 2;
    const rangeB = (b.rating_imdb + b.rating_kinopoisk) / 2;
    return rangeB - rangeA;
  });
  console.log(videos)
  await ctx.render('love_video', { videos: videos.slice(0, 12) });
}

module.exports = {
  apiAction,
  indexAction
};