import { createReducer } from 'helpers/redux'

import {
  SHOW_JOB,
  ADD_JOB,
  DELETE_JOB,
  HIDE_JOB,
  SAVE_JOB,
  CHANGE_HIRING_STATUS,
  CREATE_JOB,
  LOAD_JOBS
} from 'actions/jobs'

const initialState = {
  isJobShown: false,
  isLoading: false,
  jobData: [],
  currentJob: null,
  hireData: null,
  creatingJob: false
}

const handlers = {
  [SHOW_JOB.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isJobShown: true,
      currentJob: payload
    }
  },
  [ADD_JOB.SUCCESS]: (state, { payload }) => ({
    ...state,
    jobData: [...state.jobData, ...Object.values(payload.entities.jobs || {})],
    // currentJob: { ...payload, hiringStatus: 'close', hiringArr: [] },
    // isJobShown: true,
    creatingJob: false
  }),
  [DELETE_JOB.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      jobData: state.jobData.filter(({ id }) => id !== payload.deletedId)
    }
  },
  [HIDE_JOB.SUCCESS]: state => {
    return {
      ...state,
      isJobShown: false
    }
  },
  [CHANGE_HIRING_STATUS.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      currentJob: {
        ...state.currentJob,
        hiringStatus: payload.hiringStatus,
        hiringArr: payload.hiringArr
      },
      jobData: state.jobData.map(
        item =>
          item.id === state.currentJob.id
            ? {
                ...state.currentJob,
                hiringStatus: payload.hiringStatus,
                hiringArr: payload.hiringArr
              }
            : item
      )
    }
  },
  [SAVE_JOB.SUCCESS]: (state, { payload }) => {
    const newJob = Object.values(payload.entities.jobs)[0]
    return {
      ...state,
      jobData: state.jobData.map(
        item => (item.id === newJob.id ? newJob : item)
      ),
      currentJob: newJob,
      creatingJob: false
    }
  },
  [CREATE_JOB.REQUEST]: state => {
    return {
      ...state,
      creatingJob: true
    }
  },
  [CREATE_JOB.FAILURE]: state => {
    return {
      ...state,
      creatingJob: false
    }
  },
  [LOAD_JOBS.REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [LOAD_JOBS.SUCCESS]: (state, { payload }) => ({
    ...state,
    jobData: Object.values(payload.entities.jobs || {}),
    isLoading: false
  })
}

export default createReducer(initialState, handlers)
