<script lang="ts" setup>
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()
const activeMenu = computed(() => {
  const { meta, path } = unref(currentRoute)
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})

const handleClick = (tab: any, event: Event) => {
  console.log(tab, event)
}
</script>
<template>
  <el-menu :default-active="activeMenu" class="el-menu-header" router mode="horizontal" @select="handleClick">
    <el-menu-item index="/dashboard" :route="{ path: '/' }">
      <svg-icon iconName="jnssd-auto" />
      首页
    </el-menu-item>
    <el-menu-item index="/config" :route="{ path: '/config' }">
      <svg-icon iconName="jnssd-peizhi" />
      模板配置
    </el-menu-item>
    <el-menu-item index="/code" :route="{ path: '/code' }">
      <svg-icon iconName="jnssd-code" />
      生成代码
    </el-menu-item>
    <el-menu-item index="/demo" :route="{ path: '/demo' }">
      <svg-icon iconName="jnssd-peizhi" />
      Demo
    </el-menu-item>
    <el-menu-item index="/editor" :route="{ path: '/editor' }">
      <el-icon><Edit /></el-icon>
      模板编辑器
    </el-menu-item>
    <el-menu-item index="/test" :route="{ path: '/test' }">
      <el-icon><Edit /></el-icon>
      测试页面
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu-header {
  padding: 0 20px;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: #03B3B2 !important;
  border-color: #03B3B2 !important;
}
</style>
