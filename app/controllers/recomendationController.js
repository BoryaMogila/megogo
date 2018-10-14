var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'elasticsearch.filatium.com'
});

async function indexAction(ctx, next) {
    ctx.body = {};

    ctx.query.genres = ctx.query.genres || [];
    ctx.query.films = ctx.query.films || [];

    if (Number(ctx.query.genres)) {
        ctx.query.genres = [Number(ctx.query.genres)];
    }

    if (Number(ctx.query.films)) {
        ctx.query.films = [Number(ctx.query.films)];
    }

    let
        userId = ctx.query.userId || 0,
        genres = ctx.query.genres.map(Number),
        films = ctx.query.films.map(Number)
    ;

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
                    // should: genres.map(genre => {
                    //     return {
                    //         term: {
                    //             'film.genres.id': genre
                    //         }
                    //     }
                    // }),
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
        filmsHash[view.film.id] = view.film;
    }

    for (let film of films) {
        delete filmsHash[film.id];
    }

    films = Object.values(filmsHash);

    ctx.body = films.map(film => {
        return {
            id: film.id,
            name: film.name
        }
    });

    await next();
}

module.exports = {
    indexAction
};
