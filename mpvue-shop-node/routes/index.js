const router = require('koa-router')({
    prefix: '/lm'
})
// const router = new Router()

const controllers = require("../controllers/index")

 // 从数据库中获取数据返回给前端
//  首页相关的接口
router.get('/index/index', controllers.home.index)

// /pages/search/ 搜索相关的接口
router.get('/search/indexaction', controllers.search.index.indexAction)  //获取历史搜索记录
router.post('/search/addhistoryaction', controllers.search.index.addHistoryAction)
router.post('/search/clearhistoryAction', controllers.search.index.clearHistoryAction) // 清除搜索历史
router.get('/search/helperaction', controllers.search.index.helperAction) // 搜索提示

module.exports = router