import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 代码高亮
import prismjsPlugin from 'vite-plugin-prismjs'

// 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 配置vue3组件的name属性
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/vite'

// 配置打包进度条
import progress from 'vite-plugin-progress'

// import MonacoEditorNlsPlugin, { esbuildPluginMonacoEditorNls, Languages } from 'vite-plugin-monaco-editor-nls'

// 协助配置网页标题栏
import { createHtmlPlugin } from 'vite-plugin-html'

// 压缩配置
import viteCompression from 'vite-plugin-compression'

import visualizer from 'rollup-plugin-visualizer'

const root = process.cwd()
const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}
const alias: Record<string, string> = {
  '@': pathResolve('src')
}

// const zh_CN = require('vscode-loc.git/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return {
    server: {
      port: 9527,
      host: '0.0.0.0'
    },
    plugins: [
      vue(),
      // 配置代码高亮
      prismjsPlugin({
        // languages: ["json", "js"],
        languages: 'all',
        plugins: ['line-numbers', 'highlight-keywords', 'toolbar', 'copy-to-clipboard'], //配置显示行号插件
        theme: 'tomorrow', //主题名称
        css: true
      }),
      // 配置按需加载
      Components({
        // extensions: ["vue", "md"],
        // resolvers: [
        //   ElementPlusResolver()
        // ],
      }),
      // progress({
      //   format: 'building [:bar] :percent [耗时:elapsed S]',
      //   total: 200,
      //   width: 60,
      //   complete: '\u2588',
      //   incomplete: '\u2591',
      //   callback: () => {}
      // }),
      progress({
        complete: '\u2588',
        incomplete: '\u2591'
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver()]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
            injectScript: `<script src="./inject.js"></script>`
          }
        }
      }),
      // MonacoEditorNlsPlugin({ locale: Languages.zh_hans })
      DefineOptions(),
      viteCompression({
        verbose: true, // 默认即可
        disable: false, //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 10240, //压缩前最小文件大小
        algorithm: 'gzip', //压缩算法
        ext: '.gz' //文件类型
      })
      // 分析项目下各个文件的相关依赖
      // visualizer({
      //   emitFile: false,
      //   filename: 'stats.html', //分析图生成的文件名
      //   open: false //如果存在本地服务端口，将在打包后自动展示
      // })
    ],
    build: {
      outDir: 'generator-dist',
      assetsDir: 'assets',
      sourcemap: false,
      // 配置打包文件路径和命名
      rollupOptions: {
        output: {
          // 超大静态资源拆分
          // manualChunks(id) {
          //   // console.log(id,'id')
          //   if (id.includes('vue')) {
          //     return 'vue'
          //   }
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
          //   }
          // },
          manualChunks: {
            // vue vue-router合并打包
            vue: ['vue', 'vue-router'],
            tinymce: ['tinymce'],
            'monaco-editor': ['monaco-editor'],
            'element-plus': ['element-plus'],
            dexie: ['dexie']
          },
          chunkFileNames: chunkInfo => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
            const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `js/${fileName}/[name].[hash].js`
          },
          // chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
          // assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境时移除console.log调试代码
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: alias
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/styles/global.less";',
          javascriptEnabled: true
        }
      }
    },
    // 强制预构建插件包
    optimizeDeps: {
      include: [
        `monaco-editor/esm/vs/language/json/json.worker`,
        `monaco-editor/esm/vs/language/css/css.worker`,
        `monaco-editor/esm/vs/language/html/html.worker`,
        `monaco-editor/esm/vs/language/typescript/ts.worker`,
        `monaco-editor/esm/vs/editor/editor.worker`
      ]
      // /** vite >= 2.3.0 */
      // esbuildOptions: {
      //   plugins: [
      //     esbuildPluginMonacoEditorNls({
      //       locale: Languages.zh_hans
      //     })
      //   ]
      // }
    }
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       modifyVars: {
    //         hack: `true; @import (reference) "${resolve("src/assets/less/index.less")}";`,
    //       },
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
  }
})
