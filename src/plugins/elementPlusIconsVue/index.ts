/**
 * @author: zxj
 * @date:  2022-11-09 14:46
 * @tags:
 */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { App } from "vue"

export const setupElementPlusIcons = (app: App<Element>) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

