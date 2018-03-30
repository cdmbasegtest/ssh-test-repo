import React, { PureComponent } from 'react'
import { Tr } from './style'
import { Flex } from 'rebass'
import get from 'lodash/get'
import map from 'lodash/map'
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import { Avatar } from 'components/ui'
import { buildFullname } from 'helpers/employee'
import EmployeeCell from './Cell'
import moment from 'helpers/moment'

import { EmployeeName, Hours, JobName } from './style'

export default class TableRow extends PureComponent {
  getShiftHours = shift =>
    moment
      .duration(
        moment(get(shift, 'finish-at'), 'HH:mm').diff(
          moment(get(shift, 'start-at'), 'HH:mm')
        )
      )
      .asHours()

  render() {
    const {
      employee,
      availabilities,
      schedule,
      week,
      onOpenCreateShift
    } = this.props

    const weekDates = map(Array.from(week.by('day')), day =>
      day.format('YYYY-MM-DD')
    )

    const shifts = map(weekDates, day => {
      return find(get(schedule, 'shifts'), { date: day })
    })

    const totalHours = reduce(
      get(schedule, 'shifts'),
      (result, shift) => {
        return result + parseFloat(this.getShiftHours(shift))
      },
      0.0
    )

    return (
      <Tr>
        <Flex align="center">
          <Avatar ml={13} small src={get(employee, 'profile.avatar.url')} />
          <Flex align="center" direction="column" flex="1 0" justify="center">
            <JobName color="blue">
              {get(employee, 'job.name')}
            </JobName>
            <EmployeeName>
              {buildFullname(employee)}
            </EmployeeName>
            <Hours>
              {totalHours} Hrs
            </Hours>
          </Flex>
        </Flex>
        {map(availabilities, (availability, index) =>
          <EmployeeCell
            availability={availability}
            date={weekDates[index]}
            employee={employee}
            key={index}
            schedule={schedule}
            shift={shifts[index]}
            onOpenCreateShift={onOpenCreateShift}
          />
        )}
      </Tr>
    )
  }
}
