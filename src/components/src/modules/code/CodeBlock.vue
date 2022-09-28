<script lang="ts" setup>
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { computed, ref } from 'vue'
const props = defineProps(nodeViewProps)
const selectedLanguage = computed({
  get() {
    return props.node.attrs.language
  },
  set(language: string) {
    props.updateAttributes({ language })
  },
})
const languages = ref<string[]>(props.extension.options.lowlight.listLanguages())
</script>

<template>
  <NodeViewWrapper class="code-block">
    <div class="left-dot">
      <div class="dot" />
      <div class="dot" />
      <div class="dot" />
    </div>
    <select v-model="selectedLanguage" contenteditable="false">
      <option :value="null">
        auto
      </option>
      <option disabled>
        —
      </option>
      <option v-for="(language, index) in languages" :key="index" :value="language">
        {{ language }}
      </option>
    </select>
    <pre><code><NodeViewContent /></code></pre>
  </NodeViewWrapper>
</template>

<style lang="less" scoped>
.code-block {
  position: relative;

  select {
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
