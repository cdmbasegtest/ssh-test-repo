import Auth0Lock from 'auth0-lock'

import { createAsyncAction } from 'helpers/redux'

import { auth0 } from 'constants/config'

import { getCurrentHash } from 'store/reducers/selectors/router'

export const LOG_OUT = 'auth/LOG_OUT'
export const logOut = () => ({
  type: LOG_OUT
})

export const AUTHENTICATE = createAsyncAction('auth/AUTHENTICATE')
export const authenticate = () => (dispatch, getState) => {
  const lock = new Auth0Lock(auth0.clientId, auth0.domain, {
    auth: {
      params: {
        scope: 'openid email',
        audience: auth0.audience
      }
    }
  })

  lock.on('authenticated', ({ accessToken }) => {
    dispatch({
      type: AUTHENTICATE.SUCCESS,
      payload: accessToken
    })
  })

  lock.on('authorization_error', response =>
    dispatch({
      type: AUTHENTICATE.FAILURE,
      payload: response
    })
  )

  if (!getCurrentHash(getState())) {
    dispatch({ type: AUTHENTICATE.REQUEST })
    lock.show()
  }
}
