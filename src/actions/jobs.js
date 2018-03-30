import { createAsyncAction } from 'helpers/redux'
import { apiCall } from './api'

const defaultJobParams = {
  name: '',
  jobDesc: '',
  salary: 0,
  experience: true,
  yearsExp: 0,
  id: 1,
  language: 25,
  education: 25,
  car: true
}

export const CREATE_JOB = createAsyncAction('job/CREATE')
export const createJob = () => ({
  type: CREATE_JOB.REQUEST
})
export const cancelJobCreating = () => ({
  type: CREATE_JOB.FAILURE
})

export const LOAD_JOBS = createAsyncAction('job/LOAD')
export const loadJobs = departmentId =>
  apiCall({
    endpoint: `/departments/${departmentId}/relationships/jobs`,
    types: LOAD_JOBS
  })

export const ADD_JOB = createAsyncAction('job/ADD')
export const addJob = ({ departmentId, name }) =>
  apiCall({
    endpoint: `/departments/${departmentId}/relationships/jobs`,
    method: 'POST',
    query: {
      data: {
        type: 'jobs',
        attributes: {
          ...defaultJobParams,
          name: name
        }
      }
    },
    types: ADD_JOB
  })

export const SHOW_JOB = createAsyncAction('job/SHOW')
export const showJob = selectedJob => ({
  type: SHOW_JOB.SUCCESS,
  payload: selectedJob
})

export const DELETE_JOB = createAsyncAction('job/DELETE')
export const deleteJob = ({ id }) =>
  apiCall({
    endpoint: `/jobs/${id}`,
    method: 'DELETE',
    alt: true,
    types: DELETE_JOB
  })

export const HIDE_JOB = createAsyncAction('job/HIDE')
export const hideJob = () => ({
  type: HIDE_JOB.SUCCESS
})

export const CHANGE_HIRING_STATUS = createAsyncAction(
  'job/CHANGE_HIRING_STATUS'
)
export const changeHiringStatus = newStatus => ({
  type: CHANGE_HIRING_STATUS.SUCCESS,
  payload: newStatus
})

export const SAVE_JOB = createAsyncAction('job/SAVE')
export const saveJob = job =>
  apiCall({
    endpoint: `/jobs/${job.id}`,
    method: 'PATCH',
    query: {
      data: {
        type: 'jobs',
        attributes: {
          ...job
        }
      }
    },
    types: SAVE_JOB
  })
