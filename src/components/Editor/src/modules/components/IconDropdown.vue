<script lang="ts" setup>
import { inject } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { editorKey } from '../../utils/index'
import MenuItem from './MenuItem.vue'
interface List {
  title: string
  action?: () => boolean
  disabled?: () => boolean
  divided?: boolean
}
interface Props {
  title: string
  icon: string
  list: List[]
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
})
const editor = inject(editorKey)!()
const handleCommand = (command: List) => {
  command.action?.()
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <MenuItem :title="title" :icon="icon" />
      <el-icon class="el-icon--right">
        <ArrowDown />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item of list" :key="item" :command="item" :divided="item.divided" :disabled="item.disabled?.()">
          <div>
            {{ item.title }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="less" scoped>
:deep(.el-dropdown-link) {
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
</style>
