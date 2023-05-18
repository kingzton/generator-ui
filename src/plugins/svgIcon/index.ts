/**
 * @author: zxj
 * @date:  2022-11-09 14:57
 * @tags:
 */
import '@/assets/iconfont/iconfont.js'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { App } from "vue"

export const setupSvgIcon = (app: App<Element>) => {
  app.component('SvgIcon', SvgIcon)
}
