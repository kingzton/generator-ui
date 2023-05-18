/**
 * @author: zxj
 * @date:  2023-02-16 10:51
 * @tags: 缓存方法
 */
import {encodeCache} from "@/utils/encode"
import Cookies from "js-cookie"

export const cache = {
  cookie: {
    save(key: string, value: object, time: number | Date | undefined) {
      Cookies.set(key, encodeCache.encode(JSON.stringify(value)), {expires: time})
    },
    get(key: string, defaultValue = {}) {
      if (Cookies.get(key)) {
        return JSON.parse(encodeCache.decode(<string>Cookies.get(key)))
      } else {
        return defaultValue
      }
    },
    remove(key: string) {
      Cookies.remove(key)
    }
  },
  storage: {
    save(key: string, value: object) {
      localStorage.setItem(key, encodeCache.encode(JSON.stringify(value)))
    },
    get(key: string, defaultValue = {}) {
      if (localStorage.getItem(key)) {
        return JSON.parse(encodeCache.decode(<string>localStorage.getItem(key)))
      } else {
        return defaultValue
      }
    },
    remove(key: string) {
      localStorage.removeItem(key)
    },
    clear() {
      localStorage.clear()
    }
  }
}
