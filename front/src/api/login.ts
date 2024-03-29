import request from "@/http/axios";

export function register(data: any) {
  return request({
    url: '/register',
    method: 'post',
    data: data,
  })
}


export function login(data: any) {
  return request({
    url: '/login',
    method: 'post',
    data: data,
  })
}
