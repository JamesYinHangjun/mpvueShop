const { mysql } = require("../../mysql")

module.exports = async (ctx) => {
    //轮播图数据
    // nideshop_ad是表名
    const banner = await mysql("nideshop_ad").where({
        ad_position_id: 1
    }).select()

    // channel部分 tab类型
    const channel = await mysql("nideshop_channel").select()

    // brand 商品列表部分
    // is_new 最新的产品
    const brand = await mysql("nideshop_brand").where({
        is_new: 1
    }).orderBy('new_sort_order', 'asc').limit(4).select()

    // 新品首发 部分
    const newGoods = await mysql('nideshop_goods').whereIn("id",[1181000, 1135002, 1134030, 1134032]).andWhere("is_new", 1).select()

    // 人气推荐
    const hotGoods = await mysql("nideshop_goods").column("id", "name", "list_pic_url", "retail_price", "goods_brief").where({
        is_hot: 1
    }).limit(5).select()

    // 专题精选
    const topicList  = await mysql("nideshop_topic").limit(3).select()

    // 好物  类别列表
    const categoryList = await mysql("nideshop_category").where({
        parent_id: 0
    }).select()

    const newCategoryList = []

    for (let i = 0; i < categoryList.length; i++) {
        let item = categoryList[i]
        let childCategoryIds = await mysql('nideshop_category').where({
          parent_id: item.id
        }).column('id').select()
        // 变成数组的形式 [1020000, 1036002]
        childCategoryIds = childCategoryIds.map((item) => {
          return item.id
        })
        // 在商品中找到在childCategoryIds里的7条数据
        const categoryGoods = await mysql('nideshop_goods').column('id', 'name', 'list_pic_url', 'retail_price').whereIn('category_id', childCategoryIds).limit(7).select()
        newCategoryList.push({
          'id': item.id,
          'name': item.name,
          'goodsList': categoryGoods
        })
      }

    ctx.body = {
        "banner": banner,
        "channel": channel,
        "brand": brand,
        "newGoods": newGoods,
        "hotGoods": hotGoods,
        "topicList": topicList,
        "newCategoryList": newCategoryList
    }
}