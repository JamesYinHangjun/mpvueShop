const { mysql } = require("../../mysql")

// 添加搜索历史
// 在搜索框中输入值，然后点击搜索后，就需要把输入的值放到数据库中，以便下次再搜索时，是否有过搜索历史记录
// 如果搜索的值，之前出现在数据库中，就不需要再次添加，如果没出现，则需添加到历史记录中去


// 点击search按钮，将搜索的值放入数据库中，以便于下次再搜索时数据库是否有这个值
// 搜索过的值放入历史记录中(存放历史搜索记录)
async function addHistoryAction(ctx) {
    // ctx.request.body 拿到接口请求时 传递过来的参数
    const {openId, keyword} = ctx.request.body
    
    // 取出之前上一次搜索记录 
    // keyword 搜索框中输入的内容
    // 如果在表中有keyword或者openId，说明表中已经保存了这条数据，就不需要再做第二次保存了
    const oldData = await mysql('nideshop_search_history').where({
      'user_id': openId,   //应该不相等
      'keyword': keyword
    })

    // 如果表中没有这个数据，需要向 nideshop_search_history 表中插入这条数据
    if (oldData.length == 0) {
      const data = await mysql('nideshop_search_history').insert({
        'user_id': openId,
        'keyword': keyword,
        'add_time': parseInt(new Date().getTime() / 1000)
      })
        //插入成功
      if (data) {
        ctx.body = {
          data: 'success'
        }
      } else {
        ctx.body = {
          data: 'fail'
        }
      }
    } else {
      ctx.body = {
        data: '已经有记录了'
      }
    }
  }

//   取出历史数据记录
  async function indexAction(ctx) {
    //   这里用query是因为传参时直接在url后面加上了传递的参数
    const openId = ctx.query.openId
    // 取出默认关键字 is_default：1 是默认热门搜索关键字
    const defaultKeyword = await mysql('nideshop_keywords').where({
      is_default: 1
    }).limit(1).select()
    // 取出热门关键字
    const hotKeywordList = await mysql('nideshop_keywords').distinct('keyword').column('keyword', 'is_hot').limit(10).select()
  
    const historyData = await mysql('nideshop_search_history').where({
      'user_id': openId
    }).limit(10).select()
    ctx.body = {
      'defaultKeyword': defaultKeyword[0],
      'hotKeywordList': hotKeywordList,
      'historyData': historyData
    }
  }
  
  
  // 搜索时匹配搜索相关的内容
  async function helperAction(ctx) {
    const keyword = ctx.query.keyword
    var order = ctx.query.order
    if (!order) {
      order = ''
      orderBy = 'id'
    } else {
      orderBy = 'retail_price'
    }
    const keywords = await mysql('nideshop_goods').orderBy(orderBy, order)
    .column('id', 'name', 'list_pic_url', 'retail_price')
    .where('name', 'like', '%' + keyword + '%').limit(10).select()
    if (keywords) {
      ctx.body = {
        keywords
      }
    } else {
      ctx.body = {
        keywords: []
      }
    }
  }


  // 清除历史记录
async function clearHistoryAction(ctx) {
    const openId = ctx.request.body.openId
    // console.log(openId)
    const data = await mysql('nideshop_search_history').where({
      'user_id': openId
    }).del()
    if (data) {
      ctx.body = {
        'data': '清除成功'
      }
    } else {
      ctx.body = {
        'data': null
      }
    }
  }

  module.exports = {
    indexAction,
    addHistoryAction,
    clearHistoryAction,
    helperAction
  }