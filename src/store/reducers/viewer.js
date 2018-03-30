import get from 'lodash/get'

import { formatKey } from 'helpers/cookies'
import { createReducer } from 'helpers/redux'

import { AUTH_JWT_TOKEN } from 'constants/cookiesKeys'

import { AUTHENTICATE, LOG_OUT } from 'actions/auth'
import { LOAD_VIEWER } from 'actions/viewer'

import { COOKIES_REHYDRATE } from 'actions/persist'

const initialState = {
  id: null,
  JWTToken: null,
  isLoaded: false
}

const parseCookies = (state, { payload }) => {
  const token = get(payload, formatKey(AUTH_JWT_TOKEN))

  return {
    ...state,
    JWTToken: token || null
  }
}

const loadViewer = (state, { payload }) => ({
  ...state,
  id: payload.data.meta['/user'].data[0].id,
  viewer: payload.data.users[payload.data.meta['/user'].data[0].id],
  isLoaded: true
})

const authSuccess = (state, { payload }) => ({
  ...state,
  JWTToken: payload
})

const handlers = {
  [COOKIES_REHYDRATE]: parseCookies,

  [AUTHENTICATE.SUCCESS]: authSuccess,
  [AUTHENTICATE.FAILURE]: () => initialState,

  [LOAD_VIEWER.SUCCESS]: loadViewer,

  [LOG_OUT]: () => initialState
}

export default createReducer(initialState, handlers)
