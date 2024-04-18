import request from "@/http/axios";

export async function register(data: any) {
  return await request({
    url: '/register',
    method: 'post',
    data: data,
    headers: {
      notToken: true
    }
  })
}


export function login(data: any) {
  return request({
    url: '/login',
    method: 'post',
    data: data,
    headers: {
      notToken: true
    }
  })
}


export function loginout(data: any) {
  return request({
    url: `/loginout?token=${data}`,
    method: 'get',
  })
}
