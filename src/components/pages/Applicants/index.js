import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  addJob,
  showJob,
  changeHiringStatus,
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

import {
  getState,
  isLoading,
  isLoaded
} from 'store/reducers/selectors/applicant'

import {
  selectApplicant,
  getApplicants,
  setApplicantPending,
  setApplicantInterview,
  destroyApplicant,
  sortApplicants
} from 'actions/applicant'

import Applicants from './Applicants'

const selector = createStructuredSelector({
  getApplicant: getState,
  getJob,
  getDepartment,
  isLoading,
  isLoaded,
  userCompanyId: getUserCompanyId
})

const actions = {
  selectApplicant,
  getApplicants,
  destroyApplicant,
  setApplicantPending,
  setApplicantInterview,
  sortApplicants,
  onAddJob: addJob,
  onSelectJob: showJob,
  onDeleteJob: deleteJob,
  onAddDepartment: addDepartment,
  onSelectDep: showDepartment,
  onDeleteDep: deleteDepartment,
  onHideDep: hideDepartment,
  onHideJob: hideJob,
  onSaveDep: saveDepartment,
  onChangeHiringStatus: changeHiringStatus,
  onSaveJob: saveJob,
  onCreateDepartment: createDepartment,
  onCancelCreatingDepartment: cancelDepartmentCreating,
  onCreateJob: createJob,
  onCancelCreatingJob: cancelJobCreating,
  onLoadDepartments: loadDepartments,
  onLoadJobs: loadJobs
}

export default connect(selector, actions)(Applicants)
