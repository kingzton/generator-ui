/**
 * @author: zxj
 * @date:    2022-11-07 17:32
 * @tags:
 */
import type {App} from 'vue'
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Layout from '@/layout/index.vue'

const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Root',
    meta: {
      hidden: true,
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '主页',
          menu: true
        },
      },
      {
        path: 'config',
        component: () => import('@/views/generator/config/index.vue'),
        name: 'config',
        meta: {
          title: '模板配置',
          menu: true
        },
      },
      {
        path: 'code',
        component: () => import('@/views/generator/code/index.vue'),
        name: 'code',
        meta: {
          title: '生成代码',
          menu: true
        },
      },
      {
        path: 'editor',
        component: () => import('@/views/generator/config/edit.vue'),
        name: 'editor',
        props: ($route: any) => {
          console.log($route)
          return {}
        },
        meta: {
          hidden: true,
          title: '模板编辑器',
          menu: true
        },
      },
      {
        path: 'test',
        component: () => import('@/views/test/index.vue'),
        name: 'test',
        meta: {
          hidden: true,
          title: '测试页面',
          menu: true
        },
      },
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/redirect/index.vue'),
        meta: {},
      },
    ],
    meta: {
      hidden: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: '登录',
    },
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/demo.vue'),
    name: 'demo',
    meta: {
      hidden: true,
      title: '样例',
      menu: true
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true,
    },
  },
]

let glob = import.meta.glob('@/views/**/index.vue',{
  eager: true,
  // import: 'default'
});

console.log(glob)

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({left: 0, top: 0}),
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
