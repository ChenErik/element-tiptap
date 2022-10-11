<script setup lang="ts">
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
defineProps(nodeViewProps)
</script>

<template>
  <NodeViewWrapper class="highlight-block">
    <div
      class="highlight-block_emoji"
      contenteditable="false"
    >
      🎉
    </div>
    <NodeViewContent class="content" />
  </NodeViewWrapper>
</template>

<style lang="less">
.highlight-block {
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px;
  line-height: 24px;
  font-size: 18px;
  background-color: rgba(100, 108, 255, 0.08);
  color: #454ce1;
  border-color: #747bff;
  margin: 5px 0;
  display: flex;
  gap: 10px;

  .content {
    flex: 1 1 auto;
    min-height: 25px;
  }
}
</style>
