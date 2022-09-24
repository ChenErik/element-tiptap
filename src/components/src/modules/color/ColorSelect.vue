<script lang="ts" setup>
import { inject, ref } from 'vue'
import { editorKey } from '../../utils'
import MenuItem from '../components/MenuItem.vue'
interface Props {
  title: string
  icon: string
  type: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '字体颜色',
  icon: 'font-color',
  type: 'text',
})

const editor = inject(editorKey)!()
const popoverVisible = ref<boolean>(false)
function setColor(hex: string) {
  // const hexReg = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i
  // if (hexReg.test(hex))
  if (props.type === 'text')
    editor.value.chain().focus().setColor(hex).run()

  else
    editor.value.chain().focus().toggleHighlight({ color: hex }).run()

  popoverVisible.value = false
}
const colorList = ref<string[]>(['#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#000000'])
const colorValue = ref<string>('')
function unsetColor() {
  if (props.type === 'text')
    editor.value.chain().focus().unsetColor().run()

  else
    editor.value.chain().focus().unsetHighlight().run()
}
</script>

<template>
  <el-popover
    v-model:visible="popoverVisible"
    placement="bottom"
    :width="255"
    trigger="click"
  >
    <template #reference>
      <MenuItem :title="title" :icon="icon" />
    </template>
    <template #default>
      <div class="color-box">
        <div v-for="item in colorList" :key="item" class="color-box_item" :style="{ backgroundColor: item }" @click="setColor(item)" />
        <div class="color-box_unset" @click="unsetColor">
          +
        </div>
        <div class="color-box_custom">
          <el-input v-model="colorValue" placeholder="请输入HEX颜色" />
          <el-button
            key="primary"
            type="primary"
            link
            @click="setColor(colorValue)"
          >
            确定
          </el-button>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<style lang="less">
  .color-box {
    display: flex;
    flex-wrap: wrap;
    width: 250px;
    gap: 10px;

    &_item {
      width: 30px;
      height: 30px;
      border-radius: 4px;
      transition: all 400ms linear;
      cursor: pointer;

      &:hover {
        transform: rotate(-180deg) scale(1.2);
        border-radius: 100%;
      }
    }

    &_unset {
      width: 30px;
      height: 30px;
      border: 1px solid #0d78bc;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      transform: rotate(45deg);
      color: #0d78bc;
      transition: all 400ms linear;
      cursor: pointer;

      &:hover {
        background-color: #0d78bc;
        color: #fff;
        border-color: #fff;
      }
    }

    &_custom {
      width: 100%;
      display: flex;
      gap: 20px;

      .el-input {
        width: 71%;
      }
    }
  }
</style>
