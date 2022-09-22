<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import remixiconUrl from '../../utils/remixicon.symbol.svg'
import { useTippy } from '../../utils/useTippy'
interface MenuItemProps {
  icon?: string
  title: string
  action?: () => boolean
  isActive?: () => boolean
  // disabled?: () => boolean
}
const props = defineProps<MenuItemProps>()
const iconUrl = ref(remixiconUrl)
const menuItemRef = ref<HTMLButtonElement>()
onMounted(() => {
  useTippy(menuItemRef.value!, props.title)
})
</script>

<template>
  <button
    ref="menuItemRef"
    class="menu-item"
    :class="{ 'is-active': isActive ? isActive() : null }"
    @click="action"
  >
    <svg class="remix">
      <use :xlink:href="`${iconUrl}#ri-${icon}`" />
    </svg>
  </button>
</template>

<style lang="less" scoped>
.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #595959;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active {
    background-color: var(--el-color-primary);
    color: #fff;
  }

  &:hover {
    color: #595959;
    background-color: var(--el-color-primary-light-9);
  }
}
</style>
