<template>
  <div class="formula-content">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="代码展示" name="first">
        <preview-code v-if="flag" :code="state.code" :type="state.type"></preview-code>
        <span class="description">{{ state.description }}</span>
      </el-tab-pane>
      <el-tab-pane label="富文本编辑器" name="second">
        <tinymce-editor v-model:modelValue="content" height="300" id="getContent" />
        <el-button type="primary" @click="handleClick('get')">获取表格内容</el-button>
        <el-button type="primary" @click="handleClick('getAndRender')">获取表格内容并解析</el-button>
      </el-tab-pane>
      <el-tab-pane label="模板设置" name="templateSet">
        <!--<tinymce-editor v-model:modelValue="state.templateContent" height="300" id="templateSet" />-->
        <MonacoEditor v-model="state.templateContent" :language="'java'" width="100%" height="300" />
      </el-tab-pane>
      <el-tab-pane label="模板生成代码展示" name="ArtTemplateView">
        <ArtTemplateView />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import PreviewCode from '@/components/PreviewCode/index.vue'
import TinymceEditor from '@/components/TinymceEditor/index.vue'
import ArtTemplateView from '@/views/test/index.vue'
import artTemplate from 'art-template/lib/template-web.js'
import { ElMessage } from 'element-plus'
import MonacoEditor from '@/components/MonacoEditor/index.vue'

const state = reactive({
  code:
    '<template>\n' +
    '  <div class="formula-content">\n' +
    '    <preview-code v-if="flag" :code="code" :type="type"></preview-code>\n' +
    '    <span class="description">{{ description }}</span>\n' +
    '  </div>\n' +
    '</template>',
  type: 'html',
  description: '你好，世界！',
  templateContent: ''
})
const dialogModel = reactive<DialogModel>({
  title: '模板信息',
  width: 950,
  height: 450,
  footer: true,
  visible: false,
  close: false,
  actionType: ''
})
let flag = ref(true)
// watch(
//   () => props.code,
//   () => {
//     flag.value = false
//     nextTick(() => {
//       flag.value = true
//     })
//   }
// )
const activeName = ref('first')
let content = ref('')
const handleClick = (type: string) => {
  if (type === 'create') {
    dialogModel.visible = true
  }
  /*if (type === 'default') {
  state.templateInfo.name = new Date().getTime()
  state.templateInfo.type = 'html'
  dialogModel.visible = false
  route.push({
  name: 'editor',
  query: { template: state.templateInfo }
  })
  }
  if (type === 'save') {
  dialogModel.visible = false
  route.push({
  name: 'editor',
  query: { template: state.templateInfo }
  })
  }*/
  if (type === 'get') {
    let div = document.createElement('div')
    div.innerHTML = content.value
    let data = []
    let trList = div.getElementsByTagName('tr')
    for (let i = 0; i < trList.length; i++) {
      let tdList = trList[i].getElementsByTagName('td')
      let temp = []
      for (let j = 0; j < tdList.length; j++) {
        temp.push(tdList[j].innerText.trim())
      }
      data.push(temp)
    }
    // const render = artTemplate.compile(state.templateContent)
    state.code = JSON.stringify(data, undefined, 4)
    state.type = 'json'
    activeName.value = 'first'
  }
  if (type === 'getAndRender') {
    let div = document.createElement('div')
    div.innerHTML = content.value
    let data = []
    let trList = div.getElementsByTagName('tr')
    for (let i = 0; i < trList.length; i++) {
      let tdList = trList[i].getElementsByTagName('td')
      let temp = []
      for (let j = 0; j < tdList.length; j++) {
        temp.push(tdList[j].innerText.trim())
      }
      data.push(temp)
    }
    if (!state.templateContent) {
      ElMessage.warning('当前模板未设置，请设置模板！！')
      return false
    }
    console.log(state.templateContent)
    let divTemp = document.createElement('div')
    divTemp.innerHTML = state.templateContent
    console.log(divTemp)
    console.log(divTemp.innerText)
    const render = artTemplate.compile(divTemp.innerText)
    state.code = render({ list: data })
    console.log(state.code)
    // state.code = artTemplate.render(state.templateContent, data)
    state.type = 'java'
    activeName.value = 'first'
  }
}
</script>
<style lang="less" scoped>
.formula-content {
  margin: 10px;
}

:focus-within {
}
</style>
