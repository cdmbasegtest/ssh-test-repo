import deepFreeze from 'deep-freeze-strict'

const freezeStoreState = store => {
  const state = store.getState()
  deepFreeze(state)
}

export default store => next => action => {
  freezeStoreState(store)

  try {
    return next(action)
  } finally {
    freezeStoreState(store)
  }
}
