<script lang="ts" setup>
import { inject, ref } from 'vue'
import { editorKey } from '../../utils'
import MenuItem from '../components/MenuItem.vue'
import { getEmojis } from './emoji'
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

const emojiList = ref<string[]>(getEmojis())
function setEmoji(emoji: string) {
  editor.value.chain().focus().insertContent(emoji).run()
}
</script>

<template>
  <el-popover
    v-model:visible="popoverVisible"
    placement="bottom"
    :width="365"
    trigger="click"
  >
    <template #reference>
      <MenuItem :title="title" :icon="icon" />
    </template>
    <template #default>
      <div class="color-box">
        <div v-for="item in emojiList" :key="item" class="color-box_item" @click="setEmoji(item)">
          {{ item }}
        </div>
      </div>
    </template>
  </el-popover>
</template>

<style lang="less">
  .color-box {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    width: 100%;
    gap: 10px;

    &_item {
      font-size: 22px;
      transition: all 200ms linear;
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
</style>
