/* eslint no-unexpected-multiline: 0 */
import normalize from 'jsonapi-normalizer'
import normalizeAlt from 'json-api-normalizer'

import assign from 'lodash/assign'
import get from 'lodash/get'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'
import { Subject } from 'rxjs/Subject'
import request from 'superagent'

import qs from 'qs'

import config from 'constants/config'

import { API_CALL } from './ids'

import { getJWTHeader } from 'store/reducers/selectors/viewer'

import { logOut } from 'actions/auth'

const sendMethod = HTTPMethod =>
  HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch'
    ? 'send'
    : 'query'

const sendArguments = (HTTPMethod, query) =>
  HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch'
    ? JSON.stringify(query)
    : qs.stringify(query, { arrayFormat: 'brackets' })

const apiCall = (
  url = config.api.url,
  endpoint = '',
  method = 'GET',
  query = {},
  headers = {}
) => {
  const subject = new Subject()
  const HTTPMethod = method.toLowerCase()

  request
    [HTTPMethod](url + endpoint)
    [sendMethod(HTTPMethod)](sendArguments(HTTPMethod, query))
    .set(headers)
    .end((error, data) => {
      if (isEmpty(data) || data.body === null) {
        merge(data, { body: { data: [] } })
      }

      if (error) {
        subject.error({ data, error })
      } else {
        subject.next({ rawData: data, method: HTTPMethod })
        subject.complete()
      }
    })

  return subject
}

const nextAction = (action, data) => {
  const next = merge({}, action, data)
  delete next[API_CALL]
  return next
}

export default store => next => action => {
  if (action.type !== API_CALL || !action.fields) return next(action)

  const { url, alt, endpoint, headers, method, query, types } = action.fields

  const signature = Date.now()
  const JWTHeader = getJWTHeader(store.getState())
  const completeHeaders = assign(
    { 'Content-Type': 'application/vnd.api+json' },
    JWTHeader && (!url || url === config.api.url)
      ? { Authorization: JWTHeader }
      : {},
    headers
  )

  const fsaFields = pick(action.fields, 'payload', 'error', 'meta')
  const isLoadRequest =
    !method ||
    method.toUpperCase() === 'GET' ||
    method.toUpperCase() === 'PATCH' ||
    method.toUpperCase() === 'POST'

  next(
    nextAction(fsaFields, {
      type: types.REQUEST,
      meta: merge({ signature }, isLoadRequest && { endpoint, isRequest: true })
    })
  )

  const subject = new Subject()
  const apiRequest = apiCall(url, endpoint, method, query, completeHeaders)

  const onError = rawData => {
    const payload = get(rawData, 'data.body') || {}

    const data = {
      payload,
      type: types.FAILURE,
      meta: {
        signature,
        httpCode: rawData.error.status,
        isNetworkFailure: !rawData.error.status
      },
      error: true
    }

    if (rawData.error.status === 401) {
      store.dispatch(logOut())
    }

    next(nextAction(fsaFields, data))

    subject.error({
      httpCode: rawData.error.status,
      isNetworkFailure: !rawData.error.status,
      ...payload
    })
  }

  const onSuccess = ({ rawData, method }) => {
    const normalizer = alt ? normalizeAlt : normalize
    const normalized = normalizer(get(rawData, 'body'), {
      endpoint,
      camelizeKeys: false
    })

    const meta = merge(
      { signature },
      isLoadRequest && { endpoint, isSuccess: true }
    )

    const deletedId = //if there is a delete it will attach ID of deletable item to the payload for easy removal it from store
      method.toUpperCase() === 'DELETE'
        ? endpoint.substring(endpoint.lastIndexOf('/') + 1, endpoint.length)
        : null

    let payload = alt ? { data: normalized } : normalized
    payload = alt && deletedId !== null ? { ...payload, deletedId } : payload

    const data = { meta, payload, type: types.SUCCESS }

    next(nextAction(fsaFields, data))

    subject.next(payload)
    subject.complete()
  }

  apiRequest.subscribe(onSuccess, onError)

  return subject
}
