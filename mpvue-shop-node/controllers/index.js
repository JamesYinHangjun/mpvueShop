// 自动读取本地文件路径
const _ = require("lodash")
const fs = require("fs")
const path = require("path")

// 将文件夹下的文件映射为模块使用
// d是当前文件夹
const mapDir = d => {
    const tree = {}

    // 获取当前文件夹下的所有文件夹和文件，分为两组，一组为文件夹，一组为文件
    const [dirs, files] = _(fs.readdirSync(d)).partition(p => fs.statSync(path.join(d,p)).isDirectory())
    // 如果是文件夹，映射文件夹
    dirs.forEach(dir => {
        tree[dir] = mapDir(path.join(d, dir))
    })
    //映射文件
    files.forEach(file => {
        //获取文件后缀名字
        if(path.extname(file) === ".js") {
            tree[path.basename(file, ".js")] = require(path.join(d, file))
        }
    })

    return tree
}

// 默认导出当前文件夹下的映射
module.exports = mapDir(path.join(__dirname))