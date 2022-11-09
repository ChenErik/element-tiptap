<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { ref } from 'vue'
import { TipEditor } from './components/index'

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const editorRef = ref<typeof TipEditor>()
const pasteFile = async (file: File) => {
  console.log(file)
  editorRef.value?.editor?.chain().focus().setImage({ src: 'https://cn.vitejs.dev/logo-with-shadow.png' }).run()
}
</script>

<template>
  <div class="vv-logo">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>
  </div>
  <TipEditor ref="editorRef" @pasteFile="pasteFile" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
