export const ARROW = '⇧'

export function replace_map(source: string, map: Record<string, string>): string {
  for (const [f, t] of Object.entries(map).sort((a, b) => b[0].length - a[0].length)) source = source.replaceAll(f, t)
  return source
}

export function replace_map_reverse(source: string, map: Record<string, string>): string {
  for (const [f, t] of Object.entries(map).sort((a, b) => b[1].length - a[1].length)) source = source.replaceAll(t, f)
  return source
}

export function clean_all_ch(source: string, ...ch: (string|RegExp)[]): string {
  for (const i of ch) source = source.replaceAll(i, '')
  return source
}

export interface IFilter { (value: string): false | string }
export function try_match(source: string, filter: IFilter): string[] {
  let f = 0, t = 1, s: string[] = []
  while (f < t && t <= source.length) {
    
    const r = filter(source.slice(f, t))
    // console.log(f, t, s, source.slice(f, t), r)
    if (r !== false) {
      f = t
      s.push(r)
    }
    t += 1
  }
  return s
}

