import { LocalUrl, clientCode, loginssoUrl } from "@/config"
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

export const RemoveLocalItem = (name: string, value: string) => {
  localStorage.removeItem(name)
}

export const goToSSOLogin = () => { 
  window.location.href = loginssoUrl + `?clientCode=${clientCode}&skip=${LocalUrl}`
}