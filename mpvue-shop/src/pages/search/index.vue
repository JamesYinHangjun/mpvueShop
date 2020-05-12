<template>
  <div class="search">
    <!-- 头部搜索框 -->
    <div class="head">
      <div>
        <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
        <input type="text" confirm-type="search" focus="true" v-model="words" @focus="inputFocus" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
        <img @click="clearInput" class="del" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png" alt="">
      </div>
      <div @click="cancel">取消</div>
    </div>

    <div class="searchtips" v-if="words">
      <div>

      </div>
      <div class="nogoods">暂无此类商品</div>
    </div>

    <!-- 历史记录 -->
    <div class="history">
      <div class="t">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>

      <!-- 存放历史搜索记录 -->
      <div class="cont">
        <div>日视</div>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>

      <div class="cont">
        <div class="active">日视</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get,post } from "../../utils"
export default {
  name: "Search",
  data() {
    return {
      words: "",
      openid: '',
      hotData: [],       // 存放 热门搜索数据
      historyData: [],   // 存放 历史数据
      tipsData: [],
      order: '',
      listData: [],
      nowIndex: 0
    }
  },
  mounted() {
    this.openId = wx.getStorageSync("openId") || ""

    this.getHotData()
  },
  methods: {
    // input搜索框聚焦时,搜索的图片什么的都消失，只剩下输入的搜索的内容
    inputFoucus() {

    },
    // 当在input搜索框输入内容时
    tipsearch() {

    },

    // 当在input搜索框中输入内容，点击键盘上的确认search按钮时 confirm-type="search"
    // 需要做接口请求
    // 添加历史记录
    async searchWords(e) {
      let value = e.currentTarget.dataset.value   // 拿到在input框中输入的内容
      this.words = value || this.words
      const data = await post("/search/addhistoryaction", {   // 存放历史搜索记录
        openId: this.openid,
        keyword: value || this.words
      })

      // 获取历史数据记录，然后展示
      this.getHotData()
    },
    async getHotData (first) {
      const data = await get('/search/indexaction?openId=' + this.openid)
      this.historyData = data.historyData
      this.hotData = data.hotKeywordList
      // console.log(data)
    },

    // 清空搜索框
    clearInput() {
      this.words = ""
    },
    // 取消搜索
    cancel() {

    },
    // 清空所有历史搜索记录
    clearHistory() {

    }
  }
}
</script>

<style lang="less">
@import "./style";
</style>
