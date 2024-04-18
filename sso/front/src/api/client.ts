import request from "@/http/axios";

export function getlist(data: any) {
  return request({
    url: '/client/list',
    method: 'post',
    data: data,
  })
}

export function update(data: any) {
  return request({
    url: '/client/update',
    method: 'post',
    data: data,
  })
}

export function create(data: any) {
  return request({
    url: '/client/create',
    method: 'post',
    data: data,
  })
}

export function delet(id: number) {
  return request({
    url: `/client/delet?id=${id}`,
    method: 'delete',
  })
}
