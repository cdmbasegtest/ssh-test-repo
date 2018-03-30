import { createAsyncAction } from 'helpers/redux'
import { getRawEmployee } from 'store/reducers/selectors/employee'
import { apiCall } from './api'

export const LOAD_ALL = createAsyncAction('employee/LOAD_RANGE')
export const LOAD = createAsyncAction('employee/LOAD')
export const LOAD_ALL_DEPARTMENTS = createAsyncAction(
  'schedule/LOAD_ALL_DEPARTMENTS'
)
export const SELECT_DEPARTMENT = 'schedule/SELECT_DEPARTMENT'
export const LOAD_DEPARTMENT = createAsyncAction('employee/LOAD_DEPARTMENT')
export const LOAD_JOBS = createAsyncAction('employee/LOAD_JOBS')

export const CHANGE_POSITION = createAsyncAction('employee/CHANGE_POSITION')
export const REMOVE_POSITION = createAsyncAction('employee/REMOVE_POSITION')
export const SENT_INVITE = createAsyncAction('employee/SENT_INVITE')
export const EMPLOYEE_DATA_READY = 'employee/DATA_READY'
export const INIT = 'employee/INIT'
export const INIT_DONE = 'employee/INIT_DONE'
export const FIRE = createAsyncAction('employee/FIRE')

export const init = () => ({ type: INIT })
export const initDone = () => ({ type: INIT_DONE })
export const selectDepartment = departmentId => ({
  type: SELECT_DEPARTMENT,
  payload: { departmentId }
})

export const loadEmployees = companyId =>
  apiCall({
    alt: true,

    endpoint: `/companies/${companyId}/relationships/employees`,
    types: LOAD_ALL,
    query: {
      include: 'profile'
    }
  })

export const loadEmployee = employeeId =>
  apiCall({
    alt: true,

    endpoint: `/employees/${employeeId}`,
    types: LOAD,
    query: {
      include:
        'profile,profile,profile.languages,profile.availabilities,profile.experiences'
    }
  })

export const changePosition = jobId => (dispatch, getState) => {
  const employee = getRawEmployee(getState())
  const relationships = {
    ...employee.relationships,
    job: { data: { id: jobId, type: 'jobs' } }
  }
  dispatch(
    apiCall({
      alt: true,

      method: 'PATCH',
      endpoint: `/employees/${employee.id}`,
      types: CHANGE_POSITION,
      query: { data: { ...employee, relationships } }
    })
  )
}

export const removePosition = jobId => (dispatch, getState) => {
  const employee = getRawEmployee(getState())
  const relationships = {
    ...employee.relationships,
    job: { data: {} }
  }
  dispatch(
    apiCall({
      alt: true,

      method: 'PATCH',
      endpoint: `/employees/${employee.id}`,
      types: REMOVE_POSITION,
      query: { data: { ...employee, relationships } }
    })
  )
}

export const fireEmployee = () => (dispatch, getState) => {
  const employee = getRawEmployee(getState())
  dispatch(
    apiCall({
      alt: true,

      method: 'DELETE',
      endpoint: `/employees/${employee.id}`,
      types: FIRE
    })
  )
}

export const loadDepartments = companyId =>
  apiCall({
    alt: true,

    endpoint: `/companies/${companyId}/relationships/departments`,
    types: LOAD_ALL_DEPARTMENTS,
    query: {
      include: 'jobs'
    }
  })

export const loadDepartment = companyId =>
  apiCall({
    alt: true,

    endpoint: `/companies/${companyId}/relationships/departments`,
    types: LOAD_DEPARTMENT
  })

export const loadJobs = departmentId =>
  apiCall({
    alt: true,

    endpoint: `/departments/${departmentId}/relationships/jobs`,
    types: LOAD_JOBS
  })

//Dispatches by employee saga only
export const employeeDataReady = () => ({
  type: EMPLOYEE_DATA_READY
})

export const sendInvite = ({ first, last, email, job }) => dispatch => {
  const invite = {
    type: 'invitations',
    attributes: {
      'first-name': first,
      'last-name': last,
      email
    },
    relationships: {
      job: {
        data: {
          type: 'jobs',
          id: job
        }
      }
    }
  }
  dispatch(
    apiCall({
      alt: true,
      method: 'POST',
      endpoint: `/invitations`,
      types: SENT_INVITE,
      query: {
        data: invite
      }
    })
  )
}

export const SHOW_LIST = createAsyncAction('SHOW_LIST')
export const showEmployeeList = () => ({
  type: SHOW_LIST.SUCCESS
})
export const HIDE_LIST = createAsyncAction('HIDE_LIST')
export const hideEmployeeList = () => ({
  type: HIDE_LIST.SUCCESS
})

//
// export const moveFromToPosition = (fromJobId, toJobId) => (
//   dispatch,
//   getState
// ) => {
//   const employee = getRawEmployee(getState())
//   const jobsMap = toMap(employee.relationships.jobs.data)
//   jobsMap.delete(fromJobId)
//   jobsMap.set(toJobId, { id: toJobId, type: 'jobs' })
//   const relationships = {
//     ...employee.relationships,
//     jobs: { data: [...jobsMap.values()] }
//   }
//   dispatch(
//     apiCall({
//       alt: true,
//
//       method: 'PATCH',
//       endpoint: `/employees/${employee.id}`,
//       types: MOVE_POSITION,
//       query: { data: { ...employee, relationships } }
//     })
//   )
// }
