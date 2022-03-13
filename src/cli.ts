import fs from 'fs'
import { PerformanceObserver, performance } from 'perf_hooks'

import { object, rand } from './utils'
import { solve } from './solver'
import { createGrid } from './generator'
import { parse } from './data'
import { display } from './display'

const difficulty = process.argv[2]

const obs = new PerformanceObserver((items) => {
  for (const entry of items.getEntries()) {
    const { duration, name } = entry
    console.log(`${name} in ${Math.round(duration)} ms`)  
  }
  performance.clearMarks()
})

obs.observe({ entryTypes: ['measure'] })

let grid

if (['hard', 'medium', 'easy'].includes(difficulty)) {
  console.log(`Difficulty: ${difficulty}\n`)
  const grids = fs.readFileSync(`src/grids/${difficulty}.txt`, { encoding: 'utf-8' }).trim().split('\n')
  grid = rand(grids)
} else {
  const n = parseInt(difficulty)
  if (isNaN(n) || n < 0 || n > 70) throw new Error(`Argument error: ${difficulty}`)
  console.log(`Difficulty: ${difficulty}\n`)
  performance.mark('A')
  grid = createGrid(n)
  performance.mark('B')
  performance.measure('Generated', 'A', 'B')
}

const values = parse(grid)
display(values)
performance.mark('C')
const solved = solve(values)
performance.mark('D')
if (solved) display(solved)
performance.measure('Solved', 'C', 'D')
