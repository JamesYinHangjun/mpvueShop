function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}


// ==> 接口请求的封装

const host = "http://localhost:5757/lm"
export {host}

function request(url,method,data,header = {}) {
  // 请求数据时，会有一个请求loading
  wx.showLoading({
    title: "数据请求中"
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: {
        "Content-type": "application/json"
      },
      // 接口请求成功
      success(res) {
        wx.hideLoading();
        resolve(res.data)
      },
      fail (error) {
        wx.hideLoading()
        reject(false)
      },
      // 只要请求完成就调用，不管成功或者失败
      complete() {
        wx.hideLoading()
      }
    })
  })
}

export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}


export default {
  formatNumber,
  formatTime
}
