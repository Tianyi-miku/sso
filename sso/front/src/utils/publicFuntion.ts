import store from "@/store"
import { ElNotification } from "element-plus"

export enum Status {
  'error',
  'success',
  'warning',
  'info'
}




export const openNotification = (type: number, title?: string, message?: string, duration?: number) => {
  return ElNotification({
    type: Status[type] as any,
    title: title,
    message: message,
    duration: duration,
  })
}


export const GetLocalItem = (name: string) => {
  return localStorage.getItem(name)
}

export const SetLocalItem = (name: string, value: string) => {
  localStorage.setItem(name, value)
}

export const RemoveLocalItem = (name: string) => {
  localStorage.removeItem(name)
}