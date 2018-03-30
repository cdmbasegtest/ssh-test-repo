import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import difference from 'lodash/difference'
import head from 'lodash/head'
import intersection from 'lodash/intersection'
import map from 'lodash/map'
import get from 'lodash/get'

import * as routes from 'helpers/routes'

import STEPS from 'constants/onboardingSteps'

import { Icon, Spinner } from 'components/ui'
import Intro from './Intro'
import OpenHours from './OpenHours'
import Progress from './Progress'

import iconLogo from 'assets/images/icons/logo.svg'

import {
  Container,
  NavBar,
  Hint,
  HintText,
  ProgressContainer,
  ProgressContent,
  Step
} from './styles'
import { branch, compose, renderComponent } from 'recompose'
import { Flex } from 'rebass'
import Profile from './Profile'

class Onboarding extends PureComponent {
  constructor(props) {
    super(props)

    const step =
      head(
        difference(this.getStepsIds(), get(props, 'viewer.onboarding-steps'))
      ) || head(STEPS).id

    const completedSteps = intersection(
      this.getStepsIds(),
      get(props, 'viewer.onboarding-steps')
    )

    this.state = {
      step,
      completedSteps
    }
  }

  componentWillReceiveProps(newProps) {
    const step =
      head(
        difference(this.getStepsIds(), get(newProps, 'viewer.onboarding-steps'))
      ) || head(STEPS).id

    const completedSteps = intersection(
      this.getStepsIds(),
      get(newProps, 'viewer.onboarding-steps')
    )
    if (step !== this.state.step) {
      this.setState({ step: step, completedSteps })
    }
  }

  getStepsIds() {
    return map(STEPS, 'id')
  }

  handleStepSelect = step => {
    this.setState({ step })
  }

  onIntroSubmit = values => {
    this.props.onStepComplete(STEPS[0])
    this.props.onCompanyCreate(values)
  }

  onHoursSubmit = values => {
    this.props.onStepComplete(STEPS[1])
    this.props.onCompanyUpdate(values)
  }

  onProfileSubmit = () => {
    this.props.onOnboardingComplete(STEPS[2])
  }

  renderSteps() {
    const { company } = this.props
    const { step } = this.state
    switch (step) {
      case STEPS[0].id:
        return (
          <Step>
            <Intro company={company} onIntroSubmit={this.onIntroSubmit} />
          </Step>
        )
      case STEPS[1].id:
        return (
          <Step>
            <OpenHours company={company} onHoursSubmit={this.onHoursSubmit} />
          </Step>
        )
      case STEPS[2].id:
        return (
          <Step>
            <Profile company={company} onProfileSubmit={this.onProfileSubmit} />
          </Step>
        )
      default:
        return null
    }
  }

  render() {
    const { isOnboarded } = this.props
    const { step, completedSteps } = this.state

    if (isOnboarded) {
      return <Redirect to={routes.rootPath()} />
    }

    return (
      <Container direction="column">
        <NavBar align="center">
          <Icon glyph={iconLogo} h="49px" w="58px" />
        </NavBar>

        <Hint align="center" justify="center">
          <HintText>
            To start working with the web app you have to create a company
            profile, opening hours and profile
          </HintText>
        </Hint>

        <ProgressContainer align="center" justify="center">
          <ProgressContent>
            <Progress
              completedSteps={completedSteps}
              step={step}
              steps={STEPS}
              onStepSelect={this.handleStepSelect}
            />
          </ProgressContent>
        </ProgressContainer>

        {this.renderSteps()}
      </Container>
    )
  }
}

Onboarding.propTypes = {
  company: PropTypes.object,
  isOnboarded: PropTypes.bool.isRequired,
  viewer: PropTypes.object
}

const SpinnerBig = () =>
  <Flex align="center" justify="center" w={1}>
    <Spinner size="huge" />
  </Flex>

export default compose(
  //onlyUpdateForKeys(['employees', 'employee', 'jobs']),
  branch(props => props.isLoaded, renderComponent(SpinnerBig))
)(Onboarding)
