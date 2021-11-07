export const ARROW = '⇧'

export const SORT_MT_LEN_R = (a: string[], b: string[]): number => b[1].length - a[1].length
export const SORT_LT_LEN_R = (a: string[], b: string[]): number => a[1].length - b[1].length
export const SORT_MT_LEN_L = (a: string[], b: string[]): number => b[0].length - a[0].length
export const SORT_LT_LEN_L = (a: string[], b: string[]): number => a[0].length - b[0].length

export function replace_map(
  source: string, 
  map: Record<string, string>, 
  sort?: ((a: [string, string], b: [string, string]) => number)
): string {
  for (const [f, t] of Object.entries(map).sort(sort ?? SORT_MT_LEN_R)) source = source.replaceAll(f, t)
  return source
}

export function replace_map_reverse(
  source: string, 
  map: Record<string, string>,
  sort?: ((a: [string, string], b: [string, string]) => number)
): string {
  for (const [f, t] of Object.entries(map).sort(sort ?? SORT_MT_LEN_R)) {
    // console.log(f, t);
    source = source.replaceAll(t, f)
  }
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

