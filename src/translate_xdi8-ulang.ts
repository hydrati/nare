import { ulang as ut } from '@narejs/xdi8-dict'

function fill_array<T>(s: T[], v: T, l: number): T[] {
  while(s.length <= l) {
    s.unshift(v)
  }
  return s
}

export function translateTo(source: string): string {
  return source
    .split("")
    .map(v => v.charCodeAt(0).toString(16))
    .map(
      v => fill_array(v.split("")
      .map(v => parseInt("0x" + v))
      , 0, 5)
        .map((v, i) =>  ut[i % 2][v][0])
        .join("")
    )
    .join(" ")
}

export function translateFrom(source: string): string {
  return source.split(" ")
  .map(
    v => parseInt(v.split("")
      .map((v, i) => {
        const f = ut[i % 2].findIndex((p: string[]) => p[0] == v || p[1] == v)
        if (f == -1) throw new Error("Invalid Syntax (Xdi8 U)")
        return f.toString(16)
      }
      ).join(""), 16)
  ).map(v => String.fromCharCode(v)).join('')
}
