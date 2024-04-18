import request from "@/http/axios";

export function getlist(data: any) {
  return request({
    url: '/logger/list',
    method: 'post',
    data: data,
  })
}
