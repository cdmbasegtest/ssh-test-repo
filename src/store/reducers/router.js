import { routerReducer } from 'react-router-redux'
import { parse } from 'qs'

import get from 'lodash/get'
import merge from 'lodash/merge'

export default (state, action) => {
  const nextState = routerReducer(state, action)

  if (nextState === state || nextState.location === null) {
    return nextState
  }

  return merge({}, nextState, {
    prevLocation: state.location,
    location: {
      query: parse(get(action.payload, 'search', '').substr(1))
    }
  })
}
