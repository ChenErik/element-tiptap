import { Extension } from '@tiptap/vue-3'
import { Plugin, PluginKey } from 'prosemirror-state'

export const EventHandler = Extension.create({
  name: 'eventHandler',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('eventHandler'),
        props: {
          handlePaste(view, event, slice) {
            console.log('view', view)
            console.log('event', event)
            console.log('slice', slice)
          },
        },
      }),
    ]
  },
})
