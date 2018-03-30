import insert from '../insert'

test('insert test', () => {
  const input = [1, 2, 3, 4, 5]
  const result = insert(input, 2, 6)
  expect(result[2]).toEqual(6)
})

test("insert with out of range index doesn't work", () => {
  const input = [1, 2, 3, 4, 5]
  const result = insert(input, 10, 6)
  expect(result[10]).toEqual(undefined)
})
