import React, { PureComponent } from 'react'
import PT from 'prop-types'
import { Option, Icon } from './styles'
import { CornerDialog } from 'components/ui'
import { onlyUpdateForKeys } from 'recompose'

import MdAdd from 'react-icons/lib/md/add'
import MdDelete from 'react-icons/lib/md/delete'
import MdSwap from 'react-icons/lib/md/swap-horiz'
import MdRemove from 'react-icons/lib/md/highlight-remove'

class Dialog extends PureComponent {
  toggleWithDialog = cb => () => {
    this.props.toggleDialog()
    cb()
  }

  toggleAdd = this.toggleWithDialog(this.props.toggleAdd)
  toggleDelete = this.toggleWithDialog(this.props.toggleDelete)
  toggleMove = this.toggleWithDialog(this.props.toggleMove)
  toggleRemove = this.toggleWithDialog(this.props.toggleRemove)

  render() {
    const { dialogOpen, haveJob, toggleDialog } = this.props
    return (
      <CornerDialog show={dialogOpen} w={250} onClickOutside={toggleDialog}>
        {haveJob &&
          <Option onClick={this.toggleMove}>
            <Icon>
              <MdSwap size="22" />
            </Icon>
            Move to another position
          </Option>}
        {haveJob &&
          <Option onClick={this.toggleRemove}>
            <Icon>
              <MdRemove size="22" />
            </Icon>
            Remove from the position
          </Option>}
        {!haveJob &&
          <Option onClick={this.toggleAdd}>
            <Icon>
              <MdAdd size="22" />
            </Icon>
            Add position
          </Option>}
        <Option onClick={this.toggleDelete}>
          <Icon>
            <MdDelete size="22" />
          </Icon>
          Remove from company
        </Option>
      </CornerDialog>
    )
  }
}

Dialog.propTypes = {
  dialogOpen: PT.bool.isRequired,
  haveJob: PT.bool.isRequired,
  toggleAdd: PT.func.isRequired,
  toggleDelete: PT.func.isRequired,
  toggleDialog: PT.func.isRequired,
  toggleMove: PT.func.isRequired,
  toggleRemove: PT.func.isRequired
}

export default onlyUpdateForKeys(['haveJob', 'dialogOpen'])(Dialog)
