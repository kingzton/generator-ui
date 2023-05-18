import { createApp } from 'vue'
import '@/styles/global.less'
import App from '@/App.vue'
import { setupRouter } from '@/router'
import { setupElementPlus } from '@/plugins/elementPlus'
import { setupStore } from '@/store'
import { setupElementPlusIcons } from '@/plugins/elementPlusIconsVue'
import { setupSvgIcon } from '@/plugins/svgIcon'

import './permission'

const setupAll = () => {
  const app = createApp(App)

  // 配置缓存
  setupStore(app)

  // 配置路由
  setupRouter(app)

  setupElementPlus(app)

  setupElementPlusIcons(app)

  setupSvgIcon(app)

  app.mount('#app')
}

setupAll()
