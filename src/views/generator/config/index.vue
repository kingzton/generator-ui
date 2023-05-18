<script lang="ts" setup>
import { languageList } from '@/config/constant'
import { ElMessage, ElTable } from 'element-plus'
import { useGeneratorStore } from '@/store/modules/generator'
import { getApi, getListApi, insertApi } from '@/api/generator'

let tableData: any = []

const dialogModel = reactive<DialogModel>({
  title: '模板信息',
  width: 520,
  height: 450,
  footer: true,
  visible: false,
  close: false,
  actionType: ''
})

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
  page: {
    current: 0,
    pageSize: 10
  } as Page,
  pagination: {
    small: false,
    background: false,
    currentPage: 0,
    pageSize: 0,
    pagerCount: 7,
    layout: 'sizes, prev, pager, next, jumper, ->, total',
    pageSizes: [10, 20, 30, 40, 50, 100],
    disabled: false,
    hideOnSinglePage: false,
    total: 10
  }
})
const initData = async () => {
  let resp = await getListApi(state.page)

  if (resp.code === 100) {
    console.log(resp.data)
  }
}

initData()

const tableRef = ref<InstanceType<typeof ElTable>>()
const route = useRouter()
const generatorStore = useGeneratorStore()
const handleClick = (type: string) => {
  if (type === 'create') {
    dialogModel.visible = true
  }

  if (type === 'default') {
    state.templateInfo.name = new Date().getTime()
    state.templateInfo.type = 'html'
    dialogModel.visible = false
    generatorStore.setActiveTemplate(state.templateInfo)
    route.push({
      name: 'editor'
    })
  }
  if (type === 'save') {
    dialogModel.visible = false
    insertApi(state.templateInfo).then((resp: any) => {
      console.log(resp)
    })
    generatorStore.setActiveTemplate(state.templateInfo)
    route.push({
      name: 'editor'
    })
  }
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  state.page.pageSize = val
  initData()
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  state.page.current = val
  initData()
}
</script>
<template>
  <el-button type="primary" @click="handleClick('create')">创建模板</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="模板名称" />
    <el-table-column prop="type" label="模板语言" />
    <el-table-column prop="path" label="文件夹路径" />
    <el-table-column prop="creatTime" label="创建时间" />
    <el-table-column prop="remark" label="备注" />
  </el-table>



  <el-pagination
    v-model:page-count="state.pagination.currentPage"
    v-model:page-size="state.pagination.pageSize"
    :page-sizes="state.pagination.pageSizes"
    :small="state.pagination.small"
    :disabled="state.pagination.disabled"
    :background="state.pagination.background"
    :layout="state.pagination.layout"
    :total="state.pagination.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

  <el-dialog v-model="dialogModel.visible" :title="dialogModel.title" :width="dialogModel.width">
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
        <el-button type="primary" @click="handleClick('save')">创建</el-button>
        <el-button @click="dialogModel.visible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>
