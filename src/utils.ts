export const uniq = <T>(l: Array<T>) => [...new Set(l)]

export const object = <T, D>(l: Array<T>, f: (x: T, i: number) => D) =>
  Object.fromEntries(l.map((x, i) => [x, f(x, i)]))

export const cross = <T>(a: Array<T>, b: Array<T>) => a.flatMap((x) => b.map((y) => `${x}${y}`))

export const chunks = <T>(l: Array<T>, n: number) =>
  [...Array(Math.ceil(l.length / n)).keys()].map((i) =>
    l.slice(i * n, i * n + n),
  )

export const rand =  <T>(l: Array<T>) => l[Math.floor(Math.random() * l.length)]
