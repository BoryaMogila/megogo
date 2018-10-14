const similar = require('../../similar');
const qs = require('qs');
const axios = require('axios');
const _ = require('lodash');


async function indexAction (ctx) {
  let { films = [], geners: queryGeners = [] } = qs.parse(ctx.query);
  queryGeners = queryGeners.map(gener => decodeURI(gener));
  const commonSimilar = {};
  console.log(films)
  films.forEach(id => {
    const sim = similar[id];
    sim.forEach(film => {
      if (films.includes(film.id.toString())) return;
      if (!commonSimilar[film.id]) {
        commonSimilar[film.id] = film.range;
        return
      }
      commonSimilar[film.id].range += film.range;
    });
  });
  const resArray = Object.keys(commonSimilar).map(key => {
    return {
      id: key,
      range: commonSimilar[key] / films.length
    }
  });
  resArray.sort((a, b) => {
    return b.range - a.range
  });
  const promises = resArray.slice(0, 10).map(({ id }) => axios(`http://api.hackathon.media/video/${id}`));
  const videos = await Promise.all(promises).then(r => r.map(f => _.get(f, 'data.data', {})));
  await ctx.render('final', { videos });
}

module.exports = { indexAction };