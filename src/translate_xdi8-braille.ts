import { replace_map, replace_map_reverse } from './utils'
import { braille as bra } from '@narejs/xdi8-dict'

export function translateTo(source: string) {
  return replace_map(source, bra)
}

export function translateFrom(source: string) {
  return replace_map_reverse(source, bra)
}