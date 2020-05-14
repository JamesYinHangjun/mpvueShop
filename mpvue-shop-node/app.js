const Koa = require('koa')
const config = require("./config")

// new个实例
const app = new Koa()

// 路由
const router = require("./routes")


app.use(router.routes())

app.listen(config.port, () => {
    console.log(`server is started at port ${config.port}`)
})




// const Koa = require('koa')
// const Router = require('koa-router')

// // new个实例
// const app = new Koa()

// // 路由
// const router = new Router()

// router.get('*', (ctx,next) => {
//     ctx.body = 'hello world'
// })


// app.use(router.routes())

// app.listen(config.port, () => {
//     console.log(`server is started at port ${config.port}`)
// })