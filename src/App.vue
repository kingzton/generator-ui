<script setup lang="ts" xmlns="">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const config = ref({
  size: 'default',
  zIndex: 1949,
})
</script>

<template>
  <el-config-provider :locale="zhCn" :size="config.size" :z-index="config.zIndex">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
