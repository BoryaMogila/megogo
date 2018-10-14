"use strict";

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'elasticsearch.filatium.com'
});

let _map = {
    1: 1,
    2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    "3": 2,
    "4": 16,
    "5": 4,
    "6": 6,
    "7": 9,
    "8": 3,
    "9": 11,
    "10": 12,
    "12": 12,
    "13": 10,
    "14": 5,
    "15": 15
};

module.exports = {
    /**
     * @param [Number] genres
     * @param [Number] films
     * @param Number userId
     * @returns {Promise<*>}
     */
    recomendation: async function({genres = [], films, userId}) {
        let newGenres = [];

        for (let genre of genres) {
            if (_map[Number(genre)]) {
                if (Number(_map[Number(genre)])) {
                    newGenres.push(Number(_map[Number(genre)]));
                } else {
                    newGenres = [...newGenres, ..._map[Number(genre)]]
                }
            }
        }

        genres = newGenres;

        let views = await client.search({
            index: 'views',
            type: 'views',
            body: {
                query: {
                    match: {
                        'user.id': userId
                    }
                },
                size: 10000
            }
        }).then(resp => {
            return resp.hits.hits.map(hits => hits._source);
        });

        let otherViews = await client.search({
            index: 'views',
            type: 'views',
            body: {
                size: 10000,
                query: {
                    bool:
                        {
                            should: genres.map(genre => {
                                return {
                                    term: {
                                        'film.genres.id': genre
                                    }
                                }
                            }),
                            must: films.map(film => {
                                return {
                                    term: {
                                        'film.megogoId': film
                                    }
                                }
                            })
                        }
                }
            }
        }).then(resp => {
            return resp.hits.hits.map(hits => hits._source);
        });

        let filmsHash = {};
        for (let view of otherViews) {
            if (!filmsHash[view.film.id]) {
                filmsHash[view.film.id] = view.film;
                filmsHash[view.film.id].count = 1;
            } else {
                filmsHash[view.film.id].count++;
            }
        }

        for (let film of films) {
            delete filmsHash[film.id];
        }

        films = Object.values(filmsHash);

        return films.map(film => {
            return {
                id: film.megogoId,
                name: film.name,
                count: film.count
            }
        });
    }
};