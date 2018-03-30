import styled from 'styled-components'
import React, { PureComponent } from 'react'
import PT from 'prop-types'
import { Box } from 'rebass'
import onClickOutside from 'react-onclickoutside'

class CornerDialog extends PureComponent {
  static propTypes = {
    show: PT.bool.isRequired,
    onClickOutside: PT.func.isRequired
  }

  static defaultProps = {
    show: false,
    onClickOutside: () => {}
  }

  handleClickOutside = () => {
    this.props.onClickOutside()
  }

  render() {
    return this.props.show ? <Box {...this.props} /> : null
  }
}

export default styled(onClickOutside(CornerDialog))`
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 6px;
  background-color: #56504e;
  box-shadow: 0 2px 5px 0 #595858;
`
