export * as Kana from './translate_xdi8-kana'
export * as Hans from './translate_xdi8-hans'
export * as Tidai from './translate_xdi8-td'
export * as IPA from './translate_xdi8-ipa'

export * as Emoji from './translate_xdi8-emoji'
export * as Hanxie from './translate_xdi8-hanxie'
export * as Number from './translate_xdi8-number'
export * as Braille from './translate_xdi8-braille'

export * as Morse from './translate_xdi8-morse'
export * as Ulang from './translate_xdi8-ulang'
export * as Pua from './translate_xdi8-pua'
export * as Pinyin from './translate_xdi8-pinyin'
export * as Zhuyin from './translate_xdi8-zhuyin'

export * as North from './translate_xdi8-north-new'
export * as NorthOld from './translate_xdi8-north-old'

import { copyright as _copyright } from '@narejs/xdi8-dict'

export const copyright: Record<string, string> = _copyright