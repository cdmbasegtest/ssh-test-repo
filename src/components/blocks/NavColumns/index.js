import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { NavColumns } from './NavColumns'

import {
  addJob,
  showJob,
  deleteJob,
  saveJob,
  hideJob,
  createJob,
  cancelJobCreating,
  loadJobs
} from 'actions/jobs'

import {
  addDepartment,
  showDepartment,
  deleteDepartment,
  hideDepartment,
  saveDepartment,
  createDepartment,
  cancelDepartmentCreating,
  loadDepartments
} from 'actions/departments'

import { getJob } from 'store/reducers/selectors/job'
import { getDepartment } from 'store/reducers/selectors/department'
import { getUserCompanyId } from 'store/reducers/selectors/companies'

const actions = {
  onAddJob: addJob,
  onSelectJob: showJob,
  onDeleteJob: deleteJob,
  onAddDepartment: addDepartment,
  onSelectDep: showDepartment,
  onDeleteDep: deleteDepartment,
  onHideDep: hideDepartment,
  onHideJob: hideJob,
  onSaveDep: saveDepartment,
  onSaveJob: saveJob,
  onCreateDepartment: createDepartment,
  onCancelCreatingDepartment: cancelDepartmentCreating,
  onCreateJob: createJob,
  onCancelCreatingJob: cancelJobCreating,
  onLoadDepartments: loadDepartments,
  onLoadJobs: loadJobs
}

const selector = createStructuredSelector({
  getJob,
  getDepartment,
  companyId: getUserCompanyId
})

export default connect(selector, actions)(NavColumns)
