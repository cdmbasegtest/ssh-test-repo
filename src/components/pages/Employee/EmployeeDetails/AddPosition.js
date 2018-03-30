import React, { PureComponent } from 'react'
import { Flex } from 'rebass'
import { ButtonCircle, Select, CardForm } from 'components/ui'
import PT from 'prop-types'
import { Formik } from 'formik'
import { buildJobsSelect } from 'helpers/employee'
import { onlyUpdateForKeys } from 'recompose'

const withFormik = Formik({
  handleSubmit(values, { props, resetForm }) {
    if (values.job) {
      props.onPositionAdd(values.job)
      props.onClose()
      resetForm()
      alert('Position added successfully')
    } else alert('Please select position.')
  }
})

class AddPosition extends PureComponent {
  render() {
    const {
      show,
      onClose,
      jobs,

      values,
      setFieldValue,
      handleSubmit
    } = this.props
    return (
      <CardForm
        heading="Add another position"
        mt={23}
        show={show}
        style={{ height: '498px' }}
        w={1}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <Select
          items={buildJobsSelect(jobs)}
          name="job"
          placeholder="Select position to assign"
          value={values.job}
          onChange={setFieldValue}
        />
        <Flex align="center" justify="space-around" w={1}>
          <ButtonCircle onClick={onClose}>Cancel</ButtonCircle>
          <ButtonCircle success type="submit">
            Yes
          </ButtonCircle>
        </Flex>
      </CardForm>
    )
  }
}

AddPosition.propTypes = {
  jobs: PT.array.isRequired,
  show: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  onPositionAdd: PT.func.isRequired
}

export default withFormik(
  onlyUpdateForKeys(['jobs', 'show', 'values'])(AddPosition)
)
