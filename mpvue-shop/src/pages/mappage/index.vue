<template>
  <div class="mappage">
    <!-- 搜索框 -->
    <div class="section">
      <!-- 绑定input事件，每次修改都会触发bindInput方法 -->
      <input type="text" placeholder="城市搜索" focus="true" v-model="keywords" @input="bindInput">
    </div>

    <!-- 存放 输入的地点显示出来的相关的地方 -->
    <scroll-view :scroll-y="true" class="addcont" style="height:500rpx">
      <div class="result" v-for="(item, index) in tips" :key = "index" @touchstart="getCity(item.name)">
        {{item.name}}
      </div>
    </scroll-view>

    <!-- 地图：显示自己的实时位置 -->
    <div class="map_container">
      <div class="title">显示当前位置:</div>
      <map class="map" id="map" scale="16" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx"
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      tips: [],
      longitude: 0,  //中心经度
      latitude: 0,   // 中心纬度
      markers: [],
      keywords: ''   //输入框中的关键字
    }
  },
  mounted() {
    // 页面初始化时 获取地理位置
    this.getMapAddress();
  },
  methods: {
    ...mapMutations(['update']),    //从mapMutations中解构出update
    // 获取地理位置信息
    getMapAddress() {
      let _this = this
      var myAmapFun = new amapFile.AMapWX({key:'ea59573dc6b616f07af8669aa560d68d'});
      myAmapFun.getRegeo({
        iconPath: "/static/images/marker.png",
        iconWidth:22,
        iconHeight: 32,
        success: function(data){
          //成功回调
          console.log(data)
          let marker = [
            {
              id: data[0].id,
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              width: data[0].width,
              height: data[0].height
            }
          ]

          _this.markers = marker
          _this.longitude = data[0].longitude
          _this.latitude = data[0].latitude
        },
        fail: function(info){
          //失败回调
          console.log(info)
        }
      })
    },
    // 在搜索框中输入时
    bindInput(e) {
      console.log(e)
      // 高德地图中的 获取输入提示字 输入补全
      let _this = this
      // 这个keywords是上面输入框双向绑定的值，是输入框中输入的值
      let keywords = _this.keywords
      var myAmapFun = new amapFile.AMapWX({key: 'ea59573dc6b616f07af8669aa560d68d'})
      myAmapFun.getInputtips({
        // 高德地图下的 获取输入提示词那一项
        keywords: keywords,
        location: '',
        success: function(data){
          console.log(data)
          if(data && data.tips){
            _this.tips = data.tips
          }
        }
      })
    },
    // 点击搜索出来的地点，使当前的位置(index/index.vue)变更为其城市
    getCity(cityName) {
      this.update({cityName: cityName})
      wx.navigateBack({
        delta: 1     // 1 表示返回上一个页面
      });

    }
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
