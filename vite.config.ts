import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: 'types/components.d.ts',
    }),
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'), // 指定组件编译入口文件
      name: 'TipEditor',
      fileName: 'tip-editor',
    }, // 库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    }, // rollup打包配置
  },
})
