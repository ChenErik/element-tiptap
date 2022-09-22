import type { Editor } from '@tiptap/vue-3'
import type { InjectionKey, ShallowRef } from 'vue'

export const editorKey: InjectionKey<() => ShallowRef<Editor>> = Symbol('TiptapEditor')
