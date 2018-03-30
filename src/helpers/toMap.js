export default array => {
  const map = new Map()
  array.forEach(elem => {
    map.set(elem.id, elem)
  })
  return map
}
