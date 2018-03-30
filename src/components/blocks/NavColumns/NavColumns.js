import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { createSuit } from 'helpers/styles'

import { ModalWindow } from 'components/blocks/ModalWindow'

import Departments from './Departments'
import Jobs from './Jobs'

import './styles.css'

const suit = createSuit('NavColumns')

class NavColumns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowModal: false,
      itemToDelete: {},
      type: ''
    }

    this.onDeleteDepartment = this.onDeleteDepartment.bind(this)
    this.onDeleteJob = this.onDeleteJob.bind(this)
    this.onShowModal = this.onShowModal.bind(this)
  }

  onDeleteDepartment(result) {
    const { onDeleteDep } = this.props
    if (result === true) onDeleteDep(this.state.itemToDelete)

    this.setState({ isShowModal: false, itemToDelete: {} })
  }

  onDeleteJob(result) {
    const { onDeleteJob } = this.props
    if (result === true) onDeleteJob(this.state.itemToDelete)

    this.setState({ isShowModal: false, itemToDelete: {} })
  }

  onShowModal(item, type) {
    this.setState({ isShowModal: true, itemToDelete: item, type })
  }

  render() {
    const {
      companyId,
      hideJobs,
      onSelectJob,
      onAddJob,
      onSaveJob,
      onSelectDep,
      onHideJob,
      onAddDepartment,
      onSaveDep,
      onCancelCreatingDepartment,
      onCreateDepartment,
      onCreateJob,
      onCancelCreatingJob,
      onLoadDepartments,
      onLoadJobs
    } = this.props

    const { jobData, creatingJob, currentJob } = this.props.getJob
    const {
      depData,
      creatingDepartment,
      currentDepartment
    } = this.props.getDepartment

    const { isShowModal } = this.state
    const callback =
      this.state.type === 'job' ? this.onDeleteJob : this.onDeleteDepartment
    const textModal =
      this.state.type === 'job'
        ? 'Are you sure you want to delete this job?'
        : 'Are you sure you want to delete this department?'

    return (
      <div className={suit()}>
        <Departments
          companyId={companyId}
          creatingDepartment={creatingDepartment}
          currentDepartment={currentDepartment}
          depList={depData}
          isShowModal={isShowModal}
          onAddDepartment={onAddDepartment}
          onCancelCreatingDepartment={onCancelCreatingDepartment}
          onCreateDepartment={onCreateDepartment}
          onHideJob={onHideJob}
          onLoadDepartments={onLoadDepartments}
          onSaveDep={onSaveDep}
          onSelectDep={onSelectDep}
          onShowModal={this.onShowModal}
        />
        {!hideJobs &&
          currentDepartment &&
          <Jobs
            creatingJob={creatingJob}
            currentDepartment={currentDepartment}
            currentJob={currentJob}
            isShowModal={isShowModal}
            jobList={jobData}
            onAddJob={onAddJob}
            onCancelCreatingJob={onCancelCreatingJob}
            onCreateJob={onCreateJob}
            onLoadJobs={onLoadJobs}
            onSaveJob={onSaveJob}
            onSelectJob={onSelectJob}
            onShowModal={this.onShowModal}
          />}
        {isShowModal && <ModalWindow callback={callback} text={textModal} />}
      </div>
    )
  }
}

NavColumns.propTypes = {
  companyId: PropTypes.number,
  hideJobs: PropTypes.bool,
  onAddJob: PropTypes.func,
  onCancelCreatingDepartment: PropTypes.func,
  onCancelCreatingJob: PropTypes.func,
  onCreateDepartment: PropTypes.func,
  onCreateJob: PropTypes.func,
  onDeleteDep: PropTypes.func,
  onDeleteJob: PropTypes.func,
  onHideJob: PropTypes.func,
  onLoadDepartments: PropTypes.func,
  onLoadJobs: PropTypes.func,
  onSelectDep: PropTypes.func,
  onSelectJob: PropTypes.func
}

export { NavColumns }
