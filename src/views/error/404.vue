<script setup lang="ts">
import { Error } from '@/components/Error'
import { useRouter } from 'vue-router'

const { push, go } = useRouter()

const errorClick = () => {
  // push('/')
  go(-1)
}
</script>

<template>
  <Error @error-click="errorClick" />
</template>
