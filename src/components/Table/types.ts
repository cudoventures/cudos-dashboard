export type Column = {
  key: string
  label: string
  sortKey?: string
  align?: 'center' | 'right' | 'left' | 'inherit' | 'justify' | undefined
  sort?: boolean
  color?: string
  width?: number
  colSpan?: number
}
