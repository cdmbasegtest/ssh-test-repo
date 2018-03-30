import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import head from 'lodash/head'

import { getFields, isOnboarded } from 'store/reducers/selectors/viewer'
import { getItems } from 'store/reducers/selectors/companies'
import { createCompany, updateCompany } from 'actions/companies'
import { completeStep, completeOnboarding } from 'actions/onboarding'

import Onboarding from './Onboarding'

const companySelector = createSelector(getItems, head)

const selector = createStructuredSelector({
  isOnboarded,
  company: companySelector,
  viewer: getFields
})

export default connect(selector, {
  onCompanyCreate: createCompany,
  onCompanyUpdate: updateCompany,
  onStepComplete: completeStep,
  onOnboardingComplete: completeOnboarding
})(Onboarding)
