import { createSelector } from 'reselect'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isMatch from 'lodash/isMatch'
import intersectionWith from 'lodash/intersectionWith'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import find from 'lodash/find'
import sortBy from 'lodash/sortBy'

import ReduxEntities from 'services/ReduxEntities'

import { getData } from './data'

export const getState = state => state.schedule

export const getRawEmployees = createSelector(
  getState,
  schedule => schedule.employees
)

export const getSorting = createSelector(getState, reducer => reducer.sorting)

export const getWeek = createSelector(getState, reducer => reducer.week)

export const getEmployees = createSelector(
  getData,
  getRawEmployees,
  (data, employees) =>
    ReduxEntities.denormalize(data, 'employees', map(employees, 'id')) || []
)

export const getSortedEmployees = createSelector(
  getSorting,
  getEmployees,
  (sorting, employees) => sortBy(employees, sorting)
)

export const getError = createSelector(getState, schedule => schedule.error)

export const getIsLoading = createSelector(
  getState,
  schedule => schedule.isLoading
)

export const getIsLoaded = createSelector(
  getState,
  schedule => schedule.isLoaded
)

export const getRawSchedules = createSelector(
  getState,
  reducer => reducer.schedules
)

export const getSchedules = createSelector(
  getData,
  getRawSchedules,
  (data, schedules) =>
    ReduxEntities.denormalize(data, 'schedules', map(schedules, 'id')) || []
)

export const getRawDepartments = createSelector(
  getState,
  reducer => reducer.departments
)

export const getRawSelectedDepartment = createSelector(
  getState,
  reducer => reducer.selectedDepartment
)

export const getDepartments = createSelector(
  getData,
  getRawDepartments,
  (data, departments) =>
    ReduxEntities.denormalize(data, 'departments', map(departments, 'id')) || []
)

export const getDepartment = createSelector(
  getData,
  getRawSelectedDepartment,
  (data, department) =>
    ReduxEntities.denormalize(data, 'departments', get(department, 'id')) || {}
)

export const getEmployeesByDepartment = createSelector(
  getDepartment,
  getEmployees,
  (department, employees) => {
    return filter(employees, employee => {
      return find(get(department, 'jobs'), { id: get(employee, 'job.id') })
    })
  }
)

export const getEmployeesByDepartmentAndSorted = createSelector(
  getSortedEmployees,
  getEmployeesByDepartment,
  (sorted, byDepartment) => intersectionWith(sorted, byDepartment, isEqual)
)

export const getScheduleById = id =>
  createSelector(getSchedules, schedules => find(schedules, { id }))

export const getEditMode = createSelector(getState, state => state.editMode)

export const getSchedulesByStatus = createSelector(
  getSchedules,
  getEditMode,
  (schedules, editMode) => {
    const status = editMode ? 'pending' : 'published'
    return filter(schedules, schedule => {
      return isMatch(schedule, {
        state: status
      })
    })
  }
)

export const getSchedulesByWeek = createSelector(
  getSchedules,
  getWeek,
  (schedules, week) => {
    return filter(schedules, schedule => {
      return isMatch(schedule, {
        'start-at': week.start.format('YYYY-MM-DD'),
        'finish-at': week.end.format('YYYY-MM-DD')
      })
    })
  }
)

export const getSchedulesByWeekAndStatus = createSelector(
  getSchedulesByWeek,
  getSchedulesByStatus,
  (byStatus, byWeek) => intersectionWith(byStatus, byWeek, isEqual)
)

export const getCurrentSchedules = createSelector(
  getEmployeesByDepartmentAndSorted,
  getSchedulesByWeekAndStatus,
  (employees, schedules) => {
    return filter(schedules, schedule => {
      return find(employees, { id: get(schedule, 'employee.id') })
    })
  }
)
