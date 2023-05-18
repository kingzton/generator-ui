<template>
  <div ref="codeEditBox" class="codeEditBox" :class="heightChange && 'codeEditBox1'" />
</template>
<script lang="ts">
import loader from '@monaco-editor/loader'
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { editorProps } from './monacoEditorType'

export default defineComponent({
  name: 'MonacoEditor',
  props: editorProps,
  emits: ['update:modelValue', 'change', 'editor-mounted'],
  setup(props, { emit }) {
    loader.config({ monaco })
    loader.config({
      paths: {
        vs: 'monaco-editor/min/vs'
      },
      'vs/nls': {
        // availableLanguages: { "*": "de" },
        availableLanguages: { '*': 'zh-cn' }
      }
    })
    let editor: any
    let monacoInstance: any
    const codeEditBox = ref()

    const init = async () => {
      monacoInstance = await loader.init()
      editor = monacoInstance.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: props.language,
        readOnly: props.readOnly,
        theme: props.theme,
        ...props.options
      })

      // 监听值的变化
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue() // 给父组件实时返回最新文本
        console.log(value)
        emit('update:modelValue', value)
        emit('change', value)
      })

      emit('editor-mounted', editor)
    }
    watch(
      () => props.modelValue,
      newValue => {
        if (editor) {
          const value = editor.getValue()
          if (newValue !== value) {
            editor.setValue(newValue)
          }
        }
      }
    )

    watch(
      () => props.options,
      newValue => {
        editor.updateOptions(newValue)
      },
      { deep: true }
    )
    watch(
      () => props.readOnly,
      () => {
        console.log('props.readOnly', props.readOnly)
        editor.updateOptions({ readOnly: props.readOnly })
      },
      { deep: true }
    )

    watch(
      () => props.language,
      newValue => {
        console.log(editor.getModel()?.getLanguageId())
        console.log(monacoInstance.editor.getModels());
        monacoInstance.editor.setModelLanguage(editor.getModel(), newValue)
        console.log(`model language was changed to ${editor.getModel()?.getLanguageId()}`);
      }
    )

    onBeforeUnmount(() => {
      editor.dispose()
    })

    onMounted(() => {
      init()
    })

    return { codeEditBox }
  }
})
</script>
<style lang="less" scoped>
.codeEditBox {
  width: 100%;
  flex: 1;
  min-height: 100%;
  height: calc(100vh - 300px);
  overflow-y: auto;
}
</style>
