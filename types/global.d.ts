export {};
declare global {
  interface MenuItemProps {
    type?: string
    icon?: string
    activeIcon?:string
    title: string
    action?: () => boolean
    isActive?: () => boolean
    render?: any
    divided?: boolean
    list?: MenuItemProps[]
    disabled?:()=>boolean
  }
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highLightBlock: {
      setHighlightBlock: (attributes?: { language: string }) => ReturnType,
    }
  }
}
