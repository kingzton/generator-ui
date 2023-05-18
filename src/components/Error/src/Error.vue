<script setup lang="ts">
import pageError from '@/assets/svgs/404.svg'
import networkError from '@/assets/svgs/500.svg'
import noPermission from '@/assets/svgs/403.svg'

interface ErrorMap {
  url: string
  message: string
  buttonText: string
}

const errorMap: {
  [key: string]: ErrorMap
} = {
  '404': {
    url: pageError,
    message: '抱歉，您访问的页面不存在！',
    buttonText: '返回上一步',
  },
  '500': {
    url: networkError,
    message: '抱歉，服务器报告错误！',
    buttonText: '返回上一步',
  },
  '403': {
    url: noPermission,
    message: '抱歉，您无权访问此页面！',
    buttonText: '返回上一步',
  },
}

const props = defineProps({
  type: {
    type: String,
    default: '404',
  },
})

const emit = defineEmits(['errorClick'])
const btnClick = () => {
  emit('errorClick', props.type)
}
</script>

<template>
  <div class="flex justify-center">
    <div class="text-center">
      <img width="350" :src="errorMap[type].url" alt="" />
      <div style="font-size: 14px; color: #909399">{{ errorMap[type].message }}</div>
      <div style="margin-top: 20px;">
        <ElButton type="primary" @click="btnClick">{{ errorMap[type].buttonText }}</ElButton>
      </div>
    </div>
  </div>
</template>
