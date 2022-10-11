<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import remixiconUrl from '../../utils/remixicon.symbol.svg'
import { useTippy } from '../../utils/useTippy'
interface MenuItemProps {
  icon?: string
  title: string
  action?: () => boolean
  isActive?: () => boolean
  isFullScreen?: boolean
  activeIcon?: string
  // disabled?: () => boolean
}
const props = defineProps<MenuItemProps>()
const emit = defineEmits<{
  (e: 'fullScreen', value: boolean): void
}>()
const iconUrl = ref(remixiconUrl)
const menuItemRef = ref<HTMLButtonElement>()
onMounted(() => {
  useTippy(menuItemRef.value!, props.title)
})
function editorAction() {
  if (props.title === '全屏')
    emit('fullScreen', !props.isFullScreen)
  else
    props.action?.()
}
function getIcon() {
  let i: string | undefined = ''
  if (props.title === '全屏')
    i = props.isFullScreen ? props.activeIcon : props.icon

  else
    i = props.icon

  return i
}
</script>

<template>
  <button
    ref="menuItemRef"
    class="menu-item"
    :class="{ 'is-active': isActive ? isActive() : null }"
    @click="editorAction"
  >
    <svg class="remix">
      <use :xlink:href="`${iconUrl}#ri-${getIcon()}`" />
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
