import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  getEmployeesByDepartmentAndSorted,
  getIsLoading,
  getIsLoaded,
  getDepartments,
  getCurrentSchedules,
  getWeek,
  getEditMode
} from 'store/reducers/selectors/schedule'

import { getUserCompany } from 'store/reducers/selectors/companies'

import {
  init,
  selectDepartment,
  initShiftAdding,
  loadSchedules,
  changeSorting,
  shiftWeekAndLoad,
  toggleEdit,
  publishSchedule
} from 'actions/schedule'

import Schedule from './Schedule'

const selector = createStructuredSelector({
  company: getUserCompany,
  employees: getEmployeesByDepartmentAndSorted,
  isLoading: getIsLoading,
  isLoaded: getIsLoaded,
  departments: getDepartments,
  schedules: getCurrentSchedules,
  week: getWeek,
  editMode: getEditMode
})

export default connect(selector, {
  onInit: init,
  onDepartmentSelect: selectDepartment,
  onShiftAdd: initShiftAdding,
  onSchedulesLoadRange: loadSchedules,
  onSortingChange: changeSorting,
  onWeekShift: shiftWeekAndLoad,
  toggleEdit,
  onPublish: publishSchedule
})(Schedule)
