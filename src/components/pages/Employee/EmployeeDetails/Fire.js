import React, { PureComponent } from 'react'
import { Flex, Box } from 'rebass'
import { ButtonCircle, CardForm } from 'components/ui'
import PT from 'prop-types'
import { onlyUpdateForKeys } from 'recompose'

class Fire extends PureComponent {
  onFire = () => {
    this.props.onEmployeeFire()
    this.props.onClose()
  }

  render() {
    const { show, onClose } = this.props
    return (
      <CardForm
        is="form"
        mt={23}
        show={show}
        style={{ height: '498px' }}
        w={1}
        onClose={onClose}
      >
        <Box>
          <h3>Are you sure you want to delete this employee?</h3>
        </Box>
        <Flex align="center" direction="column" justify="space-around" w={1}>
          <ButtonCircle danger my={10} onClick={this.onFire}>
            Yes, delete
          </ButtonCircle>
          <ButtonCircle my={10} onClick={onClose}>
            Cancel
          </ButtonCircle>
        </Flex>
      </CardForm>
    )
  }
}

Fire.propTypes = {
  show: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  onEmployeeFire: PT.func.isRequired
}

export default onlyUpdateForKeys(['show'])(Fire)
