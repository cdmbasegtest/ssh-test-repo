import { createReducer } from 'helpers/redux'
import {
  SELECT_DEPARTMENT,
  INIT,
  LOAD_ALL_EMPLOYEES,
  LOAD_RANGE,
  ADD,
  LOAD_ALL_DEPARTMENTS,
  INIT_DONE,
  CHANGE_SORTING,
  SHIFT_WEEK,
  TOGGLE_EDIT
} from 'actions/schedule'
import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'
import Moment from 'helpers/moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

const initialState = {
  error: '',
  employees: {},
  schedules: {},
  shifts: {},
  isLoading: false,
  isLoaded: false,
  departments: {},
  selectedDepartment: {},
  sorting: 'profile.first-name',
  editMode: false,
  week: moment.range(moment().weekday(0), moment().weekday(6))
}

const handleError = (state, action) => ({
  ...state,
  error: action.payload,
  isLoading: false,
  isLoaded: false
})

const mergeCustomizer = (objValue, srcValue) =>
  isArray(objValue) ? srcValue : undefined

const getAndMerge = (state, { payload }) => {
  const { schedules } = payload.data
  return {
    ...state,
    schedules: mergeWith({}, state.schedules, schedules, mergeCustomizer)
  }
}

const handlers = {
  [SELECT_DEPARTMENT]: (state, action) => {
    const id = action.payload.departmentId
    return { ...state, selectedDepartment: state.departments[id] }
  },
  [CHANGE_SORTING]: (state, action) => {
    const sortingField = action.payload.sortingField
    return { ...state, sorting: sortingField }
  },
  [TOGGLE_EDIT]: state => {
    return { ...state, editMode: !state.editMode }
  },
  [SHIFT_WEEK]: (state, action) => {
    return { ...state, week: action.payload.week }
  },
  [ADD.SUCCESS]: getAndMerge,

  [INIT]: (state, action) => ({ ...state, isLoading: true }), //All actions in the bellow are in the initSaga flow
  [LOAD_ALL_EMPLOYEES.SUCCESS]: (state, { payload }) => {
    const { employees } = payload.data
    return {
      ...state,
      employees
    }
  },
  [LOAD_ALL_EMPLOYEES.FAILURE]: handleError,

  [LOAD_RANGE.SUCCESS]: getAndMerge,
  [LOAD_RANGE.FAILURE]: handleError,

  [LOAD_ALL_DEPARTMENTS.SUCCESS]: (state, { payload }) => {
    const { departments } = payload.data
    return {
      ...state,
      departments: departments || {},
      selectedDepartment: departments[Object.keys(departments)[0]]
    }
  },
  [LOAD_ALL_DEPARTMENTS.FAILURE]: handleError,

  [INIT_DONE]: (state, action) => ({
    //Till this action.
    ...state,
    isLoading: false,
    isLoaded: true
  })
}

export default createReducer(initialState, handlers)
