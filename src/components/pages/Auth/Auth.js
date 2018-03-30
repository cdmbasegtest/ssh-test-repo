import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import * as routes from 'helpers/routes'

class Auth extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.onAuth()
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={routes.rootPath()} />
    }

    return <div className="AuthPage" />
  }
}

Auth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired
}

export default Auth
