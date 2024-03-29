import axios from "axios";

const request = axios.create({
  baseURL: '/api',
  timeout: 6000, // 请求超时时间
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // 设置为异步
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export default request