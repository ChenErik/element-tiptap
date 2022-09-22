import tippy from 'tippy.js'
export function useTippy(target: Element, title: string) {
  tippy(target, {
    content: title,
    theme: 'blue',
    delay: [200, 0],
    animation: 'perspective-extreme',
    duration: [200, 200],
  })
}
