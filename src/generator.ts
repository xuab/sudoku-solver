import { shuffle } from 'lodash'
import { uniq, object, rand } from './utils'
import { digits, squares } from './data'
import { assign } from './solver'

// make a random grid with n assignments. restart on contradictions
export function createGrid(n = 17): string {
  const values = object(squares, (_) => digits)
  for (const s of shuffle(squares)) {
    if (!assign(values, s, rand(values[s]))) break
    const ds = squares
      .filter((s) => values[s].length === 1)
      .map((s) => values[s])
    if (ds.length >= n && uniq(ds).length >= 8)
      return squares
        .map((s) => (values[s].length === 1 ? values[s] : '.'))
        .join('')
  }
  return createGrid(n)
}
