import { object } from './utils'
import { digits, squares, units, peers } from './data'
import { Values } from './types'

// return a dictionary of possible values { square: digits } or false if a contradiction is detected
export function constrain(initialValues: Values) {
  // every square can be any digit
  const values = object(squares, (_) => digits)
  for (const [s, d] of Object.entries(initialValues)) {
    if (d === '.') continue
    // fail if we can't assign d to square s
    if (!assign(values, s, d)) return false
  }
  return values
}

// eliminate all the other values (except d) from values[s] and propagate
// return values or false if a contradiction is detected
export function assign(values: Values, s: string, d: string) {
  const otherValues = [...values[s].replace(d, '')]
  return otherValues.every((d2) => eliminate(values, s, d2)) ? values : false
}

// propagate when values or places <= 2.
// return values or false if a contradiction is detected
export function eliminate(values: Values, s: string, d: string) {
  // already eliminated
  if (!values[s].includes(d)) return values

  // eliminate d from values[s]
  values[s] = values[s].replace(d, '')

  // contradiction: removed last value
  if (values[s].length === 0) return false

  // if a square s is reduced to one value, then eliminate this value from the peers
  if (values[s].length === 1) {
    if (!peers[s].every((s2) => eliminate(values, s2, values[s]))) {
      return false
    }
  }

  // if a unit u is reduced to only one place for a value d, then put it there
  for (const u of units[s]) {
    const places = u.filter((s) => values[s].includes(d))
    // contradiction: no place for this value
    if (places.length === 0) return false
    // can only be in one place in unit
    if (places.length === 1) {
      if (!assign(values, places[0], d)) {
        return false
      }
    }
  }

  return values
}

// using depth-first search and propagation, try all possible values
export function search(values: Values | false): Values | false  {
  // failed earlier
  if (!values) return false
  // solved
  if (squares.every((s) => values[s].length === 1)) return values
  // chose the unfilled square s with the fewest possibilities
  const [s] = squares.reduce<[string | null, number]>(
    (acc, s) => {
      if (values[s].length === 1) return acc
      if (values[s].length < acc[1]) return [s, values[s].length]
      return acc
    },
    [null, Infinity],
  )
  
  if (!s) return false
  const results = [...values[s]].map((d) => search(assign({ ...values }, s, d)))
  return results.find((r) => !!r) ?? false
}

export const solve = (values: Values) => search(constrain(values))
