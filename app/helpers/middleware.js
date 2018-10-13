const myDb = require('../managers/testDbManager')

async function middlewarePsp (ctx,next) {

    let PSP_ID = ctx.cookies.get("PSP_ID")
    if(!PSP_ID){
        let respWebId = await myDb.getWebId();
        if(respWebId && respWebId.insertId){
            ctx.cookies.set("PSP_ID", respWebId.insertId)
        }
    }
    await next();
}

module.exports = {middlewarePsp};