import { chunks } from './utils'
import { squares } from './data'
import { Values } from './types'

// display values as a 2d grid
export function display(values: Values) {
  const width = 1 + Math.max(...squares.map((s: string) => values[s].length))
  const hr = `\n${Array(3)
    .fill('-'.repeat(width * 3))
    .join('-+-')}\n`
  const lines = chunks(
    chunks(Object.values(values), 9).map((l) => chunks(l, 3)),
    3,
  )
  
  const output = lines
    .map((line) =>
      line
        .map((cells) =>
          cells
            .map((cell) => cell.map((s) => s.padEnd(width)).join(''))
            .join(' | '),
        )
        .join('\n'),
    )
    .join(hr)
  console.log(output + '\n')
}
