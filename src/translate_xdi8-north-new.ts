import { replace_map, replace_map_reverse } from './utils'
import { north_new as zy } from '@narejs/xdi8-dict'

export function translateTo(source: string) {
  return replace_map(source, zy)
}

export function translateFrom(source: string) {
  return replace_map_reverse(source, zy)
}