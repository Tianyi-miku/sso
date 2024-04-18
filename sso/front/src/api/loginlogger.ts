import request from "@/http/axios";

export function getlist(data: any) {
  return request({
    url: '/loginlogger/list',
    method: 'post',
    data: data,
  })
}
