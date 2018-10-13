const myDb = require('../managers/testDbManager')

async function middlewarePsp (ctx,next) {

    let PSP_ID = ctx.cookies.get("psp_id")
    if(!PSP_ID){
        let respWebId = await myDb.getWebId();
        if(respWebId && respWebId.insertId){
            ctx.cookies.set("psp_id", respWebId.insertId,{ httpOnly: false })
        }
    }
    await next();
}

module.exports = {middlewarePsp};