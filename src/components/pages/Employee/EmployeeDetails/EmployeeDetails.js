import React, { PureComponent } from 'react'
import PT from 'prop-types'
import { branch, compose, onlyUpdateForKeys, renderComponent } from 'recompose'
import get from 'lodash/get'

import { SectionHeading, Centered } from './styles'
import { Divider, CornerIcon, Card, Spinner } from 'components/ui'

import Availability from './Availability'
import AddPosition from './AddPosition'
import RemovePosition from './RemovePosition'
import MoveToPosition from './MoveToPosition'
import Fire from './Fire'
import CV from './CV'
import Dialog from './Dialog'
import InfoHeader from './InfoHeader'
import { Flex } from 'rebass'

import MdSettings from 'react-icons/lib/md/settings'

class EmployeeDetails extends PureComponent {
  render() {
    const {
      dialogOpen,
      employee,
      jobs,
      showAdd,
      showDelete,
      showMove,
      showRemove
    } = this.props

    const {
      onEmployeeFire,
      onPositionAdd,
      onPositionMoveFromTo,
      onPositionRemove,
      toggleAdd,
      toggleDelete,
      toggleDialog,
      toggleMove,
      toggleRemove
    } = this.props

    const menuOpen = showAdd || showDelete || showMove || showRemove
    const haveJob = !!get(employee, 'job')
    return (
      <Card mr={13} w={497}>
        {!menuOpen &&
          <CornerIcon onClick={toggleDialog}>
            <MdSettings color="#8e8e8e" size="23" />
          </CornerIcon>}
        <Dialog
          dialogOpen={dialogOpen}
          haveJob={haveJob}
          toggleAdd={toggleAdd}
          toggleDelete={toggleDelete}
          toggleDialog={toggleDialog}
          toggleMove={toggleMove}
          toggleRemove={toggleRemove}
        />
        <InfoHeader employee={employee} />

        <AddPosition
          jobs={jobs}
          show={showAdd}
          onClose={toggleAdd}
          onPositionAdd={onPositionAdd}
        />
        <Fire
          show={showDelete}
          onClose={toggleDelete}
          onEmployeeFire={onEmployeeFire}
        />
        <MoveToPosition
          jobs={jobs}
          show={showMove}
          onClose={toggleMove}
          onPositionMoveFromTo={onPositionMoveFromTo}
        />
        <RemovePosition
          employee={employee}
          show={showRemove}
          onClose={toggleRemove}
          onPositionRemove={onPositionRemove}
        />

        {!menuOpen &&
          <Flex align="center" direction="column" justify="center" w={1}>
            <Centered mt={44}>
              <SectionHeading> Availabilities </SectionHeading>
            </Centered>
            <Availability employee={employee} />
            <CV employee={employee} />
            <Divider bg="gray" color="gray" h="4px" />
          </Flex>}
      </Card>
    )
  }
}

EmployeeDetails.propTypes = {
  dialogOpen: PT.bool.isRequired,
  employee: PT.object.isRequired,
  jobs: PT.array.isRequired,
  showAdd: PT.bool.isRequired,
  showDelete: PT.bool.isRequired,
  showMove: PT.bool.isRequired,
  showRemove: PT.bool.isRequired,
  toggleAdd: PT.func.isRequired,
  toggleDelete: PT.func.isRequired,
  toggleDialog: PT.func.isRequired,
  toggleMove: PT.func.isRequired,
  toggleRemove: PT.func.isRequired,
  onEmployeeFire: PT.func.isRequired,
  onPositionAdd: PT.func.isRequired,
  onPositionMoveFromTo: PT.func.isRequired,
  onPositionRemove: PT.func.isRequired
}

const SpinnerLoading = () =>
  <Flex align="center" justify="center" m={40} w={497}>
    <Spinner size="huge" />
  </Flex>

export default compose(
  onlyUpdateForKeys([
    'dialogOpen',
    'employee',
    'jobs',
    'showAdd',
    'showDelete',
    'showMove',
    'showRemove'
  ]),
  branch(props => props.employeeLoading, renderComponent(SpinnerLoading))
)(EmployeeDetails)
