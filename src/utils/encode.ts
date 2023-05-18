/**
 * @author: zxj
 * @date:  2023-02-16 10:55
 * @tags: 编码解码工具
 */

/**
 * base64编码解码
 * @constructor
 */
export const base64 = {
  encode: function (val: string) {
    //编码逻辑
    return window.btoa(val)
  },
  decode: function (val: string) {
    //解码逻辑
    return window.atob(val)
  }
}

/**
 * 地址字符串编码解码
 */
export const stringUrl = {
  encode: function (val: string) {
    //编码逻辑
    return encodeURI(val)
  },
  decode: function (val: string) {
    //解码逻辑
    return decodeURI(val)
  },
  encodeAll: function (val: string) {
    //编码逻辑
    return encodeURIComponent(val)
  },
  decodeAll: function (val: string) {
    //解码逻辑
    return decodeURIComponent(val)
  }
}

/**
 * 缓存编码
 */
export const encodeCache = {
  encode: function (val: string) {
    //编码逻辑
    return window.btoa(encodeURIComponent(val))
  },
  decode: function (val: string) {
    //解码逻辑
    return decodeURIComponent(window.atob(val))
  },
}

/**
 * 文件转base64
 * @param file
 * @returns {Promise<unknown>}
 */
export function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}


/**
 * HTML转义
 * @param html
 * @returns {string}
 * @constructor
 */
export function htmlEncode(html: string) {
  let temp = document.createElement('div')
  temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html)
  return temp.innerHTML
}

/**
 * HTML反转义
 * @param text
 * @returns {string}
 * @constructor
 */
export function htmlDecode(text: string) {
  let temp = document.createElement('div')
  temp.innerHTML = text
  return temp.innerText || temp.textContent
}
