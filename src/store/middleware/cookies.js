import forEach from 'lodash/forEach'

import { set, remove } from 'helpers/cookies'

const expires = 365
const secure = process.env.NODE_ENV !== 'development'

export default selector => store => next => action => {
  next(action)
  forEach(selector(store.getState()), (value, key) => {
    if (value) {
      set(key, value, { expires, secure })
    } else {
      remove(key)
    }
  })
}
