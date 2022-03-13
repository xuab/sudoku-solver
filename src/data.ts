import { uniq, object, cross, chunks } from './utils'
import { Units, Peers } from './types'

export const digits = '123456789'

const rows = [...'ABCDEFGHI']
const cols = [...'123456789']
const rowChunks = chunks(rows, 3)
const colChunks = chunks(cols, 3)

// squares = A1, A2, A3... I9
export const squares = cross(rows, cols)

// unit = column, row, or box
export const unitList = [
  ...cols.map((c) => cross(rows, [c])),
  ...rows.map((r) => cross([r], cols)),
  ...rowChunks.flatMap((rowChunk) =>
    colChunks.map((colChunk) => cross(rowChunk, colChunk)),
  ),
]

// units = dictionary where each square maps to the list of units that contain the square
export const units: Units = object(squares, (s: string) =>
  unitList.filter((unit) => unit.includes(s)),
)

// peers = dictionary where each square s maps to the set of squares formed by the union of the squares in the units of s, but not s itself
export const peers: Peers = object(squares, (a) => uniq(units[a].flat().filter((b) => a !== b)))

// return a dictionary of { square: char }
export function parse(grid: string) {
  if (grid.length !== 81) throw new Error('Grid format error')
  return object(squares, (_, i) => grid[i])
}
