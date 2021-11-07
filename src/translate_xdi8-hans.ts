import { try_match, replace_map_reverse, clean_all_ch } from './utils'
import { hans as table0, hans_hqf as table1 } from '@narejs/xdi8-dict'
import { lcut } from '@narejs/jieba'

const BRACKETS = ['(', '[', '"', '\'', '\{']
const SPECIAL_CH_PATTERN = /^\!|\"|\#|\$|\%|\&|\'|\(|\)|\*|\+|\,|\-|\.|\/|\:|\;|\<|\=|\>|\?|\@|\[|\\|\]|\^|\_|\`|\{|\¦|\}|\~|\､$/
const SPECIAL_CH_PATTERN2 = /^\“|\”|\《|\》|\；|\：|\‘|\’|\【|\】|\？|\！|\…|\。|\，|\、|\·$/
export function translateFrom(source: string, split = false, table = 0, hmm = false): string {
  source = (split ? lcut(source, hmm).join(" ") : source.split("").join(" "))
  const pattern = (table == 0 ? table0 : table1) as Record<string, string>

  for (let [f, t] of Object.entries(pattern)) {
    if (t == null) continue
    t = t.toString()
    if (SPECIAL_CH_PATTERN.test(t.slice(0,1))) {
      source = source.replaceAll(split ? new RegExp(`(.)${f}`, 'g') : f, t)
    } else {
      source = source.replaceAll(f, !split ? ' ' + t : t)
    }
  }
  if (!split) source = source.slice(1)
  source = source.replaceAll('\n ', '\n')
  source = source.replaceAll(/\s+/g, ' ')

  for (const i of BRACKETS) source = source.replaceAll(i + " ", " " + i)
  return source
}

export enum ReplaceMode {
  Shortest = 0,
  Longest = 1
}

export function translateTo(source: string, table = 0, mode: ReplaceMode = 1, with_space = false): string {
  if (mode == 1) {
    const pattern = table == 0 ? table0 : table1
    const r = replace_map_reverse(source, pattern)
    return with_space ? r : r.split(' ').join('')
  } else {
    const pattern = Object.entries(table == 0 ? table0 : table1)
    const r = try_match(source, v => {
      if (SPECIAL_CH_PATTERN.test(v) || SPECIAL_CH_PATTERN2.test(v) || v.trim() == "") return v.trim()
      else {
        const r = pattern.filter(p => (p as any)[1]?.toString() === v)
        if (r != null) return r[0]?.toString() ?? v
        else return false
      }
    }).join("")
    return with_space ? r : r.split(' ').join('')
  }
}