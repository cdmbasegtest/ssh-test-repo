import React, { Component } from 'react'
import PT from 'prop-types'
import { Box, Flex } from 'rebass'
import {
  branch,
  compose,
  onlyUpdateForKeys,
  renderComponent,
  withContext
} from 'recompose'

import { ContentHeader, Title, DepartmentName } from './style'
import { Divider, Spinner } from 'components/ui'
import { NavColumns } from 'components/blocks'

import EditShift from './EditShift'
import WeekSwitch from './WeekSwitch'
import Toolbar from './Toolbar'

import { ShadowBox } from './style'
import HeaderRow from './HeaderRow'
import map from 'lodash/map'
import TableBody from './TableBody'

class DepButton extends Component {
  onClick = () => {
    if (this.props.editMode) {
      this.props.toggleEdit()
    }
    this.props.onDepartmentSelect(this.props.department.id)
  }
  render() {
    const department = this.props.department
    return (
      <button key={department.id} onClick={this.onClick}>
        {department.name}
      </button>
    )
  }
}

class Schedule extends Component {
  state = {
    showEditor: false,
    date: '',
    employee: {},
    scheduleId: '',
    create: false,
    edit: false
  }

  toggleEditor = () => {
    this.setState(state => ({ showEditor: !state.showEditor }))
  }

  onOpenCreateShift = (date, employee, scheduleId) => {
    this.setState({ date, employee, scheduleId, create: true, edit: false })
    this.toggleEditor()
  }

  onPublish = () => {
    this.props.schedules.forEach(schedule => {
      this.props.onPublish(schedule.id)
    })
    this.props.toggleEdit()
  }

  onWeekForward = () => {
    if (this.props.editMode) {
      this.props.toggleEdit()
    }
    const nextWeek = this.props.week.clone()
    nextWeek.start.add(1, 'week')
    nextWeek.end.add(1, 'week')
    this.props.onWeekShift(nextWeek)
  }

  onWeekBackward = () => {
    if (this.props.editMode) {
      this.props.toggleEdit()
    }
    const nextWeek = this.props.week.clone()
    nextWeek.start.subtract(1, 'week')
    nextWeek.end.subtract(1, 'week')
    this.props.onWeekShift(nextWeek)
  }

  onDepartmentSelect = departmentId => {
    if (this.props.editMode) {
      this.props.toggleEdit()
    }
    this.props.onDepartmentSelect(departmentId)
  }

  render() {
    const { showEditor, date, employee, scheduleId } = this.state
    const { employees, departments, schedules, week, editMode } = this.props
    const { onShiftAdd, onSortingChange, toggleEdit } = this.props
    return (
      <Flex align="stretch" bg="#f6f4f2" flex="1 0 auto">
        <NavColumns hideJobs />
        <Box flex="1 1 auto">
          <ContentHeader>
            <Title>Schedule</Title>
            <DepartmentName>Kitchen</DepartmentName>
          </ContentHeader>
          <Divider bg="white" color="white" h="13px" />
          {map(departments, department =>
            <DepButton
              department={department}
              key={department.id}
              onDepartmentSelect={this.onDepartmentSelect}
            />
          )}
          <Flex directuion="column" mx={13}>
            <ShadowBox direction="column">
              <EditShift
                date={date}
                employee={employee}
                scheduleId={scheduleId}
                show={showEditor}
                week={week}
                onClickOutside={this.toggleEditor}
                onClose={this.toggleEditor}
                onShiftAdd={onShiftAdd}
              />
              <WeekSwitch
                week={week}
                onWeekBackward={this.onWeekBackward}
                onWeekForward={this.onWeekForward}
              />
              <Toolbar
                editMode={editMode}
                toggleEdit={toggleEdit}
                onPublish={this.onPublish}
                onSortingChange={onSortingChange}
              />
              <HeaderRow week={week} />
              <TableBody
                employees={employees}
                schedules={schedules}
                toggleSchedule={this.toggleEditor}
                week={week}
                onOpenCreateShift={this.onOpenCreateShift}
              />
            </ShadowBox>
          </Flex>
        </Box>
      </Flex>
    )
  }
}

const SpinnerBig = () =>
  <Flex align="center" justify="center" w={1}>
    <Spinner size="huge" />
  </Flex>

export default compose(
  withContext(
    {
      editMode: PT.bool
    },
    props => ({
      editMode: props.editMode
    })
  ),
  onlyUpdateForKeys([
    'editMode',
    'employees',
    'departments',
    'schedules',
    'isLoaded',
    'isLoading',
    'week'
  ]),
  branch(props => {
    if (!props.isLoaded) {
      !props.isLoading && props.onInit()
      return true
    }
    return props.isLoading
  }, renderComponent(SpinnerBig))
)(Schedule)
