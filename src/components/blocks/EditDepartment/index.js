import React, { Component } from 'react'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import { createSuit } from 'helpers/styles'

import './styles.css'

const suit = createSuit('editDepartmnent')

class EditDepartment extends Component {
  constructor(props) {
    super(props)

    const data = this.props.data || { text: '' }

    this.state = {
      text: data.text
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.onOkClick = this.onOkClick.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data || { text: '' }
    this.setState({ text: data.text })
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value })
  }

  onOkClick(event) {
    const { onSaveDep, onHideDep, onAddDepartment } = this.props
    const isNew = isEmpty(this.props.data)
    const { text } = this.state

    if (isNew) {
      onAddDepartment(this.state)
    } else {
      onSaveDep({ text, id: this.props.data.id })
    }

    onHideDep()
  }

  onCancelClick(event) {
    this.props.onHideDep()
  }

  render() {
    const { text } = this.state
    return (
      <div className={suit()}>
        <input type="text" value={text} onChange={this.handleTextChange} />
        <button onClick={this.onOkClick}>OK</button>
        <button onClick={this.onCancelClick}>Cancel</button>
      </div>
    )
  }
}

EditDepartment.propTypes = {
  data: PropTypes.object,
  onAddDepartment: PropTypes.func,
  onHideDep: PropTypes.func,
  onSaveDep: PropTypes.func
}

export { EditDepartment }
