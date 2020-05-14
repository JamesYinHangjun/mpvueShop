// 获取基础配置
const configs = require("./config")

// 线程池的链接
// knex 见 npmjs.com/package/knex
var knex = require("knex") ({
    client: 'mysql',
    connection: {
        host: configs.mysql.host,
        port: configs.mysql.port,
        user: configs.mysql.user,
        password: configs.mysql.pass,
        database: configs.mysql.db
    }
})

// 将基础配置和sdk.config合并 导出初始化完成的sdk
module.exports = { mysql: knex}