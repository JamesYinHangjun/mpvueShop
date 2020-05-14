# mpvue-shop

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



```
前后端协作开发：
基于mpvue+koa实现的网易严选小程序 less
主要页面:首页、专题、分类、购物车、我的

授权wx.getSeting
使用高德地图(amap-wx)实时定位、搜索补全 轮播图
vuex存储城市

封装接口请求方法utils/index.js
在页面中请求数据=>需要到后端进行操作接口



使用koa2实现后端项目提供接口给我们前端使用
node定义接口，操作数据库，打通前后端逻辑

MVC模式： app.js routes controllers
controller 控制层(控制不同的功能需要用到的代码)
1)在app.js中使用koa定义接口

<!-- 数据在nodejs下的nodemysql数据库中 -->
连接mysql: mysql -u root -p
      show databases;   显示所有数据库
      creare database nodemysql;   创建数据库
      use nodemysql;     切换到nodemysql数据库

2）数据库导入数据
3）将后端和数据库连接
  config.js 一些基础配置
  mysql.js 连接线程池等一系列操作
      knex是辅助mysql进行线程池连接的
        npm i knex
        使用：见 npmjs.com/package/knex




顺序:
    app.js => routes/index.js => controllers
    config.js => mysql.js => app.js(引入端口) => config.js
```
