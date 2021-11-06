import { ipa } from '@narejs/xdi8-dict'
import { try_match } from './utils'

const keys = Object.keys(ipa)

export function translateTo(source: string) {
  return try_match(source, v => { 
    if (keys.includes(v)) return (ipa as any)[keys[keys.indexOf(v)]]
    else return false
  }).join("")
}