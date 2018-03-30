import React, { PureComponent } from 'react'
import PT from 'prop-types'
import { Cell } from './style'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import get from 'lodash/get'
import moment from 'helpers/moment'
import { getContext } from 'recompose'

import { ButtonCircle } from 'components/ui'
import { TimeOff, AvailableTime, Scheduled } from './style'

class EmployeeCell extends PureComponent {
  state = {
    show: false
  }

  onCellEnter = () => {
    this.setState({ show: true })
  }

  onCellLeave = () => {
    this.setState({ show: false })
  }

  onAddSchedule = () => {
    const { onOpenCreateShift, date, employee, schedule } = this.props
    onOpenCreateShift(date, employee, get(schedule, 'id'))
  }

  buildString(day, evening, night) {
    const array = []
    day && array.push('Day')
    evening && array.push('Evening')
    night && array.push('Night')
    return reduce(
      array,
      (result, time) => {
        return `${result} ${time},`
      },
      ' '
    ).replace(/.$/, '')
  }

  getShiftHours = shift =>
    moment
      .duration(
        moment(shift['finish-at'], 'HH:mm').diff(
          moment(shift['start-at'], 'HH:mm')
        )
      )
      .asHours()

  render() {
    const { show } = this.state
    const { availability, shift, editMode } = this.props
    const day = !!find(availability, { part: 'day' })
    const evening = !!find(availability, { part: 'evening' })
    const night = !!find(availability, { part: 'night' })
    const availabilityString =
      day || night || evening ? this.buildString(day, night, evening) : false

    return (
      <Cell onMouseEnter={this.onCellEnter} onMouseLeave={this.onCellLeave}>
        {editMode
          ? <div>
              {!shift &&
                !show &&
                availabilityString &&
                <AvailableTime>
                  Available: <br />
                  {availabilityString}
                </AvailableTime>}
              {!shift &&
              !show && //Removing time off on hover
                !availabilityString &&
                <TimeOff>Time Off</TimeOff>}
              {!shift &&
                show &&
                //availabilityString && //Gives ability to add schedule while Time Off
                <ButtonCircle
                  bg="#1a80bd"
                  color="#fff"
                  fontSize="13px"
                  w={130}
                  onClick={this.onAddSchedule}
                >
                  Add schedule
                </ButtonCircle>}
              {shift &&
                <Scheduled center color={shift.color}>
                  {shift['start-at']} - {shift['finish-at']} <br />
                  {shift.job.name} <br />
                  {this.getShiftHours(shift)} Hrs
                </Scheduled>}
            </div>
          : <div>
              {!shift &&
                availabilityString &&
                <AvailableTime>
                  Available: <br />
                  {availabilityString}
                </AvailableTime>}
              {!shift && !availabilityString && <TimeOff>Time Off</TimeOff>}
              {shift &&
                <Scheduled center color={shift.color}>
                  {shift['start-at']} - {shift['finish-at']} <br />
                  {shift.job.name} <br />
                  {this.getShiftHours(shift)} Hrs
                </Scheduled>}
            </div>}
      </Cell>
    )
  }
}

export default getContext({ editMode: PT.bool })(EmployeeCell)
