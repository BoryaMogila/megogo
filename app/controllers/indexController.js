const myDb = require('../managers/testDbManager'),
    _ = require('lodash'),
      axios = require("axios");



async function indexAction (ctx) {
    var popularFimsResp = await axios(`http://api.hackathon.media/video`);
    popularFimsResp = popularFimsResp.data.data.video_list;
    var popularFims = []
    _.map(popularFimsResp, function (item) {
        if(item.year && item.year == 2018){
            popularFims.push({id: item.id, image: item.image, year: item.year, title: item.title, genres: item.genres,href: `https://megogo.net/ru/view/${item.id}` })
        }
        return popularFims
    })

    let PSP_ID = ctx.cookies.get("psp_id")

    if(!PSP_ID){
        let respWebId = await myDb.getWebId();
        if(respWebId && respWebId.insertId){
            ctx.cookies.set("psp_id", respWebId.insertId,{ httpOnly: false })
        }
    }


 await ctx.render('index',{popularFims: popularFims,
     title: "Ищите что посмотреть?",
     description: "Я - Йцукенг.\n" +
         "\t\t\t\tПодберу фильм вместо Тебя.",
     statusButton: ""
 });
}

async function userAction(ctx,next){
    var respUserid = await myDb.userData(ctx.query);
    console.log(respUserid,"respUserid")
    if(respUserid && !ctx.cookies.get("user_id", respUserid.insertId)){
        if(respUserid.serverStatus==2){
           let respUserData = _.first(await myDb.getUserData(ctx.query));
           console.log(respUserData,"respUserData.user_id")
            respUserid.insertId = respUserData.user_id ? respUserData.user_id : respUserid.insertId
            console.log(respUserid.insertId,"respUserData.user_id")
        }
        ctx.cookies.set("user_id", respUserid.insertId,{ httpOnly: false })
    }
    ctx.body = {status:200};
    await next()
}

module.exports = {indexAction,userAction};
