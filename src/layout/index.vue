<script setup lang="ts">
import NovelFooter from '@/layout/footer/index.vue'
import NovelHeader from '@/layout/header/index.vue'
</script>
<template>
  <el-container>
    <el-header style="position: fixed; width: 100%; z-index: 9999">
      <novel-header />
    </el-header>
    <el-main style="margin-top: 60px">
      <router-view />
    </el-main>
    <el-footer>
      <novel-footer />
    </el-footer>
  </el-container>
</template>

<style scoped></style>
