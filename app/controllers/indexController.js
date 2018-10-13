const myDb = require('../managers/testDbManager')



async function indexAction (ctx) {
    let PSP_ID = ctx.cookies.get("PSP_ID")
    if(!PSP_ID){
        let respWebId = await myDb.getWebId();
        if(respWebId && respWebId.insertId){
            ctx.cookies.set("PSP_ID", respWebId.insertId)
        }
    }

 await ctx.render('index');
}

async function userAction(ctx,next){
    await myDb.userData(ctx.query);
    ctx.body = {status:200};
    await next()
}

module.exports = {indexAction,userAction};
