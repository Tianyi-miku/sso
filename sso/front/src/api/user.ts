import request from "@/http/axios";

export function getlist(data: any) {
  return request({
    url: '/user/list',
    method: 'post',
    data: data,
  })
}

export function update(data: any) {
  return request({
    url: '/user/update',
    method: 'post',
    data: data,
  })
}

export function delet(id: number) {
  return request({
    url: `/user/delet?id=${id}`,
    method: 'delete',
  })
}
