import React, { PureComponent } from 'react'
import { Flex } from 'rebass'
import { ButtonCircle, Select, CardForm } from 'components/ui'
import PT from 'prop-types'
import { Formik } from 'formik'
import { buildJobsSelect } from 'helpers/employee'
import { onlyUpdateForKeys } from 'recompose'

const withFormik = Formik({
  handleSubmit(values, { props, resetForm }) {
    const { toJob } = values
    if (toJob !== null) {
      props.onPositionMoveFromTo(toJob)
      props.onClose()
      //Nasty behaviour, keeps previous props if not reset hence old employee causing undefined for second submit
      resetForm()
      alert('Moved from position successfully')
    } else alert('Please select positions so it makes sense :)')
  }
})

class MoveToPosition extends PureComponent {
  render() {
    const {
      show,
      onClose,
      jobs,

      values,
      handleSubmit,
      setFieldValue
    } = this.props
    return (
      <CardForm
        heading="Change position of the employee."
        show={show}
        style={{ height: '498px' }}
        w={1}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <h2>Choose position to move to</h2>
        <Select
          items={buildJobsSelect(jobs) || []}
          name="toJob"
          placeholder="Select position to move to"
          value={values.toJob}
          onChange={setFieldValue}
        />
        <Flex align="center" justify="space-around" w={1}>
          <ButtonCircle onClick={onClose}>Cancel</ButtonCircle>
          <ButtonCircle success type="submit">
            Move
          </ButtonCircle>
        </Flex>
      </CardForm>
    )
  }
}
MoveToPosition.propTypes = {
  jobs: PT.array.isRequired,
  show: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  onPositionMoveFromTo: PT.func.isRequired
}

export default withFormik(
  onlyUpdateForKeys(['jobs', 'show', 'values'])(MoveToPosition)
)
