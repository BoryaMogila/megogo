const axios = require('axios');
const _ = require('lodash');
const fs = require('fs');
const testDbManager = require('../../app/managers/testDbManager')

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
  fs.writeFileSync('./similar.json', JSON.stringify(similar, null, '\t'));
  const genres = _.uniq(_.flatten(videosArr.map(({ genres })=> genres)));
  const genresObject = {};
  genres.forEach((genre, i) => genresObject[i + 1] = { name: genre})
  fs.writeFileSync('./ganers.json', JSON.stringify(genresObject, null, '\t'));
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

// cd /var/www/megogo; /usr/bin/node --harmony ./console.js --section makeSimilar --action setInDB
async function setInDB () {
   var jsonUsersView = JSON.parse(fs.readFileSync('./similar.json'))
        _.map(jsonUsersView, async function (intem,key) {
           let userId = key
           await testDbManager.userDataTest({
               login: "parse",
               user_id:userId
           })
           _.map(jsonUsersView[key], function(item_i){

               // console.log(item_i)
               return
           })
           return;
       })
    process.exit();
}


module.exports = { index , setInDB};