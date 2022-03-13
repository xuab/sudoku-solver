import { squares, unitList, units, peers } from '../data'

test('squares', () => {
  expect(squares.length).toStrictEqual(81)
})

test('units', () => {
  expect(unitList.length).toBe(27)
  expect(units['C2']).toStrictEqual([['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'], ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'], ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']])
})

test('peers', () => {
  expect(peers['C2']).toStrictEqual(['A2', 'B2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'C1', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'A1', 'A3', 'B1', 'B3'])
})