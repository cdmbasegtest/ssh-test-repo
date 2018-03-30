import { put, race, select, take } from 'redux-saga/effects'

import { waitForTypes } from 'helpers/sagas'

import {
  isLoaded,
  isOnboarded,
  getJWTHeader
} from 'store/reducers/selectors/viewer'

import { completeRefetch, COMPLETE_REHYDRATION } from 'actions/app'
import { logOut, AUTHENTICATE } from 'actions/auth'

import {
  loadViewer,
  loadViewerCompanies,
  LOAD_VIEWER,
  LOAD_VIEWER_COMPANIES
} from 'actions/viewer'

function* fetchResources() {
  const onboarded = yield select(isOnboarded)

  // NOTE: There might be different set of loadable resources based on
  // "onboarded" flag
  if (onboarded) {
    yield put(loadViewerCompanies())
    yield waitForTypes([LOAD_VIEWER_COMPANIES.SUCCESS])
  } else {
    yield put(loadViewerCompanies())
    yield waitForTypes([LOAD_VIEWER_COMPANIES.SUCCESS])
  }

  yield put(completeRefetch())
}

export default function* restoreSession() {
  while (true) {
    yield take([AUTHENTICATE.SUCCESS, COMPLETE_REHYDRATION])

    const header = yield select(getJWTHeader)
    const dataLoaded = yield select(isLoaded)

    if (!header) continue

    if (dataLoaded) {
      yield fetchResources()
    } else {
      yield put(loadViewer(header))

      const { success } = yield race({
        success: take(LOAD_VIEWER.SUCCESS),
        failure: take(LOAD_VIEWER.FAILURE)
      })

      if (success) {
        yield fetchResources()
      } else {
        yield put(logOut())
      }
    }
  }
}
