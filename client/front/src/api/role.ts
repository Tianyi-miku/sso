import request from "@/http/axios";

export function getlist(data: any) {
  return request({
    url: '/role/list',
    method: 'post',
    data: data,
  })
}
