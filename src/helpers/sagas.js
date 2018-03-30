import { take } from 'redux-saga/effects'

export const waitForTypes = function*(types) {
  let counter = 0

  while (true) {
    yield take(types)
    counter += 1

    if (counter === types.length) {
      break
    }
  }
}
