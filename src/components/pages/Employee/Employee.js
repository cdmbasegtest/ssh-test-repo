import React, { Component } from 'react'
import { NavColumns } from 'components/blocks'
import { Spinner } from 'components/ui'
import {
  Container,
  ContentHeader,
  Title,
  Current,
  InviteButton,
  SendIcon,
  Content
} from './styles'
import { Flex } from 'rebass'

import MdEmail from 'react-icons/lib/md/email'

import EmployeeDetails from './EmployeeDetails'
import Employees from './Employees'
import { branch, compose, onlyUpdateForKeys, renderComponent } from 'recompose'
import Invite from './Invite'

// class DepButton extends Component {
//   onClick = () => {
//     this.props.onDepartmentSelect(this.props.department.id)
//   }
//   render() {
//     const department = this.props.department
//     return (
//       <button key={department.id} onClick={this.onClick}>
//         {department.name}
//       </button>
//     )
//   }
// }

class Employee extends Component {
  state = {
    dialogOpen: false,
    showRemove: false,
    showMove: false,
    showAdd: false,
    showDelete: false,
    showInvite: false
  }

  toggle = stateField => () => {
    this.setState(state => ({ [stateField]: !state[stateField] }))
  }

  toggleAdd = this.toggle('showAdd')
  toggleDelete = this.toggle('showDelete')
  toggleDialog = this.toggle('dialogOpen')
  toggleMove = this.toggle('showMove')
  toggleRemove = this.toggle('showRemove')
  toggleInvite = this.toggle('showInvite')

  render() {
    const {
      employees,
      employee,
      employeeLoading,
      jobs
      // departments
    } = this.props
    const {
      onInviteSend,
      onEmployeeLoad,
      onPositionMoveFromTo,
      onPositionRemove,
      onPositionAdd,
      onEmployeeFire,
      onInit
      // onDepartmentSelect
    } = this.props

    const {
      dialogOpen,
      showRemove,
      showMove,
      showAdd,
      showDelete,
      showInvite
    } = this.state

    return (
      <Flex flex="1" justify="space-between" w={1}>
        <NavColumns />
        <Container>
          <ContentHeader>
            <Flex align="center" direction="column" justify="center">
              <Title>Employees</Title>
              <Current>
                Grocery / Clerk ({Object.keys(employees).length} employees)
              </Current>
            </Flex>
            <InviteButton onClick={this.toggleInvite}>
              <SendIcon>
                <MdEmail size="20" />
              </SendIcon>
              Invite employee
            </InviteButton>
          </ContentHeader>
          <Content>
            {!showInvite &&
              <div>
                <EmployeeDetails
                  dialogOpen={dialogOpen}
                  employee={employee}
                  employeeLoading={employeeLoading}
                  jobs={jobs}
                  showAdd={showAdd}
                  showDelete={showDelete}
                  showMove={showMove}
                  showRemove={showRemove}
                  toggleAdd={this.toggleAdd}
                  toggleDelete={this.toggleDelete}
                  toggleDialog={this.toggleDialog}
                  toggleMove={this.toggleMove}
                  toggleRemove={this.toggleRemove}
                  onEmployeeFire={onEmployeeFire}
                  onPositionAdd={onPositionAdd}
                  onPositionMoveFromTo={onPositionMoveFromTo}
                  onPositionRemove={onPositionRemove}
                />
              </div>}
            {showInvite &&
              <Invite
                jobs={jobs}
                onClose={this.toggleInvite}
                onInit={onInit}
                onInviteSend={onInviteSend}
              />}

            <Employees employees={employees} onEmployeeLoad={onEmployeeLoad} />
          </Content>
        </Container>
      </Flex>
    )
  }
}

const SpinnerBig = () =>
  <Flex align="center" justify="center" w={1}>
    <Spinner size="huge" />
  </Flex>

export default compose(
  onlyUpdateForKeys(['employees', 'employee', 'jobs']),
  branch(props => {
    if (!props.isLoaded) {
      !props.isLoading && props.onInit()
      return true
    }
    return props.isLoading
  }, renderComponent(SpinnerBig))
)(Employee)
