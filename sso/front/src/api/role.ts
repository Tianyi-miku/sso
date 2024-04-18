import request from "@/http/axios";

export function getlist(data: any) {
  return request({
    url: '/role/list',
    method: 'post',
    data: data,
  })
}

export function update(data: any) {
  return request({
    url: '/role/update',
    method: 'post',
    data: data,
  })
}

export function delet(id: number) {
  return request({
    url: `/role/delet?id=${id}`,
    method: 'delete',
  })
}

export function create(data: any) {
  return request({
    url: '/role/create',
    method: 'post',
    data: data,
  })
}