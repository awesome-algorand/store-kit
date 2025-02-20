import { expect, test } from 'vitest'
import { toMBR } from './objects.js'

const MBR = 100_000n
const PER_BOX = 2500n
const PER_UNIT = 400n



test('toMBR', () => {
  const encoded = new TextEncoder().encode("you")
  const KeyBytes = 6n + 4n // Add prefix
  const KeyCount = 1n
  const ValueBytes = BigInt(encoded.length)

  const expected = PER_BOX + (PER_UNIT * (KeyBytes + ValueBytes))
  expect(toMBR({heyzzz: "you"})).toBe(expected + MBR)
})
