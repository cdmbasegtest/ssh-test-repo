import { createSelector } from 'reselect'

import { AUTH_JWT_TOKEN } from 'constants/cookiesKeys'

import { getJWTToken } from './viewer'

export const cookiesSelector = createSelector(getJWTToken, JWTToken => ({
  [AUTH_JWT_TOKEN]: JWTToken
}))
