import toMap from '../toMap'

test('typical api response to map', () => {
  const result = toMap([{ id: 1, value: 2 }, { id: 2, value: 4 }])
  expect(result.get(1)).toEqual({ id: 1, value: 2 })
  expect(result.get(2)).toEqual({ id: 2, value: 4 })
})
