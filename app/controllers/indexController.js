const myDb = require('../managers/testDbManager'),
    _ = require('underscore'),
      axios = require("axios");



async function indexAction (ctx) {
    console.log("sdasdasdasd")
    var popularFimsResp = await axios(`http://api.hackathon.media/video`);
    popularFimsResp = popularFimsResp.data.data.video_list;
    var popularFims = []
    _.map(popularFimsResp, function (item) {
        if(item.year && year == 2018){
            popularFims.push({id: item.id, image: item.image, year: item.year, title: item.title})
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
    //http://api.hackathon.media/video
 ctx.body = popularFims
 await ctx.render('index');
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
