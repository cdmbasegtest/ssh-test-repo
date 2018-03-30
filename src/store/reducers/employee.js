import { createReducer } from 'helpers/redux'
import {
  LOAD_ALL,
  LOAD,
  LOAD_JOBS,
  SHOW_LIST,
  HIDE_LIST,
  INIT,
  INIT_DONE,
  FIRE,
  EMPLOYEE_DATA_READY,
  LOAD_ALL_DEPARTMENTS,
  REMOVE_POSITION,
  CHANGE_POSITION,
  SELECT_DEPARTMENT
} from 'actions/employee'
import reduce from 'lodash/reduce'
import merge from 'lodash/merge'
import isArray from 'lodash/isArray'
import get from 'lodash/get'
import mergeWith from 'lodash/mergeWith'

const initialState = {
  error: '',
  employees: {},
  profiles: {},
  employee: {},
  jobs: {},
  departments: {},
  selectedDepartment: {},
  isLoading: false,
  isLoaded: false,
  employeeLoaded: false,
  employeeLoading: false,
  isShowEmployeeList: false
}

const mergeCustomizer = (objValue, srcValue) =>
  isArray(objValue) ? srcValue : undefined

const handlePatch = (state, action) => {
  let employees = get(action, 'payload.data.employees')
  const employee = employees[state.employee.id]
  employees = mergeWith({}, state.employees, employees, mergeCustomizer)
  return { ...state, employees, employee }
}

const handlers = {
  [SELECT_DEPARTMENT]: (state, action) => {
    const id = action.payload.departmentId
    return { ...state, selectedDepartment: state.departments[id] }
  },
  [FIRE.SUCCESS]: (state, action) => {
    const firedId = action.payload.deletedId
    const withoutFired = reduce(
      state.employees,
      (result, value, key) => {
        if (value.id !== firedId) {
          return { ...result, [key]: value }
        } else return { ...result }
      },
      {}
    )
    const selectFirst = Object.keys(withoutFired)[0]
    return {
      ...state,
      employees: withoutFired,
      employee: withoutFired[selectFirst]
    }
  },

  [REMOVE_POSITION.SUCCESS]: handlePatch,
  [CHANGE_POSITION.SUCCESS]: handlePatch,

  //initialLoad saga takes that
  [INIT]: (state, action) => ({ ...state, isLoading: true }),

  [LOAD_ALL.SUCCESS]: (state, { payload }) => {
    const { employees, profiles } = payload.data
    const id = Object.keys(employees)[0]
    return {
      ...state,
      employees: employees,
      profiles: profiles,
      employee: employees[id]
    }
  },
  [LOAD.REQUEST]: (state, action) => ({
    ...state,
    employeeLoading: true,
    employeeLoaded: false
  }),

  [LOAD_ALL_DEPARTMENTS.SUCCESS]: (state, { payload }) => {
    const { departments } = payload.data
    return {
      ...state,
      departments: departments || {},
      selectedDepartment: departments[Object.keys(departments)[0]]
    }
  },

  //loadEmployee saga take that
  [LOAD.SUCCESS]: (state, { payload }) => {
    const employees = payload.data.employees
    const id = Object.keys(employees)[0]
    const employee = employees[id]
    return {
      ...state,
      employee: employee
    }
  },

  [LOAD_JOBS.SUCCESS]: (state, { payload }) => {
    const jobs = payload.data.jobs
    return {
      ...state,
      jobs: merge({}, state.jobs, jobs)
    }
  },
  //loadEmployee saga put that at the end
  [EMPLOYEE_DATA_READY]: state => {
    return {
      ...state,
      employeeLoading: false,
      employeeLoaded: true
    }
  },

  //initialLoad saga put that at the end
  [INIT_DONE]: (state, action) => ({
    ...state,
    isLoading: false,
    isLoaded: true
  }),

  [SHOW_LIST.SUCCESS]: state => {
    return {
      ...state,
      isShowEmployeeList: true
    }
  },

  [HIDE_LIST.SUCCESS]: state => {
    return {
      ...state,
      isShowEmployeeList: false
    }
  }
}

export default createReducer(initialState, handlers)
