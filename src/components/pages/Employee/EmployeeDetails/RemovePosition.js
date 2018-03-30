import React from 'react'
import { Flex } from 'rebass'
import { ButtonCircle, CardForm } from 'components/ui'
import PT from 'prop-types'
import { Formik } from 'formik'
import get from 'lodash/get'
import { onlyUpdateForKeys } from 'recompose'

const withFormik = Formik({
  handleSubmit(values, { props, resetForm }) {
    props.onPositionRemove(get(props, 'employee.job'))
    props.onClose()
    resetForm()
    alert('Position removed successfully')
  }
})

const RemovePosition = ({
  show,
  onClose,

  values,
  setFieldValue,
  handleSubmit
}) =>
  <CardForm
    show={show}
    style={{ height: '498px' }}
    w={1}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <Flex align="center" direction="column">
      <h3>Are you sure you want to remove from position</h3>
    </Flex>
    <Flex align="center" direction="column" justify="space-around" w={1}>
      <ButtonCircle danger my={10} type="submit">
        Yes, remove
      </ButtonCircle>
      <ButtonCircle my={10} onClick={onClose}>
        Cancel
      </ButtonCircle>
    </Flex>
  </CardForm>

RemovePosition.propTypes = {
  employee: PT.object.isRequired,
  show: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  onPositionRemove: PT.func.isRequired
}

export default withFormik(
  onlyUpdateForKeys(['employee', 'show', 'values'])(RemovePosition)
)
