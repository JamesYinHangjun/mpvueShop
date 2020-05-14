<template>
  <div class="index">
    <!-- 头部搜索框 -->
    <div class="search">
      <!-- 点击跳转到地图界面 -->
      <div @click="toMapPage">{{cityName}}</div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品">
        <span class="icon"></span>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item,index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url"></image>
          </swiper-item>
        </block>
      </swiper>
    </div>

    <!-- channel -->
    <div class="channel">
        <div v-for="(item, index) in channel" :key="index" @click="categotyList(item.id)">
          <img :src="item.icon_url" alt="">
          <p>{{item.name}}</p>
        </div>
    </div>

    <!-- 商品部分brand -->
    <div class="brand">
      <div class="head" @click="tobrandList">
        品牌制造商直供
      </div>
      <div class="content">
        <div v-for="(item,index) in brandList" :key="index" @click="brandDetail(item.id)">
          <div>
            <p>{{item.name}}</p>
            <p>{{item.floor_price}}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="">
        </div>
      </div>
    </div>

    <!-- 新品首发 -->
    <div class="newgoods">
      <div class="newgoods-top" @click='goodsList("new")'>
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>

      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>

    <!-- 人气推荐 -->
    <div class="newgoods hotgoods">
      <div class="newgoods-top" @click="goodsList('hot')">
        <div class="top">
          <p>
            人气推荐
            <span></span>
            好物精选
          </p>
          <p>查看全部</p>
        </div>
      </div>

      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>

    <!-- 专题精选 -->
    <div class="topicList">
      <!-- 头部 -->
      <div class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>

      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item, index) in topicList" :key="index" @click="topicdetail(item.id)">
              <img :src="item.item_pic_url" alt="">
              <div class="btom">
                <div>
                  <p>{{item.title}}</p>
                  <p>{{item.subtitle}}</p>
                </div>
                <div>{{item.price_info}}元起</div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>

    <!-- 居家好物等 -->
    <div class="newcategory">
      <div class="list" v-for="(item, index) in newCategoryList" :key="index">
        <div class="head">{{item.name}}好物</div>

        <div class="sublist">
          <div v-for="(subitem, subindex) in item.goodsList" :key="subindex">
            <img :src="subitem.list_pic_url" alt="">
            <p>{{subitem.name}}</p>
            <p>{{subitem.retail_price}}</p>
          </div>
          <div>
            <div class="last">
              <p>{{item.name}}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx'
import { mapState,mapMutations } from 'vuex'
import { get } from "../../utils"
export default {
  data() {
    return {
      // cityName: '杭州'
      banner: [],     // 存放轮播图的数据
      channel: [],
      brandList: [],   // 商品商标
      newGoods: [],     // 存放所有的新品
      hotGoods: [],      // 存放 人气推荐的商品
      topicList: [],     // 专题精选
      newCategoryList: []    // 好物
    }
  },
  computed: {
    ...mapState(['cityName'])
  },
  mounted () {
    this.getCityName()
    // 请求数据
    this.getData()
  },
  methods: {
    ...mapMutations(['update']),
    // 跳转到地图界面
    toMapPage() {
      let _this = this

      // 通过 wx.getSetting 先查询一下 用户是否授权 'scoped.record'
      // wx.getSetting 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
      wx.getSetting({
        // 接口调用成功的回调函数
        success: (result) => {
          // 接口调用成功，再判断是否授权
          console.log(result)

          // 如果没有授权，打开设置 (wx.openSetting)
          if(!result.authSetting['scope.userLocation']) {
            wx.openSetting({
              success: (result) => {
                //打开设置成功后 获取授权位置信息
                console.log(result)

                // 使用高德地图获取位置信息
                _this.getCityName()
              },
              fail: (err) => {
                console.log(err)
              },
              complete: () => {}
            });
          } else {
            // 已经授权
            wx.navigateTo({
              url: '/pages/mappage/main'
            });
          }
        },
        // 接口调用失败的回调函数
        fail: (err) => {
          console.log(err)
        },
        // 接口调用结束的回调函数（调用成功、失败都会执行
        complete: () => {}
      });

    },
    // 点击input搜索框,跳转到search搜索页面
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      })
    },
    // 打开设置，获取授权位置信息(调用高德地图)
    getCityName() {
      let _this = this
      var myAmapFun = new amapFile.AMapWX({key:'ea59573dc6b616f07af8669aa560d68d'});
      myAmapFun.getRegeo({
        success: function(data) {
          // 成功回调
          console.log(data)
        },
        fail: function(info) {
          // 失败回调 获取地理位置失败，返回一个默认的城市
          // _this.cityName = '杭州'
          _this.update({cityName: '杭州'})
        }
      })
    },
    // 点击channel跳转
    categoryList(id) {
      wx.navigateTo({
        url: "/pages/categoryList/main?id=" + id
      })
    },
    // 点击商品，进入商品详情页
    brandDetail(id) {
      wx.navigateTo({
        url: "/pages/brandDetail/main?id=" + id
      })
    },
    // 点击"品牌制造商直供"，跳转到pages/brandList/main
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandList/main"
      })
    },
    // 点击查看全部，跳到详情
    goodsList(info) {
      if( info === "hot") {
        wx.navigateTo({
          url: '/pages/newgoods/main?isHot=' + 1
        })
      } else {
        wx.navigateTo( {
          url: '/pages/newgoods/main?isNew=' + 1
        })
      }
    },
    // 点击进入主题精选 详情
    topicdetail( id ) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      })
    },

    // 获取数据
    async getData() {
      const data = await get("/index/index") // 后端必须有 http://localhost:5757/lm/index/index
      console.log(data)
      this.banner = data.banner
      this.channel = data.channel
      this.brandList = data.brand
      this.newGoods = data.newGoods
      this.hotGoods = data.hotGoods
      this.topicList = data.topicList
      this.newCategoryList = data.newCategoryList
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>


// 逻辑：
//   // 如果当前这个小程序打开过(已经授权过)，只需点击城市去到mappage页面即可
//     如果当你打开小程序时，弹出是否允许获取当前位置，如果点击不允许，是需要我们授权打开的

// wx.getSetting() 获得设置，如果调用成功，再判断是否有授权过，
// 如果没有授权，调用wx.openSetting()打开设置(打开设置，必须要获得授权位置信息)
// 如果授权过了，直接跳转到mappage页面


// 开发Bug:
// 开发mappage页面时，无法显示 => 因为没有对应的index.vue.wxml文件
// 解决: 重启 npm run dev


// 首页只显示四条is_new是1的四条商品数据
// 如果想看其他商品信息的话，点击“品牌制造商直供”(pages/brandList/main)查看
