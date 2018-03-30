import { createReducer } from 'helpers/redux'

import { LOAD_VIEWER_COMPANIES } from 'actions/viewer'
import { UPDATE_COMPANY, CREATE_COMPANY } from '../../actions/companies'

import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'

const mergeCustomizer = (objValue, srcValue) =>
  isArray(objValue) ? srcValue : undefined

const initialState = {
  items: [],

  isLoading: false,
  isLoaded: false,
  error: ''
}

const loadRequest = state => ({
  ...state,
  isLoading: true,
  isLoaded: false
})

const loadSuccess = (state, { payload }) => {
  const { companies } = payload.data
  return {
    ...state,
    items: mergeWith({}, state.items, companies, mergeCustomizer),
    isLoaded: true,
    isLoading: false
  }
}

const loadFailure = (state, { payload }) => ({
  isLoading: false,
  error: payload
})

const handlers = {
  [LOAD_VIEWER_COMPANIES.REQUEST]: loadRequest,
  [LOAD_VIEWER_COMPANIES.SUCCESS]: loadSuccess,
  [LOAD_VIEWER_COMPANIES.FAILURE]: loadFailure,
  [UPDATE_COMPANY.REQUEST]: loadRequest,
  [UPDATE_COMPANY.SUCCESS]: loadSuccess,
  [UPDATE_COMPANY.FAILURE]: loadFailure,
  [CREATE_COMPANY.REQUEST]: loadRequest,
  [CREATE_COMPANY.SUCCESS]: loadSuccess,
  [CREATE_COMPANY.FAILURE]: loadFailure
}

export default createReducer(initialState, handlers)
