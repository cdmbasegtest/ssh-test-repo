import { createReducer } from 'helpers/redux'
import pick from 'lodash/pick'
import without from 'lodash/without'

import {
  SELECT,
  GET_APPLICANTS,
  SET_PENDING,
  SET_INTERVIEW,
  DESTROY,
  SORT
} from 'actions/applicant'

const initialState = {
  applicants: {},
  currentCV: null,
  isLoading: false,
  isLoaded: false
}

const handlers = {
  [SELECT]: (state, { payload }) => ({
    ...state,
    currentCV: payload
  }),

  [GET_APPLICANTS.REQUEST]: state => ({
    ...state,
    isLoading: true
  }),

  [GET_APPLICANTS.SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    applicants: payload
  }),

  [GET_APPLICANTS.FAILURE]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true
  }),

  [SET_PENDING.SUCCESS]: (state, { payload }) => {
    const applicantKey = payload.result.applicants[0]

    return {
      ...state,
      currentCV: null,
      applicants: {
        ...state.applicants,
        entities: {
          ...state.applicants.entities,
          applicants: {
            ...state.applicants.entities.applicants,
            [applicantKey]: {
              ...state.applicants.entities.applicants[applicantKey],
              state: payload.entities.applicants[applicantKey].state
            }
          }
        }
      }
    }
  },

  [SET_INTERVIEW.SUCCESS]: (state, { payload }) => {
    const applicantKey = payload.result.applicants[0]

    return {
      ...state,
      currentCV: null,
      applicants: {
        ...state.applicants,
        entities: {
          ...state.applicants.entities,
          applicants: {
            ...state.applicants.entities.applicants,
            [applicantKey]: {
              ...state.applicants.entities.applicants[applicantKey],
              state: payload.entities.applicants[applicantKey].state
            }
          }
        }
      }
    }
  },

  [DESTROY.SUCCESS]: (state, { payload }) => {
    const profileKey = state.currentCV.id
    let applicantKey = 0

    for (const key in state.applicants.entities.applicants) {
      if (state.applicants.entities.applicants[key].profile.id === profileKey) {
        applicantKey = key
      }
    }
    return {
      ...state,
      currentCV: null,
      applicants: {
        ...state.applicants,
        result: {
          ...state.applicants.result,
          applicants: without(state.applicants.result.applicants, applicantKey),
          profiles: without(state.applicants.result.profiles, profileKey)
        },
        entities: {
          ...state.applicants.entities,
          applicants: pick(
            state.applicants.entities.applicants,
            without(state.applicants.result.applicants, applicantKey)
          ),
          profiles: pick(
            state.applicants.entities.profiles,
            without(state.applicants.result.profiles, profileKey)
          )
        }
      }
    }
  },

  [SORT.SUCCESS]: (state, { payload }) => ({
    ...state,
    applicants: {
      ...state.applicants,
      entities: {
        ...state.applicants.entities,
        applicants: payload.entities.applicants
      }
    }
  })
}

export default createReducer(initialState, handlers)
