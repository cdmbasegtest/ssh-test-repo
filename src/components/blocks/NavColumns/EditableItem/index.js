import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'

import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import MdClose from 'react-icons/lib/md/close'

import { createSuit } from 'helpers/styles'
import './styles.css'
const suit = createSuit('EditableItem')

class EditableItem extends Component {
  constructor(props) {
    super(props)
    if (props.new) {
      this.state = {
        isEditing: true,
        newName: ''
      }
      return
    }
    this.state = {
      isEditing: false,
      newName: props.item.name,
      hovered: false
    }
  }

  saveItem = () => {
    const { onEditItem, onAddItem, onCancelCreating } = this.props
    const { newName } = this.state
    if (!newName) {
      onCancelCreating()
      return
    }
    const isNew = isEmpty(this.props.item)
    if (isNew) {
      onAddItem({ name: newName })
      return
    }
    onEditItem({ ...this.props.item, name: newName })
    this.setState({ isEditing: false })
  }

  toggleHoverOn = () => {
    this.setState({ hovered: true })
  }

  toggleHoverOff = () => {
    this.setState({ hovered: false })
  }

  onEditClick = () => {
    this.setState({ isEditing: true })
  }

  handleInput = event => {
    this.setState({ newName: event.currentTarget.value })
  }

  handleEnterPress = ({ keyCode }) => {
    if (keyCode === 13) {
      this.saveItem()
    }
  }

  render() {
    const { isEditing } = this.state
    const { item, onShowModal, onSelectItem, selected, kind } = this.props

    const isNew = isEmpty(this.props.item)

    const editingModeTexts = {
      job: {
        create: 'Create new role',
        edit: 'Edit role name'
      },
      department: {
        create: 'Create new department',
        edit: 'Edit department name'
      }
    }[kind]

    const editingModeText = isNew
      ? editingModeTexts['create']
      : editingModeTexts['edit']

    if (isEditing) {
      return (
        <div className={suit(`editing-${kind}`)}>
          <MdClose className={suit('close-button')} color="white" size="20" />
          <span>
            {editingModeText}
          </span>
          <input
            className={suit('edit')}
            ref={input => input && input.focus()}
            value={this.state.newName}
            onBlur={this.saveItem}
            onChange={this.handleInput}
            onKeyUp={this.handleEnterPress}
          />
        </div>
      )
    }
    return (
      <div
        className={cx(suit(kind), selected && suit(`${kind}-selected`))}
        onMouseLeave={this.toggleHoverOff}
        onMouseOver={this.toggleHoverOn}
      >
        <span
          className={suit(`${kind}-item-name`)}
          onClick={() => onSelectItem(item)}
        >
          {item.name}
        </span>
        {this.state.hovered &&
          <div className={suit(`${kind}-control-buttons`)}>
            <div onClick={() => onShowModal(item, kind)}>
              <MdDelete color="white" />
            </div>
            <div onClick={this.onEditClick}>
              <MdEdit color="white" />
            </div>
          </div>}
      </div>
    )
  }
}

EditableItem.propTypes = {
  editingStyle: PropTypes.object,
  item: PropTypes.object,
  kind: PropTypes.string,
  selected: PropTypes.bool,
  style: PropTypes.object,
  onAddItem: PropTypes.func,
  onCancelCreating: PropTypes.func,
  onEditItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  onShowModal: PropTypes.func
}

export default EditableItem
