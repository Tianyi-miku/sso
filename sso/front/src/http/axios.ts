import router from "@/router";
import store from "@/store";
import { openNotification } from "@/utils/publicFuntion";
import axios, { AxiosInstance } from "axios";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 6000, // 请求超时时间
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // 设置为异步
    'Content-Type': 'application/json;charset=UTF-8'
  },
  cancelToken: source.token
})


// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.token || localStorage.getItem('token')
  if (config.headers.notToken) {
    return config;
  }
  if (token) {
    config.headers.token = token
  }

  if (!token) {
    openNotification(0, '请求错误', '请退出重新登录')
    router.push('/login')
    //   source.cancel('取消请求');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  let code = error.response?.status
  let message = error.response?.data?.message

  if (code) {
    switch (code) {
      case 401:
        openNotification(2, '登录已过期', '请重新登录')
        localStorage.removeItem('token')
        router.push('/login')
        break;

      case 500:
        openNotification(0, '请求失败', '请稍后再试')
        break;

      default:
        openNotification(0, '请求失败', message || '请稍后再试')
        break;
    }
  }

  // 对响应错误做点什么
  return Promise.reject(error);
});

const http = async (params: any) => {
  let result
  try {
    result = await request(params)
  } catch (error) {
    console.log(error);
  }
  return result
}

export default http