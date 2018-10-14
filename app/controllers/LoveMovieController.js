const qs = require('qs');
const axios = require('axios');
const _ = require('lodash');


async function apiAction (ctx) {
  let { geners: queryGeners = [], text } = qs.parse(ctx.query);
  queryGeners = queryGeners.map(gener => decodeURI(gener));
  console.log(queryGeners)
  console.log(queryGeners)
  const res = await axios(`http://api.hackathon.media/search?text=${encodeURIComponent(decodeURI(text))}`);
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
    ctx.body = videos.slice(0, 12);
    return
  }
  ctx.body = videos.filter((video) => {
    const { genres } = video;
    video.genres = genres.filter(gener => queryGeners.includes(gener));
    return video.genres.length;
  }).slice(0, 12);

}

async function indexAction (ctx) {
  let { geners: queryGeners = [], text } = qs.parse(ctx.query);
  queryGeners = queryGeners.map(gener => decodeURI(gener));
  const res = await axios(`http://api.hackathon.media/video`);
  let videos = _.get(res, 'data.data.video_list', []);
  videos.sort((a, b) => {
    const rangeA = (a.rating_imdb + a.rating_kinopoisk) / 2;
    const rangeB = (b.rating_imdb + b.rating_kinopoisk) / 2;
    return rangeB - rangeA;
  });
  if (queryGeners.length) {
    videos = videos.filter((video) => {
      const { genres } = video;
      video.genres = genres.filter(gener => queryGeners.includes(gener));
      return video.genres.length;
    })
  }
  await ctx.render('love_video', { videos: videos.slice(0, 12), geners: queryGeners });
}

module.exports = {
  apiAction,
  indexAction
};