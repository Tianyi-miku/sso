import request from "@/http/axios";

export function Login(token: string) {
  return request({
    url: `/login?token=${token}`,
    method: 'get',
  })
}