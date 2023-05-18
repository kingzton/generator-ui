/**
 * @author: zxj
 * @date:  2022-11-23 11:25
 * @tags:
 */

/**
 * 实现首字母大写
 * @param text
 */
export function toUpperCaseFirst(text: string) {
  // 正则法
  text = text.toLowerCase()
  const reg = /\b(\w)|\s(\w)/g //  \b判断边界\s判断空格
  return text.replace(reg, function (m) {
    return m.toUpperCase()
  })
}

/**
 * 格式化代码
 * @param source
 */
export function htmlMinifier(source: string) {
  source = source
    // remove double newline / carriage return into one newline / carriage return
    .replace(/\n\s*(?=\n)/g, '')
    // remove cr and space before {{ block/if/else }}
    .replace(/\n\s*(\{\{\s*(block|if|each|else)\s*[^\}]*\}\})/g, '$1')
    // remove cr and space before {{ /block/if }}
    .replace(/\n\s*(\{\{\s*\/(block|if|each)\s*\}\})/g, '$1')
  ;
  return source;
}

/**
 * 下载图片
 * @param path 图片二进制字节码
 * @param fileName 图片二进制字节码
 */
export function downloadImg(path: any, fileName:any) {
  if (!fileName) {
    fileName = new Date().getTime() + '.png'
  }
  const save_link = document.createElement( 'a')
  save_link.href = path
  save_link.download = fileName
  const event = document.createEvent('MouseEvents')
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  save_link.dispatchEvent(event)

  // document.body.appendChild(save_link)
  // save_link.click()
  // document.body.removeChild(save_link)

}
