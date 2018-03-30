import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isAuthenticated } from 'store/reducers/selectors/viewer'

import { authenticate } from 'actions/auth'

import Auth from './Auth'

const selector = createStructuredSelector({
  isAuthenticated
})

const actions = {
  onAuth: authenticate
}

export default connect(selector, actions)(Auth)
