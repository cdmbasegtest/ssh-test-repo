import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ModalContainer, ModalDialog } from 'react-modal-dialog'

class ModalWindow extends Component {
  constructor(props) {
    super(props)

    const text = this.props.text || 'Are you sure?'
    const description = this.props.description || ''
    this.state = {
      text,
      description
    }
    this.onOkClick = this.onOkClick.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)
  }

  onOkClick(event) {
    this.props.callback(true)
  }

  onCancelClick(event) {
    this.props.callback(false)
  }

  render() {
    const { text, description } = this.state
    return (
      <div onClick={this.onCancelClick}>
        <ModalContainer>
          <ModalDialog>
            <h2>
              {text}
            </h2>
            <p>
              {description}
            </p>
            <button onClick={this.onOkClick}>OK</button>
            <button onClick={this.onCancelClick}>Cancel</button>
          </ModalDialog>
        </ModalContainer>
      </div>
    )
  }
}

ModalWindow.propTypes = {
  callback: PropTypes.func,
  description: PropTypes.string,
  text: PropTypes.string.isRequired
}

export { ModalWindow }
