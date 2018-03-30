import React, { PureComponent } from 'react'
import { Flex } from 'rebass'
import {
  ButtonCircle,
  Card,
  Input,
  Label,
  Select,
  CornerIcon
} from 'components/ui'
import PT from 'prop-types'
import { Formik } from 'formik'
import Yup from 'yup'
import { buildJobsSelect } from 'helpers/employee'
import { onlyUpdateForKeys } from 'recompose'

import MdClose from 'react-icons/lib/md/close'

import { InviteTitle as Title, InputGroup, DepartmentInfo } from './styles'

const withFormik = Formik({
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    first: Yup.string().required('First name is required'),
    last: Yup.string().required('Last name is required'),
    job: Yup.number().integer().required('Please select a job')
  }),

  handleSubmit(values, { props }) {
    const { first, last, job, email } = values
    props.onInviteSend({ first, last, email, job })
    props.onClose()
    props.onInit()
    alert('Invitation sent successfully')
  }
})

class Invite extends PureComponent {
  render() {
    const { values, setFieldValue, handleSubmit, jobs, onClose } = this.props
    return (
      <Card is="form" mr={13} w={497} onSubmit={handleSubmit}>
        <CornerIcon onClick={onClose}>
          <MdClose size="24" />
        </CornerIcon>
        <Title>Invite employee</Title>
        <DepartmentInfo>
          <div>to</div>
          <div>Grocery department</div>
          <div>Clerk subdepartment</div>
        </DepartmentInfo>
        <Flex direction="column" mt={35}>
          <Select
            items={buildJobsSelect(jobs)}
            name="job"
            placeholder="Select position to assign"
            value={values.job}
            w={366}
            onChange={setFieldValue}
          />
          <InputGroup>
            <Label>Name of employee:</Label>
            <Input
              name="first"
              placeholder="First name"
              value={values.first}
              onChange={setFieldValue}
            />
          </InputGroup>
          <InputGroup>
            <Label>Last name:</Label>
            <Input
              name="last"
              placeholder="Last name"
              value={values.last}
              onChange={setFieldValue}
            />
          </InputGroup>
          <InputGroup>
            <Label>Email of employe(required)</Label>
            <Input
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={setFieldValue}
            />
          </InputGroup>
          <ButtonCircle centered mt={135} success type="submit" w={273}>
            Send invite
          </ButtonCircle>
        </Flex>
      </Card>
    )
  }
}

Invite.propTypes = {
  jobs: PT.array.isRequired,
  show: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  onInviteSend: PT.func.isRequired
}

export default withFormik(onlyUpdateForKeys(['jobs', 'show', 'values'])(Invite))
