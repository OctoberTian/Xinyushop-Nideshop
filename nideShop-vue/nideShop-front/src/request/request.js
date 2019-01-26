import axios from 'axios' // 引用axios
// import router from 'vue-router' // 引用axios
import { Promise } from 'es6-promise' // 引入Promise

// axios 配置
axios.defaults.timeout = 5000 // 设置超时时间
// axios.defaults.baseURL = 'http://123.206.42.148:8888' // 这是调用数据接口
axios.defaults.baseURL = 'http://localhost:8888' // 这是调用数据接口

// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，我这里是使用sessionStorage来存储token等权限信息和用户信息，若要使用cookie可以自己封装一个函数并import便可使用
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token') // 获取存储在本地的token
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (token) {
      config.headers.Authorization = 'Token ' + token // 携带权限参数
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器（所有接收到的请求都要从这儿过一次）

// axios.interceptors.response.use(
//   response => {
//     // response.status===401是我和后台约定的权限丢失或者权限不够返回的状态码，这个可以自己和后台约定，约定返回某个自定义字段也是可以的
//     if (response.status === 401) {
//       router.push({
//         // push后面是一个参数对象，可以携带很多参数，具体可以去vue-router上查看，例如query字段表示携带的参数
//         path: '/'
//       })
//     }
//     return response
//   },
//   error => {
//     return Promise.reject(error.response.data)
//   })

export default axios

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
