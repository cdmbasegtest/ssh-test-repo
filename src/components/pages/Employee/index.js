import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  getEmployee,
  getIsLoading,
  getError,
  getIsLoaded,
  getEmployeeLoaded,
  getEmployeeLoading,
  getJobs,
  getDepartments,
  getEmployees
} from 'store/reducers/selectors/employee'

import {
  init,
  loadEmployee,
  changePosition,
  removePosition,
  fireEmployee,
  sendInvite,
  selectDepartment
} from 'actions/employee'

import Employee from './Employee'

const selector = createStructuredSelector({
  departments: getDepartments,
  employees: getEmployees,
  employee: getEmployee,
  isLoading: getIsLoading,
  error: getError,
  isLoaded: getIsLoaded,
  employeeLoaded: getEmployeeLoaded,
  employeeLoading: getEmployeeLoading,
  jobs: getJobs
})

export default connect(selector, {
  onInit: init,
  onEmployeeLoad: loadEmployee,
  onPositionMoveFromTo: changePosition,
  onPositionRemove: removePosition,
  onPositionAdd: changePosition,
  onEmployeeFire: fireEmployee,
  onInviteSend: sendInvite,
  onDepartmentSelect: selectDepartment
})(Employee)
