export {};
declare global {
  interface MenuItemProps {
    type?: string
    icon?: string
    title: string
    action?: () => boolean
    isActive?: () => boolean
    render?: any
    divided?: boolean
    list?: MenuItemProps[]
    disabled?:()=>boolean
  }
}
