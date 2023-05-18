<script setup lang="ts">
import MonacoEditor from '@/components/MonacoEditor/index.vue'
import { ElMessage } from 'element-plus'
import { languageList } from '@/config/constant'
import { useGeneratorStore } from '@/store/modules/generator'

const value = ref(`{{if isAdmin}}

<h1>{{title}}</h1>
<ul>
    {{each list value i}}
        <li>索引 {{i + 1}} : {{value}}</li>
    {{/each}}
</ul>


{{/if}}
{{$data}}`)

const form = reactive({
  language: 'vue'
})

// const props = defineProps({
//   template: {
//     type: Object,
//     default: {}
//   }
// })

const route = useRoute()

const generatorStore = useGeneratorStore()
const state = reactive<any>({
  templateInfo: {
    // 模板名称
    name: '',
    // 模板语言
    type: '',
    // 模板存储路径
    path: '/',
    // 模板内容
    content: ''
  } as TemplateInfo,
  historyList: [] as TemplateInfo[]
})
state.templateInfo = generatorStore.getActiveTemplate

const heightChange = ref<any>(false)
const dialogModel = reactive<DialogModel>({
  title: '保存，并设置文件名',
  width: 520,
  height: 450,
  footer: true,
  visible: false,
  close: false,
  actionType: ''
})
const editorMounted = (editor: any) => {
  console.log('editor实例加载完成', editor)
}

// 监听键盘
const keyDownListener = (e: any) => {
  console.log(e.key, '-----', e.code)
  if (e.code === 'KeyS' && e.ctrlKey) {
    e.preventDefault()
    // 键盘组合操作：同时按下Ctrl+S
    console.log('保存')
    dialogModel.visible = true
  }
}

const handleClick = (type: string) => {
  if (type === 'default') {
    state.templateInfo.name = state.templateInfo.name ? state.templateInfo.name : new Date().getTime()
    dialogModel.visible = false
  }
  if (!state.templateInfo.name) {
    ElMessage.warning('请填写模板名称！')
    return false
  }
  if (type === 'save') {
    dialogModel.visible = false
  }
}
// 创建完成(可以读取dom)
onMounted(() => {
  console.log("创建完成");
  document.addEventListener('keydown', keyDownListener)
});
// 卸载之前
onBeforeUnmount(() => {
  document.removeEventListener('keydown', keyDownListener)
  console.log("卸载之前");
});


const handleClose = () => {
  dialogModel.visible = false
}
</script>
<template>
  <el-card :body-style="{ padding: '10px' }">
    <template #header>
      <div class="card-header">
        <div>
          <!--<el-button class="mr-10" size="small"><el-icon><Odometer /></el-icon>历史数据</el-button>-->
          <el-dropdown v-if="state.historyList.length !== 0" size="small" split-button>
            <el-icon><Odometer /></el-icon>历史数据
            <!--<template #dropdown>-->
            <!--  <el-dropdown-menu>-->
            <!--    <el-dropdown-item>Action 1</el-dropdown-item>-->
            <!--    <el-dropdown-item>Action 2</el-dropdown-item>-->
            <!--    <el-dropdown-item>Action 3</el-dropdown-item>-->
            <!--    <el-dropdown-item>Action 4</el-dropdown-item>-->
            <!--  </el-dropdown-menu>-->
            <!--</template>-->
          </el-dropdown>
          <span v-if="state.templateInfo.name">模板：{{ state.templateInfo.name }}</span>
        </div>
        <div>
          <el-form :model="form" label-width="120px">
            <el-form-item label="语言:" class="m-0" prop="language">
              <el-select v-model="state.templateInfo.type" filterable allow-create default-first-option placeholder="请选择语言">
                <el-option v-for="item in languageList" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
    <MonacoEditor
      v-model="state.templateInfo.content"
      :language="state.templateInfo.type"
      width="100%"
      height="100%"
      @editor-mounted="editorMounted"
    />

    <el-dialog
      v-model="dialogModel.visible"
      :title="dialogModel.title"
      :width="dialogModel.width"
      :before-close="handleClose"
    >
      <el-form label-width="100px" :model="state.templateInfo" style="max-width: 460px">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="state.templateInfo.name" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="模板语言" prop="type">
          <el-select
              v-model="state.templateInfo.type"
              style="width: 100%"
              filterable
              allow-create
              default-first-option
              placeholder="请选择模板语言"
          >
            <el-option v-for="item in languageList" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="模板所属文件" prop="path">
          <el-input v-model="state.templateInfo.path" placeholder="请输入模板所属文件" />
        </el-form-item>
      </el-form>
      <template #footer v-if="dialogModel.footer">
        <span class="dialog-footer">
          <el-button type="info" @click="handleClick('default')">默认</el-button>
          <el-button type="primary" @click="handleClick('save')">保存</el-button>
          <el-button @click="handleClose">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped>
div:deep(.el-card__header) {
  padding: 10px 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
