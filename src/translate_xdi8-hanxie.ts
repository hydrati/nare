import { replace_map, replace_map_reverse } from './utils'
import {hanxie as hx} from '@narejs/xdi8-dict'

export function translateTo(source: string) {
  return replace_map(source, hx)
}

export function translateFrom(source: string) {
  return replace_map_reverse(source, hx)
}