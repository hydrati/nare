import { td, td2 } from '@narejs/xdi8-dict'

import { clean_all_ch, replace_map, ARROW } from './utils'


export function translateTo(source: string): string {
  return replace_map(source, td)
}

export function translateFrom(source: string): string {
  return replace_map(clean_all_ch(source, ARROW), td2)
}
