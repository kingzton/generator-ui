<script setup lang="ts">
defineOptions({
  name: 'DemoCustom'
})
const props = defineProps({
  data: {
    type: Array,
    default: () => {
      return {}
    }
  }
})
let state = reactive({})

watch(state, () => {}, {
  immediate: true,
  deep: true
})
</script>
<template>
  <div>
    <ul v-for="item in props.data">
      <li>{{ item }}</li>
      <slot></slot>
    </ul>
  </div>
</template>
