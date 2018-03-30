import every from 'lodash/every'
import includes from 'lodash/includes'
import invariant from 'invariant'

const validKeys = ['type', 'payload', 'error', 'meta']

const isValidKey = (_, key) => includes(validKeys, key)
const isFSA = action => every(action, isValidKey)

export default () => next => action => {
  invariant(isFSA(action), `Not a FSA: ${JSON.stringify(action)}`)
  return next(action)
}
