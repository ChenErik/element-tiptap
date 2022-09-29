<script lang="ts" setup>
interface List {
  label: string | number | null
  value: string | number
  disabled?: boolean
  [key: string]: any
}
interface Props {
  modelValue: string | number | boolean | null
  list: List[]
}
withDefaults(defineProps<Props>(), {
  modelValue: '',
  list: () => [],
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: List['value']): void
}>()
function selectChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <label class="select-label">
    <select class="select-label_selection" @change="selectChange">
      <option v-for="item in list" :key="item.value" :disabled="item.disabled">{{ item.label }}</option>
    </select>
  </label>
</template>

<style lang="less" scoped>
.select-label {
  position: relative;
  display: inline-block;

  &:before {
    content: '';
    height: 21px;
    position: absolute;
    right: 7px;
    top: 3px;
    width: 22px;

    //background: -webkit-linear-gradient(#fff, #f0f0f0);
    //background: -moz-linear-gradient(#fff, #f0f0f0);
    //background: linear-gradient(#f5f5f5, #e0e0e0);
    background: #fff; //for Firefox in Android
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    pointer-events: none;
    display: block;
  }

  &:after {
    content: " ";
    position: absolute;
    right: 15px;
    top: 46%;
    margin-top: -3px;
    z-index: 2;
    pointer-events: none;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6.9px 4px 0 4px;
    border-color: #aaa transparent transparent transparent;
  }

  &_selection {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0 30px 0 10px;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    line-height: 26px;
    height: 26px;
    box-shadow: inset 1px 1px 1px 0 rgba(0, 0, 0, 0.2);
    outline: none;
    background: #fff;

    //min-width: 200px;
    margin: 0 5px 5px 0;
  }
}
</style>
