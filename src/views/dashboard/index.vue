<template>
  <el-row :gutter="10">
    <el-col :span="2" style="position: fixed; height: 100%; width: 8.3333333333%; z-index: 99">
      <el-menu class="custom-menu" default-active="模板示例" @select="handleSelect">
        <template v-for="item of state.list" :key="item.key">
          <el-menu-item :index="item.key">
            <template #title>
              {{ item.key }}
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
    <el-col :span="22" :offset="2">
      <template v-for="item of state.list" :key="item.key">
        <el-card :id="item.key" class="card-header-pd-10 mb-10" shadow="never" :body-style="{ padding: '10px' }">
          <template #header>
            <div class="card-header">
              <span class="font-weight-bold">{{ item.key }}</span>
            </div>
          </template>
          <template v-if="item.key === '模板示例'">
            系统使用的模板框架是art-template 具体文档配置： <a href="https://aui.github.io/art-template/zh-cn/docs/index.html">https://aui.github.io/art-template/zh-cn/docs/index.html</a>
            <br/><br/>
          </template>
          <preview-code :code="item.code" :type="item.type" />
        </el-card>
      </template>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import PreviewCode from '@/components/PreviewCode/index.vue'
const state = reactive({
  code: `{{ each list item i }}
    /** {{ item[3] }} */
    @ApiModelProperty(value = "{{ item[3] }}", required = {{ item[2] === '是'? 'true' : 'false' }})
    private {{ item[1] }} {{ item[0] }};
{{ /each   }}`,
  list: [
    {
      key: '模板示例',
      code: `{{ each list item i }}
    /** {{ item[3] }} */
    @ApiModelProperty(value = "{{ item[3] }}", required = {{ item[2] === '是'? 'true' : 'false' }})
    private {{ item[1] }} {{ item[0] }};
{{ /each   }}`,
      type: 'java'
    },
    {
      key: '数据格式',
      code: `{
    list: [
        [
            "authCode",
            "String",
            "是",
            "授权码"
        ],
        [
            "decodeStr",
            "String",
            "是",
            "参数加密"
        ],
        [
            "hospitalCode",
            "String",
            "是",
            "医院编号"
        ],
        [
            "barcode",
            "String",
            "是",
            "医废条码"
        ],
        [
            "collectTime",
            "String",
            "是",
            "收集时间"
        ],
        [
            "articleQuality",
            "String",
            "是",
            "医废重量"
        ],
        [
            "organizationCode",
            "String",
            "是",
            "科室编码"
        ],
        [
            "organizationName",
            "String",
            "是",
            "科室名称"
        ],
        [
            "transferPerson",
            "String",
            "是",
            "交接护士"
        ],
        [
            "collectionPerson",
            "String",
            "是",
            "收集人"
        ],
        [
            "collectionNurse",
            "String",
            "是",
            "收集护士"
        ],
        [
            "wasteType",
            "String",
            "是",
            "医废类型 1"
        ],
        [
            "carNumber",
            "String",
            "是",
            "医废收集设备编码"
        ],
        [
            "batchNo",
            "String",
            "否",
            "批次号"
        ]
    ]
};`,
      type: 'json'
    }
  ]
})

const handleSelect = (key: string, keyPath: string[]) => {
  const row = document.getElementById(key)
  if (row) {
    row.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped></style>
