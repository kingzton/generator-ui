/**
 * @author: zxj
 * @date:  2023-02-16 10:53
 * @tags: 颜色转换工具
 */

/**
 * RGB(A)颜色转换为HEX十六进制的颜色值
 * @param val
 * @returns {{r: number, b: number, g: number, alpha: number, hex: string}|{alpha: number, hex: string}}
 */
export function rgbToHex(val: string) {
  let r
  let g
  let b
  let a
  let regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/ // 判断rgb颜色值格式的正则表达式，如rgba(255,20,10,.54)
  let rsa = val.replace(/\s+/g, '').match(regRgba)
  if (rsa) {
    r = parseInt(rsa[1]).toString(16)
    r = r.length === 1 ? '0' + r : r
    g = (+rsa[2]).toString(16)
    g = g.length === 1 ? '0' + g : g
    b = (+rsa[3]).toString(16)
    b = b.length === 1 ? '0' + b : b
    a = +(rsa[5] ? rsa[5] : 1) * 100
    return {hex: '#' + r + g + b, r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16), alpha: Math.ceil(a)}
  } else {
    return {hex: '无效', alpha: 100}
  }
}

/**
 * HEX十六进制颜色值转换为RGB(A)颜色值
 * @param val
 * @returns {{r: *, b: *, g: *, rgb: string}|{rgb: string}}
 */
export function hexToRgb(val: any) {
  // 16进制颜色值的正则
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  let color = val.toLowerCase()
  let result = ''
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    let colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    result = 'rgb(' + colorChange.join(',') + ')'
    return {rgb: result, r: colorChange[0], g: colorChange[1], b: colorChange[2]}
  } else {
    result = '无效'
    return {rgb: result}
  }
}

/**
 * rgb转int
 * @param r
 * @param g
 * @param b
 * @returns {number}
 */
export function convertRgbToArgb(r: any, g: any, b: any) {
  return (0xff << 24) | (r << 16) | (g << 8) | b
}
