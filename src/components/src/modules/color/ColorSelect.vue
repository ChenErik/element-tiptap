<script lang="ts" setup>
import MenuItem from '../components/MenuItem.vue'
interface Props {
  title: string
  icon: string
}
withDefaults(defineProps<Props>(), {
  title: '字体颜色',
  icon: 'font-color',
})
</script>

<template>
  <el-popover
    placement="bottom"
    title="Title"
    :width="200"
    trigger="click"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <MenuItem :title="title" :icon="icon" />
    </template>
  </el-popover>
</template>

<style lang="less" scoped>

</style>
