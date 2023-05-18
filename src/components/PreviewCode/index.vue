<template>
  <div class="code-info">
    <pre
      lang="zh-Hans-CN"
      data-prismjs-copy="复制"
      data-prismjs-copy-error="按Ctrl+C复制"
      data-prismjs-copy-success="复制成功"
      :class="'hx-scroll ' + lineNumbers"
    ><code :class="'language-'+ type" v-html="Prism.highlight(code, Prism.languages[type], type)"></code></pre>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PreviewCode'
}
</script>

<script setup lang="ts">
import Prism from 'prismjs'
import { watch } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'html'
  },
  isShowLineNumbers: {
    type: Boolean,
    default: true
  }
})
const lineNumbers = computed(() => {
  return props.isShowLineNumbers ? 'line-numbers' : ''
})

watch(
  () => props.code,
  () => {
    nextTick(() => {
      Prism.highlightAll() //切换菜单重新渲染
    })
  },
  { deep: true }
)

onMounted(() => {
  Prism.highlightAll() //切换菜单重新渲染
})
</script>

<style scoped></style>
