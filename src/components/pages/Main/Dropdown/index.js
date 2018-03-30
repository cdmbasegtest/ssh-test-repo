import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { DropdownContainer, Options } from './styles'

import MdArrowDown from 'react-icons/lib/md/arrow-drop-down'
import MdArrowUp from 'react-icons/lib/md/arrow-drop-up'

const ToggleVisibility = ({ isShown, toggleVisibility }) => {
  const Component = isShown ? MdArrowUp : MdArrowDown
  return <Component size="22" onClick={toggleVisibility} />
}

class Dropdown extends PureComponent {
  state = {
    isShown: false
  }

  toggleVisibility = () => {
    this.setState({ isShown: !this.state.isShown })
  }

  render() {
    const { isShown } = this.state
    return (
      <DropdownContainer>
        <ToggleVisibility
          isShown={isShown}
          toggleVisibility={this.toggleVisibility}
        />
        {isShown &&
          <Options>
            <div onClick={this.props.onLogOut}>Logout</div>
          </Options>}
      </DropdownContainer>
    )
  }
}

Dropdown.propTypes = {
  onLogOut: PropTypes.func
}

export default Dropdown
