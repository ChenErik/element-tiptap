<script lang="ts" setup>
import { inject, onMounted, ref, watch } from 'vue'
import { ArrowDown, Check } from '@element-plus/icons-vue'
import { editorKey } from '../../utils/index'
const editor = inject(editorKey)!()
interface List {
  icon: string
  title: string
  action: () => boolean
  isActive: () => boolean
}
const list: List[] = [
  {
    icon: 'bold',
    title: '加粗',
    action: () => editor.value?.chain().toggleBold().focus().run(),
    isActive: () => editor.value?.isActive('bold'),
  },
  {
    icon: 'italic',
    title: '斜体',
    action: () => editor.value?.chain().focus().toggleItalic().run(),
    isActive: () => editor.value?.isActive('italic'),
  },
  {
    icon: 'align-left',
    title: '居左',
    action: () => editor.value?.chain().focus().setTextAlign('left').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'left' }),
  },
  {
    icon: 'align-center',
    title: '居中',

    action: () => editor.value?.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'center' }),
  },
  {
    icon: 'align-right',
    title: '居右',
    action: () => editor.value?.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'right' }),
  },
  {
    icon: 'strikethrough',
    title: '删除线',
    action: () => editor.value?.chain().focus().toggleStrike().run(),
    isActive: () => editor.value?.isActive('strike'),
  },
  {
    icon: 'code-view',
    title: '行内代码',
    action: () => editor.value?.chain().focus().toggleCode().run(),
    isActive: () => editor.value?.isActive('code'),
  },
]

const handleCommand = (command: List) => {
  command?.action()
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
      字体
      <el-icon class="el-icon--right">
        <ArrowDown />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item of list" :key="item" :icon="item.isActive() ? Check : null" :command="item">
          <div class="font-item" :style="{ paddingLeft: item.isActive() ? '0' : '19px' }">
            {{ item.title }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding: 7px;
  border-radius: 4px;
  width: 50px;
  overflow: hidden;
  justify-content: center;
  white-space: nowrap;

  &:hover {
    background: var(--el-color-primary-light-9);
  }
}

.font-item {
  padding: 5px 0;
}
</style>
