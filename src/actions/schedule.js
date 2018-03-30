import { createAsyncAction } from 'helpers/redux'
import { apiCall } from './api'
import moment from 'helpers/moment'
import get from 'lodash/get'
import find from 'lodash/find'
import { getSchedules } from '../store/reducers/selectors/schedule'

export const INIT = 'schedule/INIT'
export const init = () => ({ type: INIT })

export const INIT_DONE = 'schedule/INIT_DONE'
export const initDone = () => ({ type: INIT_DONE })

export const SELECT_DEPARTMENT = 'schedule/SELECT_DEPARTMENT'
export const selectDepartment = departmentId => ({
  type: SELECT_DEPARTMENT,
  payload: { departmentId }
})

export const CHANGE_SORTING = 'schedule/CHANGE_SORTING'
export const changeSorting = sortingField => ({
  type: CHANGE_SORTING,
  payload: { sortingField }
})

export const LOAD_ALL_EMPLOYEES = createAsyncAction(
  'schedule/LOAD_ALL_EMPLOYEES'
)
export const loadEmployees = companyId =>
  apiCall({
    alt: true,

    endpoint: `/companies/${companyId}/relationships/employees`,
    types: LOAD_ALL_EMPLOYEES,
    query: {
      include: 'profile,profile.availabilities,job'
    }
  })

export const LOAD_RANGE = createAsyncAction('schedule/LOAD_RANGE')
export const loadSchedules = (from, to) => dispatch => {
  from = from || moment().weekday(0).format('DD-MM-YYYY')
  to = to || moment().weekday(6).format('DD-MM-YYYY')
  dispatch(
    apiCall({
      alt: true,

      endpoint: `/schedules`,
      types: LOAD_RANGE,
      query: {
        include: 'shifts',
        'filter[start_at]': from,
        'filter[finish_at]': to
      }
    })
  )
}

export const LOAD_ALL_DEPARTMENTS = createAsyncAction(
  'schedule/LOAD_ALL_DEPARTMENTS'
)
export const loadDepartments = companyId =>
  apiCall({
    alt: true,

    endpoint: `/companies/${companyId}/relationships/departments`,
    types: LOAD_ALL_DEPARTMENTS,
    query: {
      include: 'jobs'
    }
  })

export const INIT_SHIFT_ADDING = 'schedule/INIT_SHIFT_ADDING'
export const initShiftAdding = (
  date,
  employee,
  scheduleId,
  startAt,
  finishAt,
  color
) => ({
  type: INIT_SHIFT_ADDING,
  payload: {
    date,
    employee,
    scheduleId,
    startAt,
    finishAt,
    color
  }
})

export const ADD_SHIFT = createAsyncAction('schedule/ADD_SHIFT')
export const addShift = (
  dates,
  jobId,
  scheduleId,
  startAt,
  finishAt,
  color
) => dispatch => {
  const shift = {
    type: 'shifts',
    attributes: {
      start_at: startAt,
      finish_at: finishAt,
      dates,
      color
    },
    relationships: {
      job: {
        data: {
          type: 'jobs',
          id: jobId
        }
      },
      schedule: {
        data: {
          type: 'schedules',
          id: scheduleId
        }
      }
    }
  }
  dispatch(
    apiCall({
      alt: true,

      method: 'POST',
      endpoint: `/shifts`,
      types: ADD_SHIFT,
      query: { data: shift }
    })
  )
}

export const ADD = createAsyncAction('schedule/ADD')
export const createSchedule = (date, employee, department) => dispatch => {
  const day = moment(date, 'YYYY-MM-DD')
  const schedule = {
    type: 'schedules',
    attributes: {
      start_at: day.weekday(0).format('YYYY-MM-DD'),
      finish_at: day.weekday(6).format('YYYY-MM-DD')
    },
    relationships: {
      employee: {
        data: {
          type: 'employees',
          id: get(employee, 'id')
        }
      },
      department: {
        data: {
          type: 'departments',
          id: get(department, 'id')
        }
      }
    }
  }
  dispatch(
    apiCall({
      alt: true,

      method: 'POST',
      endpoint: `/schedules`,
      types: ADD,
      query: { data: schedule }
    })
  )
}

export const PUBLISH = createAsyncAction('schedule/PUBLISH')
export const publishSchedule = scheduleId => dispatch => {
  const schedule = {
    type: 'schedules',
    attributes: {
      state: 'published'
    }
  }
  dispatch(
    apiCall({
      alt: true,

      method: 'PATCH',
      endpoint: `/schedules/${scheduleId}`,
      types: PUBLISH,
      query: { data: schedule }
    })
  )
}

export const SHIFT_WEEK = 'schedule/SHIFT_WEEK'
export const shiftWeek = week => {
  return { type: SHIFT_WEEK, payload: { week } }
}
export const shiftWeekAndLoad = newWeek => (dispatch, getState) => {
  const schedules = getSchedules(getState())
  const start = newWeek.start.format('YYYY-MM-DD')
  const finish = newWeek.end.format('YYYY-MM-DD')
  const schedulesInRange = find(schedules, {
    'start-at': start,
    'finish-at': finish
  })
  if (!schedulesInRange) {
    dispatch(loadSchedules(start, finish))
    dispatch(shiftWeek(newWeek))
  } else {
    dispatch(shiftWeek(newWeek))
  }
}

export const TOGGLE_EDIT = 'schedule/TOGGLE_EDIT'
export const toggleEdit = () => {
  return { type: TOGGLE_EDIT }
}
