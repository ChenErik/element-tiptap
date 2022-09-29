<script lang="ts" setup>
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { onMounted, ref } from 'vue'
const props = defineProps(nodeViewProps)
const dragModelRef = ref<HTMLDivElement>()
const imageWidth = ref<string>('100%')
const imageHeight = ref<string>('auto')
function drag(dragDot: HTMLSpanElement) {
  dragDot.onmousedown = function (ev: MouseEvent) {
    ev.stopPropagation()

    const oldWidth = dragModelRef.value?.offsetWidth ?? 0
    const oldHeight = dragModelRef.value?.offsetHeight ?? 0
    const oldX = ev.clientX
    const oldY = ev.clientY
    const oldLeft = dragModelRef.value?.offsetLeft ?? 0
    const oldTop = dragModelRef.value?.offsetTop ?? 0
    const classList = Array.from(dragDot.classList)
    document.onmousemove = function (gEv: MouseEvent) {
      if (!dragModelRef.value)
        return false
      let disY = (oldTop + (gEv.clientY - oldY))
      let disX = (oldLeft + (gEv.clientX - oldLeft))
      if (disX > oldLeft + oldWidth)
        disX = oldLeft + oldWidth
      if (disY > oldTop + oldHeight)
        disY = oldTop + oldHeight
      if (classList.includes('br')) {
        imageWidth.value = `${oldWidth + (gEv.clientX - oldX)}px`
        imageHeight.value = `${oldHeight + (gEv.clientY - oldY)}px`
      }
      else if (classList.includes('b')) {
        imageHeight.value = `${oldHeight + (gEv.clientY - oldY)}px`
      }
      else if (classList.includes('r')) {
        imageHeight.value = `${oldHeight}px`
        imageWidth.value = `${oldWidth + (gEv.clientX - oldX)}px`
      }
    }
    document.onmouseup = function () {
      document.onmousemove = null
    }
    return false
  }
}
function initDrag() {
  const dragDots = dragModelRef.value?.getElementsByTagName('span') ?? []
  for (let i = 0; i < dragDots?.length; i++)
    drag(dragDots[i])
}
onMounted(() => {
  initDrag()
})
</script>

<script lang="ts">
export default {
  name: 'ImageDrag',
}
</script>

<template>
  <NodeViewWrapper class="image-content" :style="{ textAlign: props.node.attrs.textAlign }">
    <div class="image-drag" contenteditable="false">
      <div ref="dragModelRef" class="drag-model">
        <span class="r" />
        <span class="l" />
        <span class="t" />
        <span class="b" />
        <span class="br" />
        <span class="bl" />
        <span class="tr" />
        <span class="tl" />
        <div
          class="inner"
          :draggable="true"
          data-drag-handle
        />
      </div>
      <img :style="{ width: imageWidth, height: imageHeight }" :src="props.node.attrs.src">
    </div>
  </NodeViewWrapper>
</template>

<style lang="less" scoped>
.image-content {
  //   display: inline-block;

  .image-drag {
    position: relative;
    width: max-content;
    display: inline-block;

    .drag-model {
      position: absolute;
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      /* 四边 */
      .t,
      .b,
      .l,
      .r {
        position: absolute;
        z-index: 1;
        background: #68cef8;
      }

      .l,
      .r {
        width: 4px;
        height: 100%;
        cursor: col-resize;
      }

      .t,
      .b {
        width: 100%;
        height: 4px;
        cursor: row-resize;
      }

      .t {
        top: 0;
        left: 0;
      }

      .b {
        bottom: 0;
        left: 0;
      }

      .l {
        left: 0;
      }

      .r {
        right: 0;
      }

      /* 四角 */
      .tl,
      .br {
        width: 8px;
        height: 8px;
        position: absolute;
        background: #fff;
        border: 1px solid #68cef8;
        z-index: 2;
        cursor: nwse-resize;
      }

      .tl,
      .bl {
        left: -2px;
      }

      .tr,
      .br {
        right: -2px;
      }

      .br,
      .bl {
        bottom: -2px;
      }

      .tl,
      .tr {
        top: -2px;
      }

      .tr,
      .bl {
        cursor: nesw-resize;
      }

      /* 内核 */
      .inner {
        width: 100%;
        height: 100%;
      }
    }

    img {
      display: block;
      box-sizing: border-box;
    }
  }
}
</style>
