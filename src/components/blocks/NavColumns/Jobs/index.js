import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
// import { NavLink } from 'react-router-dom'

import MdAdd from 'react-icons/lib/md/add'
import map from 'lodash/map'

// import * as routes from 'helpers/routes'
import { createSuit } from 'helpers/styles'
import EditableItem from '../EditableItem'

import './styles.css'

const suit = createSuit('JobsColumn')

class Jobs extends Component {
  componentDidMount() {
    this.loadJobs(this.props.currentDepartment.id)
  }
  //SMELLS
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentDepartment.id !== this.props.currentDepartment.id) {
      this.loadJobs(nextProps.currentDepartment.id)
    }
  }

  loadJobs = depId => {
    const { onLoadJobs } = this.props
    onLoadJobs(depId)
  }

  render() {
    const {
      onSelectJob,
      jobList,
      onShowModal,
      onSaveJob,
      onAddJob,
      onCreateJob,
      onCancelCreatingJob,
      creatingJob,
      currentDepartment,
      currentJob
    } = this.props
    const itemList = map(jobList, item => {
      const selected = currentJob && item.id === currentJob.id
      return (
        <EditableItem
          item={item}
          key={item.id}
          kind="job"
          selected={selected}
          onAddItem={onAddJob}
          onEditItem={onSaveJob}
          onSelectItem={onSelectJob}
          onShowModal={onShowModal}
        />
      )
    })

    return (
      <nav className={suit()}>
        <div className={suit('header')}>
          <button className={suit('new-job')} onClick={onCreateJob}>
            <MdAdd className={suit('icon')} size="18" />New role
          </button>
        </div>
        {creatingJob &&
          <EditableItem
            kind="job"
            new
            onAddItem={item => {
              onAddJob({ ...item, departmentId: currentDepartment.id })
            }}
            onCancelCreating={onCancelCreatingJob}
          />}
        {itemList}
      </nav>
    )
  }
}

Jobs.propTypes = {
  creatingJob: PropTypes.bool,
  jobList: PropTypes.array,
  match: PropTypes.object.isRequired,
  onAddJob: PropTypes.func,
  onCancelCreatingJob: PropTypes.func,
  onCreateJob: PropTypes.func,
  onDeleteJob: PropTypes.func,
  onLoadJobs: PropTypes.func,
  onSelectJob: PropTypes.func,
  onShowModal: PropTypes.func
}

export default withRouter(Jobs)
