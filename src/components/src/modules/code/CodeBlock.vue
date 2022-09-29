<script lang="ts" setup>
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { computed, ref } from 'vue'
import CusSelect from '../components/CusSelet.vue'
const props = defineProps(nodeViewProps)
const selectedLanguage = computed({
  get() {
    return props.node.attrs.language
  },
  set(language: string) {
    props.updateAttributes({ language })
  },
})
interface List {
  label: string | number | null
  value: string | number
  disabled?: boolean
  [key: string]: any
}
function getLanguages(): List[] {
  const prefixLanguages = [{ label: 'auto', value: '' }, { label: '-', value: '', disabled: true }]
  const tmpArr = props.extension.options.lowlight.listLanguages().map((e: string) => {
    return {
      label: e,
      value: e,
    }
  })
  return prefixLanguages.concat(tmpArr)
}
const languages = ref<List[]>(getLanguages())
</script>

<template>
  <NodeViewWrapper class="code-block">
    <div class="left-dot">
      <div class="dot" />
      <div class="dot" />
      <div class="dot" />
    </div>
    <CusSelect v-model="selectedLanguage" class="code-block_select" :list="languages" />
    <pre><code><NodeViewContent /></code></pre>
  </NodeViewWrapper>
</template>

<style lang="less" scoped>
.code-block {
  position: relative;

  &_select {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .left-dot {
    display: flex;
    gap: 10px;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;

    .dot {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;

      &:nth-child(1) {
        background-color: #ed6c60;
      }

      &:nth-child(2) {
        background-color: #f7c151;
      }

      &:nth-child(3) {
        background-color: #64c856;
      }
    }
  }
}
</style>
