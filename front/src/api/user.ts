import request from "@/http/axios";

export function getlist(data: any) {
  return request({
    url: '/user/list',
    method: 'post',
    data: data,
  })
}

