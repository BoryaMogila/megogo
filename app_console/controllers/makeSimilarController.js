const axios = require('axios');
const _ = require('lodash');
const fs = require('fs');

async function index () {
  console.time('similar');
  const res = await axios('http://api.hackathon.media/video');
  let videosArr = _.get(res, 'data.data.video_list', []);
  videosArr = await Promise.all(videosArr.map(async ({ id }) => {
    const res = await axios(`http://api.hackathon.media/video/${id}`);
    return _.get(res, 'data.data', {});
  }));
  const similar = {}
  const iterate = videosArr.map(async video => {
    similar[video.id] = await setRange({video, videosArr});
  });
  await Promise.all(iterate);
  const res1 = fs.writeFileSync('./similar.json', JSON.stringify(similar));
  console.log(res1)
  console.timeEnd('similar');
}

async function setRange ({ video: { id, country, genres, people, year }, videosArr }) {
  const arr  = videosArr.filter(video => video.id !== id).map(video => Object.assign({}, video));
  const similar = arr.map(video => {
    video.range = video.country === country ? 0.3 : 0;
    video.range += video.year === year ? 0.2 : 0;
    video.range += (video.rating_imdb + video.rating_kinopoisk) / 2 / 10;
    const genreRange = 1 / video.genres.length;
    video.genres.forEach(genre => {
      if (genres.includes(genre)) video.range += genreRange;
    });
    const persons = video.people.filter(({ type }) => ['ROLE', 'PRODUCER'].includes(type))
    const peopleRange = 1 / persons.length;
    persons.forEach(person => {
      const ids = people.map(({ id }) =>  id);
      if (ids.includes(id)) video.range += peopleRange;
    });
    return { id: video.id, range: video.range };
  })
  similar.sort((a, b) => {
    return b.range - a.range
  })
  return similar;
}

module.exports = { index };