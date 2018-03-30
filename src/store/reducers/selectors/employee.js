import { createSelector } from 'reselect'
import map from 'lodash/map'
import filter from 'lodash/filter'
import get from 'lodash/get'
import find from 'lodash/find'

import ReduxEntities from 'services/ReduxEntities'

import { getData } from './data'

export const getState = state => state.employee

export const getRawEmployees = createSelector(
  getState,
  employee => employee.employees
)

export const getRawEmployee = createSelector(
  getState,
  employee => employee.employee
)

export const getRawJobs = createSelector(getState, employee => employee.jobs)

export const getEmployees = createSelector(
  getData,
  getRawEmployees,
  (data, employees) =>
    ReduxEntities.denormalize(data, 'employees', map(employees, 'id')) || []
)

export const getEmployee = createSelector(
  getData,
  getRawEmployee,
  (data, employee) =>
    ReduxEntities.denormalize(data, 'employees', employee.id) || {}
)

export const getJobs = createSelector(
  getData,
  getRawJobs,
  (data, jobs) => ReduxEntities.denormalize(data, 'jobs', map(jobs, 'id')) || []
)

export const getError = createSelector(getState, employee => employee.error)

export const getIsLoading = createSelector(
  getState,
  employee => employee.isLoading
)

export const getIsLoaded = createSelector(
  getState,
  employee => employee.isLoaded
)

export const getEmployeeLoading = createSelector(
  getState,
  employee => employee.employeeLoading
)

export const getEmployeeLoaded = createSelector(
  getState,
  employee => employee.employeeLoaded
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
    ReduxEntities.denormalize(data, 'departments', department.id) || {}
)

export const getFilteredEmployees = createSelector(
  getDepartment,
  getEmployees,
  (department, employees) => {
    return filter(employees, employee => {
      return find(get(department, 'jobs'), { id: get(employee, 'job.id') })
    })
  }
)
