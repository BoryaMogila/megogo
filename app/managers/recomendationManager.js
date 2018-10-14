"use strict";

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'elasticsearch.filatium.com'
});

module.exports = {
    /**
     * @param [Number] genres
     * @param [Number] films
     * @param Number userId
     * @returns {Promise<*>}
     */
    recomendation: async function({genres = [], films, userId}) {
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
                                        'film.id': film
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