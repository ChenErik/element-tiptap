<script lang="ts" setup>
import { inject, ref } from 'vue'
import { editorKey } from '../../utils'
import MenuItem from '../components/MenuItem.vue'
interface Props {
  title: string
  icon: string
}
withDefaults(defineProps<Props>(), {
  title: '字体颜色',
  icon: 'font-color',
})

const editor = inject(editorKey)!()

interface ColorList {
  hex: string
}
function setColor(hex: string) {
  editor.value.chain().focus().setColor(hex)
}
const colorList = ref<ColorList[]>([
  {
    hex: 'green',
  },
])
</script>

<template>
  <el-popover
    placement="bottom"
    :width="200"
    trigger="click"
  >
    <template #reference>
      <MenuItem :title="title" :icon="icon" />
    </template>
    <template #default>
      <div class="color-box">
        <div v-for="item of colorList" :key="item.hex" class="color-box_item" :style="{ backgroundColor: item.hex }" />
      </div>
    </template>
  </el-popover>
</template>

<style lang="less">
  .color-box {
    &_item {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
</style>
