import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  ApplicantsList,
  ApplicantForm,
  InterviewForm,
  NavColumns
} from 'components/blocks'
import { createSuit } from 'helpers/styles'

import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'

import './styles.css'
import { branch, renderComponent } from 'recompose'
import { Flex } from 'rebass'
import { Spinner } from 'components/ui'

const suit = createSuit('Applicants')

class Applicants extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isInterviewFormShown: false
    }

    this.toggleState = this.toggleState.bind(this)
    this.closeInterviewForm = this.closeInterviewForm.bind(this)
  }

  componentDidMount() {
    const { isLoaded, getApplicants } = this.props
    !isLoaded && getApplicants()
  }

  componentWillReceiveProps() {
    this.setState({ isInterviewFormShown: false })
  }

  toggleState(newState) {
    if (newState === 'interview') {
      this.setState({ isInterviewFormShown: true })
    }
  }

  closeInterviewForm() {
    this.setState({ isInterviewFormShown: false })
  }

  render() {
    const { applicants, currentCV } = this.props.getApplicant

    const applicant = !isEmpty(currentCV)
      ? currentCV
      : find(applicants, { type: 'new' })
    return (
      <div className={suit()}>
        <NavColumns />
        <div className={suit('container')}>
          <div className={suit('header_line')}>
            <div className={suit('header_title')}>Applicants</div>
            <div className={suit('header_amount')}>
              Grocery / Clerk (52 applicants)
            </div>
          </div>
          <div className={suit('applicants_wrapper')}>
            {applicant &&
              <ApplicantForm
                applicant={applicant}
                applicants={applicants}
                destroyApplicant={this.props.destroyApplicant}
                setApplicantPending={this.props.setApplicantPending}
                toggleState={this.toggleState}
              />}
            {this.state.isInterviewFormShown &&
              <InterviewForm
                applicant={applicant}
                applicants={applicants}
                setApplicantInterview={this.props.setApplicantInterview}
                onFormClose={this.closeInterviewForm}
              />}
            <ApplicantsList
              currentApplicant={applicant}
              list={applicants}
              sortApplicants={this.props.sortApplicants}
              onSelect={this.props.selectApplicant}
            />
          </div>
        </div>
      </div>
    )
  }
}

Applicants.propTypes = {
  getApplicant: PropTypes.object,
  getApplicants: PropTypes.func,
  getJWTHeader: PropTypes.string,
  setApplicantInterview: PropTypes.func,
  setApplicantPending: PropTypes.func,
  sortApplicants: PropTypes.func,
  onSelectApplicant: PropTypes.func
}
const SpinnerBig = () =>
  <Flex align="center" justify="center" w={1}>
    <Spinner size="huge" />
  </Flex>

export default branch(props => {
  if (!props.isLoaded) {
    !props.isLoading && props.getApplicants(props.userCompanyId)
    return true
  }
  return props.isLoading
}, renderComponent(SpinnerBig))(Applicants)
