"use strict";

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

/**
 * @module controllers/defaultController @module controllers/defaultController
 */
async function index () {
    let peopleUrl = `https://letterboxd.com/people/popular/`;
    for (let page = 0; page < 1000; page++) {
        let resp = await axios(`${peopleUrl}${page > 0 ? `page/${page}/` : ''}`);
        const $ = cheerio.load(resp.data);
        for (let i = 0; i < $('.avatar.-a40').length; i++) {
            await parsePeople({url: $($('.avatar.-a40')[i]).attr('href')});
        }
    }
}

async function parsePeople({url}) {
    let resp = await axios(`https://letterboxd.com${url}`);
    let $ = cheerio.load(resp.data);
    let
        location = $('.has-icon.icon-16.icon-location').text(),
        twitter = $('.has-icon.icon-16.icon-twitter').attr("href")
    ;

    console.log(location, twitter);

    process.exit();

    resp = await axios(`https://letterboxd.com${url}films/diary/`);
    $ = cheerio.load(resp.data);
    let items = $('.diary-entry-row');
    for (let i = 0; i < items.length; i++) {
        let $ = cheerio.load(items[i]);
        await parseRewiew({url: $('.headline-3.prettify a').attr('href')});
    }
}

async function parseRewiew({url}) {

    let resp = await axios(`https://letterboxd.com${url}`);
    const $ = cheerio.load(resp.data);

    let
        date = $('[itemprop="datePublished"]').attr("content"),
        rating = $('[itemprop="ratingValue"]').attr("content"),
        name = $('[itemprop="name"]').text(),
        link = $('h2 a[itemprop="sameAs"]').attr("href")
    ;

    console.log(date, rating, name, link);

    process.exit();


}

module.exports = {index};


