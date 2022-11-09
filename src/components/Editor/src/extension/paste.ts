import { Extension } from '@tiptap/vue-3'
import { Plugin, PluginKey } from 'prosemirror-state'
import { fileStore } from '../utils/store'
export const EventHandler = Extension.create({
  name: 'eventHandler',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('eventHandler'),
        props: {
          handlePaste(view, event, _slice) {
            // console.log('view', view)
            // console.log('event', event)
            // console.log('slice', slice)
            if (!(event.clipboardData && event.clipboardData.items))
              return

            for (let i = 0, len = event.clipboardData.items.length; i < len; i++) {
              const item = event.clipboardData.items[i]
              if (item.kind === 'file')
                fileStore.value = item.getAsFile()
            }
          },
        },
      }),
    ]
  },
})
