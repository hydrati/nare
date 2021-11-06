import { replace_map, replace_map_reverse } from './utils'
import { pua } from '@narejs/xdi8-dict'

export function translateTo(source: string) {
  return replace_map(source, pua)
}

export function translateFrom(source: string) {
  return replace_map_reverse(source, pua)
}