<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import * as d3 from 'd3'
import { onMounted, ref } from 'vue'
import { getUuid } from '../../utils/index'
const props = defineProps(nodeViewProps)
const getRandomElement = (list: string[]) => {
  return list[Math.floor(Math.random() * list.length)]
}
const color = ref<string>(getRandomElement([
  '#A975FF',
  '#FB5151',
  '#FD9170',
  '#FFCB6B',
  '#68CEF8',
  '#80CBC4',
  '#9DEF8F',
]))
const size = ref<number>(2)
const svg = ref<d3.Selection<SVGAElement, unknown, null, undefined>>()
const path = ref<d3.Selection<SVGPathElement, [number, number][], null, undefined>>()
const points = ref<[number, number][]>([])
const drawing = ref<boolean>(false)
const id = ref<string>(getUuid())
const canvas = ref<SVGAElement>()
const width = ref<string>('100%')
const height = ref<string>('300px')
function clear() {
  props.updateAttributes({
    lines: [],
  })
}
function tick() {
  requestAnimationFrame(() => {
    path.value?.attr('d', (dPoints: [number, number][]) => {
      const dPath = d3.line().curve(d3.curveBasis)(dPoints)
      const lines = props.node.attrs.lines.filter((item: any) => item.id !== id.value)
      props.updateAttributes({
        lines: [
          ...lines,
          {
            id: id.value,
            color: color.value,
            size: size.value,
            path: dPath,
          },
        ],
      })
      return dPath
    })
  })
}
function onEndDrawing() {
  svg.value?.on('mousemove', null)
  svg.value?.on('touchmove', null)
  if (!drawing.value)
    return

  drawing.value = false
  svg.value?.select(`#id-${id.value}`).remove()
  id.value = getUuid()
}
function onMove(event: MouseEvent) {
  event.preventDefault()
  points.value.push(d3.pointers(event)[0])
  tick()
}
function onStartDrawing(event: MouseEvent) {
  drawing.value = true
  points.value = []
  path.value = svg.value?.append('path')
    .data([points.value])
    .attr('id', `id-${id.value}`)
    .attr('stroke', color.value)
    .attr('stroke-width', size.value)
  const moveEvent = event.type === 'mousedown'
    ? 'mousemove'
    : 'touchmove'
  svg.value?.on(moveEvent, onMove)
}
onMounted(() => {
  svg.value = d3.select(canvas.value!)
  svg.value
    .on('mousedown', onStartDrawing)
    .on('mouseup', onEndDrawing)
    .on('mouseleave', onEndDrawing)
    .on('touchstart', onStartDrawing)
    .on('touchend', onEndDrawing)
    .on('touchleave', onEndDrawing)
})
</script>

<script lang="ts">
export default {
  name: 'Paper',
}
</script>

<template>
  <NodeViewWrapper class="draw">
    <el-popover
      :visible="editor.isActive('paper')"
      placement="top"
      width="max-content"
      trigger="click"
      :teleported="false"
    >
      <template #reference>
        <svg ref="canvas" class="draw-svg" viewBox="0 0 100 100" :style="{ width, height }">
          <template v-for="item in node.attrs.lines">
            <path
              v-if="item.id !== id"
              :id="`id-${item.id}`"
              :key="item.id"
              class="draw-svg_path"
              :d="item.path"
              :stroke="item.color"
              :stroke-width="item.size"
            />
          </template>
        </svg>
      </template>
      <template #default>
        <div class="draw-params">
          <div class="draw-params-block">
            <span class="demonstration">线条颜色:</span>
            <el-color-picker v-model="color" />
          </div>
          <div class="draw-params-block">
            <span class="demonstration">线条粗细:</span>
            <input
              v-model="size"
              class="cus-input"
              type="number"
              min="1"
              max="10"
            >
          </div>
          <div class="draw-params-block">
            <span class="demonstration">宽度:</span>
            <input
              v-model="width"
              class="cus-input"
              placeholder="请输入宽度"
            >
          </div>
          <div class="draw-params-block">
            <span class="demonstration">高度:</span>
            <input
              v-model="height"
              class="cus-input"
              placeholder="请输入高度"
            >
          </div>
          <div class="draw-params-block">
            <el-button type="primary" link @click="clear">
              清空画布
            </el-button>
          </div>
        </div>
      </template>
    </el-popover>
  </NodeViewWrapper>
</template>

<style lang="less">
.draw {
  position: relative;

  &-svg {
    display: block;
    background: #f1f3f5;
    cursor: crosshair;

    path {
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  .cus-input {
    height: 22px;
    outline: none;
    border: 1px solid #dcdfe6;
    padding: 0 10px;
    border-radius: 4px;
    width: 100px;
  }

  .draw-params {
    display: flex;
    align-items: center;
    gap: 10px;

    .draw-params-block {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      .demonstration {
        margin-right: 16px;
      }
    }
  }
}
</style>
