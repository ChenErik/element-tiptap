import type { Editor } from '@tiptap/vue-3'
import type { InjectionKey, ShallowRef } from 'vue'
/* provide editor key */
export const editorKey: InjectionKey<() => ShallowRef<Editor>> = Symbol('TiptapEditor')

export function getUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0 // 取整
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString()
  })
}
