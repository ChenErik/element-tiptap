<script lang="ts" setup>
interface MenuBarProps {
  items: MenuItemProps[]
}
defineProps<MenuBarProps>()
</script>

<template>
  <div class="menu-bar">
    <template v-for="(item, index) in items">
      <div v-if="item.type === 'divider'" :key="`divider${index}`" class="divider" />
      <component :is="item.render" v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

-
<style lang="less" scoped>
  .menu-bar {
    display: flex;
    align-items: center;

    .divider {
      width: 2px;
      height: 1.25rem;
      background-color: rgba(#000, 0.1);
      margin-left: 0.5rem;
      margin-right: 0.75rem;
    }
  }
</style>
