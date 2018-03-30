import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MdFace from 'react-icons/lib/md/face'

import { createSuit } from 'helpers/styles'

import { NavColumns, EditJob, HireTable } from 'components/blocks'

import './styles.css'

const suit = createSuit('JobsPage')

export default class Jobs extends Component {
  onChangeHiringStatus = (table = null) => {
    const newStatus =
      this.props.getJob.currentJob.hiringStatus === 'close'
        ? 'pending'
        : 'publish'
    this.props.onChangeHiringStatus({
      hiringStatus: newStatus,
      hiringArr: table
    })
  }

  render() {
    const { isJobShown, currentJob } = this.props.getJob
    const { currentDepartment } = this.props.getDepartment

    const { onSaveJob } = this.props

    return (
      <div className={suit()}>
        <NavColumns />
        <div className={suit('wrapper')}>
          <div className={suit('header')}>
            <dit className={suit('title')}>Openings</dit>
            <div className={suit('curent-department-job')}>
              {currentDepartment && currentDepartment.name}
              {currentJob && ` / ${currentJob.name}`}
            </div>
          </div>
          <div className={suit('content')}>
            {isJobShown &&
              <div className={suit('content-edit')}>
                <EditJob data={currentJob} onSaveJob={onSaveJob} />
                <div>
                  {currentJob.hiringStatus === 'close' &&
                    <div
                      className={suit('hire-btn')}
                      onClick={this.onChangeHiringStatus}
                    >
                      <MdFace className={suit('hire-icon')} />
                      <span>Start Hiring for Role</span>
                    </div>}
                  {currentJob.hiringStatus !== 'close' &&
                    <div className={suit('head-hiring')}>Hiring</div>}
                  <HireTable
                    hiringArr={currentJob.hiringArr}
                    hiringStatus={currentJob.hiringStatus}
                    onChangeHiringStatus={this.onChangeHiringStatus}
                  />
                </div>
              </div>}
          </div>
        </div>
      </div>
    )
  }
}

Jobs.propTypes = {
  getDepartment: PropTypes.object,
  getJob: PropTypes.object,
  onSaveJob: PropTypes.func
}
