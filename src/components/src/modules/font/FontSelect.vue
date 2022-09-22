<script lang="ts" setup>
import { inject, onMounted, ref, watch } from 'vue'
import { ArrowDown, Check } from '@element-plus/icons-vue'
import { editorKey } from '../../utils/index'
type Level = 1 | 2 | 3 | 4 | 5 | 6
const list: Level[] = [1, 2, 3, 4, 5, 6]
const editor = inject(editorKey)!()
const selectValue = ref('H1')
const handleCommand = (command: Level | 'paragraph') => {
  if (command === 'paragraph')
    editor.value?.chain().focus().setParagraph().run()
  else
    editor.value?.chain().focus().toggleHeading({ level: command }).run()
}
const isActive = (level: Level | 'paragraph') => {
  if (level === 'paragraph') {
    if (editor.value?.isActive('paragraph')) {
      selectValue.value = '正文'
      return true
    }
    else {
      return false
    }
  }
  else {
    if (editor.value?.isActive('heading', { level })) {
      selectValue.value = `H${level}`
      return true
    }
    else {
      return false
    }
  }
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
      {{ selectValue }}
      <el-icon class="el-icon--right">
        <ArrowDown />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item of list" :key="item" :icon="isActive(item) ? Check : null" :command="item">
          <div class="font-item" :style="{ paddingLeft: isActive(item) ? '0' : '19px' }" v-html="`<h${item}>H${item}</h${item}>`" />
        </el-dropdown-item>
        <el-dropdown-item :icon="isActive('paragraph') ? Check : null" command="paragraph">
          <p class="font-item" :style="{ paddingLeft: isActive('paragraph') ? '0' : '19px' }">
            正文
          </p>
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
