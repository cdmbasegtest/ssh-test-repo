import React, { PureComponent } from 'react'
import PT from 'prop-types'
import styled from 'styled-components'
import { onlyUpdateForKeys } from 'recompose'

import { Relative, Flex } from 'rebass'

import { PicturePreview } from './styles'
import { DeleteItem } from 'components/ui'

class Pictures extends PureComponent {
  onClick = () => {
    this.props.onPictureDelete(this.props.picture)
  }

  render() {
    const { picture } = this.props
    return (
      <Flex className={this.props.className}>
        <Relative>
          <PicturePreview src={picture} />
          <DeleteItem onClick={this.onClick} />
        </Relative>
      </Flex>
    )
  }
}

Pictures.propTypes = {
  picture: PT.string.isRequired,
  onPictureDelete: PT.func.isRequired
}

export default onlyUpdateForKeys(['picture'])(styled(Pictures)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`)
