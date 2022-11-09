<script lang="ts" setup>
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { onMounted, ref } from 'vue'
import remixiconUrl from '../../utils/remixicon.symbol.svg'
const props = defineProps(nodeViewProps)
const iconUrl = ref(remixiconUrl)
onMounted(() => {

})
</script>

<script lang="ts">
export default {
  name: 'Attachment',
}
</script>

<template>
  <NodeViewWrapper class="attachment-content">
    <div class="attachment" contenteditable="false">
      <div class="icon-box">
        <svg class="icon file-icon">
          <use :xlink:href="`${iconUrl}#ri-file-code-fill`" />
        </svg>
      </div>
      <div class="content">
        <div class="name">
          {{ props.node.attrs.name }}
        </div>
        <div class="size">
          {{ props.node.attrs.size }}
        </div>
      </div>
      <div class="icon-box download-icon">
        <a :href="props.node.attrs.src" target="_blank">
          <svg class="icon">
            <use :xlink:href="`${iconUrl}#ri-download-line`" />
          </svg>
        </a>
      </div>
    </div>
    <NodeViewContent class="content" />
  </NodeViewWrapper>
</template>

<style lang="less" scoped>
.attachment-content {
  //   display: inline-block;
  width: 250px;
  height: 65px;
  border: 1px solid #dee0e3;
  border-radius: 8px;
  margin-top: 5px;

  .attachment {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .icon-box {
      width: 50px;
      height: 50px;
      flex-shrink: 0;

      .icon {
        width: 100%;
        height: 100%;
      }

      .file-icon {
        fill: #3370ff;
      }
    }

    .download-icon {
      width: 30px;
      height: 30px;
    }

    .content {
      flex-grow: 1;
    }
  }
}
</style>
