import { createAsyncAction } from 'helpers/redux'

import { apiCall } from './api'

export const LOAD_VIEWER = createAsyncAction('viewer/LOAD')
export const loadViewer = JWTHeader =>
  apiCall({
    alt: true,

    endpoint: '/user',
    headers: { Authorization: JWTHeader },
    query: { include: 'profile' },
    types: LOAD_VIEWER
  })

export const LOAD_VIEWER_COMPANIES = createAsyncAction('viewer/LOAD_COMPANIES')
export const loadViewerCompanies = () =>
  apiCall({
    alt: true,

    endpoint: '/user/relationships/companies',
    types: LOAD_VIEWER_COMPANIES
  })
