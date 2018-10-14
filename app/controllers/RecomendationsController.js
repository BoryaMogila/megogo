const similar = require('../../similar');
const qs = require('qs');
const axios = require('axios');
const _ = require('lodash');
const { recomendation } = require('../managers/recomendationManager');


const idsMap = {
  "Драмы": 1,
  "Зарубежные": 2,
  "Военные": 3,
  "Исторические": 4,
  "Комедии": 5,
  "Семейные": 6,
  "Фантастика": 7,
  "Боевики": 8,
  "Криминал": 9,
  "Триллеры": 10,
  "Спортивные": 11,
  "Детективы": 12,
  "Ужасы": 13,
  "Приключения": 14,
  "Мелодрамы": 15,
}

async function indexAction (ctx) {
  let { films = [], geners: queryGeners = [] } = qs.parse(ctx.query);
  queryGeners = queryGeners.map(gener => decodeURI(gener));
  const genres = queryGeners.map(gener => idsMap[gener]);
  const views = await recomendation({genres, films: films.map(Number), userId: 0}) || [];
  const commonSimilar = {};
  films.forEach(id => {
    const sim = similar[id] || [];
    sim.forEach(film => {
      if (films.includes(film.id.toString())) return;
      if (!commonSimilar[film.id]) {
        commonSimilar[film.id] = { range: film.range };
        return
      }
      commonSimilar[film.id].range += film.range;
    });
  });
  views.forEach(({ id, count }) => {
    if (films.includes(id.toString())) return;
    if (!commonSimilar[id]) {
      commonSimilar[id] = { range: count / 20 };
    }
    commonSimilar[id].range += count / 20;
  });
  const resArray = Object.keys(commonSimilar).map(key => {
    return {
      id: key,
      range: commonSimilar[key].range / films.length
    }
  });
  resArray.sort((a, b) => {
    return b.range - a.range
  });
  const promises = resArray.slice(0, 10).map(({ id }) => axios(`http://api.hackathon.media/video/${id}`));
  const videos = await Promise.all(promises).then(r => r.map(f => _.get(f, 'data.data', {})));
  await ctx.render('final', { videos ,
      title: "Кажется, я знаю, что тебя подойдет.",
      description: "...",
      statusButton: "hide"});
}

module.exports = { indexAction };