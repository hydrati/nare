import { try_match } from './utils'
import { hans as table0, hans_hqf as table1 } from '@narejs/xdi8-dict'

// For Browsers
let ALLOW_JIEBA = typeof globalThis?.process?.versions?.node === "string" || typeof globalThis?.require === "function"
let source_cut: (text: string) => string[];
if (ALLOW_JIEBA) {
  try {
    const { cut } = require('@node-rs/jieba')
    if (typeof cut !== "function") throw new Error()
    else source_cut = cut
  } catch {
    ALLOW_JIEBA = !ALLOW_JIEBA
  }
}

const BRACKETS = ['(', '[', '"', '\'', '\{']
const SPECIAL_CH_PATTERN = /^\!|\"|\#|\$|\%|\&|\'|\(|\)|\*|\+|\,|\-|\.|\/|\:|\;|\<|\=|\>|\?|\@|\[|\\|\]|\^|\_|\`|\{|\¦|\}|\~|\､$/
const SPECIAL_CH_PATTERN2 = /^\“|\”|\《|\》|\；|\：|\‘|\’|\【|\】|\？|\！|\…|\。|\，|\、|\·$/
export function translateFrom(source: string, split = false, table = 0): string {
  source = (split && ALLOW_JIEBA ? source_cut!(source).join(" ") : source.split("").join(" "))
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

  for (const i of BRACKETS) source = source.replaceAll(i + " ", " " + i)
  return source
}

export function translateTo(source: string, table = 0): string {
  const pattern = Object.entries(table == 0 ? table0 : table1)
  return try_match(source, v => {
    if (SPECIAL_CH_PATTERN.test(v) || SPECIAL_CH_PATTERN2.test(v) || v.trim() == "") return v.trim()
    else {
      const r = pattern.find(p => (p as any)[1]?.toString() === v)
      if (r != null) return r[0]?.toString() ?? v
      else return false
    }
  }).join("")
}