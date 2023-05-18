<script lang="ts">
export default {
  name: 'Test'
}
</script>
<script setup lang="ts">
import PreviewCode from '@/components/PreviewCode/index.vue'
// import * as artTemplate from "art-template"
import artTemplate from 'art-template/lib/template-web.js'
import { htmlMinifier } from '@/utils/common'
import { db } from '@/utils/db'
import dayjs from 'dayjs'
import {getApi, getListApi, insertApi} from '@/api/generator'

const templateContent = `{{if 6}}<h1>{{title}}</h1>
<ul>
    {{each list value i}}
        <li>索引 {{i + 1}} : {{value}}</li>
    {{/each}}
</ul>
{{/if}}`

let data = {
  title: '基本例子',
  isAdmin: true,
  list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
}
const render = artTemplate.compile(templateContent)

let result = render(data)
// console.log(result)
result = htmlMinifier(result)
// // console.log(result)
// let { db } = localDB('test')
// console.log('获取值', db)

const init = async () => {
  const id = insertApi({
    name: '张三',
    type: 'demo',
    path: '',
    content: '',
    creatTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    updateTime: '',
    remark: ''
  })

  console.log(id)
}

const list = ref<IResponse>()
const getList = async (current: number) => {
  list.value = await getListApi({
    pageSize: 10,
    current
  })
  console.log(list.value)
}

const info = ref<any>()
const getInfo = async () => {
  info.value = getApi(6)
  console.log(info.value)
}

const updateInfo = async () => {
  const id = await db.templateInfo
    .where('name')
    .equals('张三')
    .modify({
      name: 'lisi',
      updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    })
  // const id = await db.templateInfo.update('张三', {
  //   name: 'lisi',
  //   updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
  // })
  console.log(id)
}

const deleteInfo = async () => {
  const id = await db.templateInfo.delete(7)
  console.log(id)
}

const deleteAll = async () => {
  const id = await db.templateInfo.clear()
  console.log(id)
}
</script>

<template>
  <el-button type="primary" @click="init">添加</el-button>
  <el-button type="primary" @click="getInfo">获取ID为6的数据</el-button>
  <el-button type="primary" @click="updateInfo">修改ID为6的数据</el-button>
  <el-button type="primary" @click="getList(list ? list.data.current + 1 : 0)">获取所有数据</el-button>
  <el-button type="danger" @click="deleteInfo">删除ID为7数据</el-button>
  <el-button type="danger" @click="deleteAll">删除数据</el-button>

  <router-link :to="{name: 'config'}">测试跳转</router-link>
  <preview-code :code="result" :type="'html'" />
</template>

<style scoped></style>
