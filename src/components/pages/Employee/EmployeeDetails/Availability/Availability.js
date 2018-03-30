import React from 'react'
import PT from 'prop-types'
import { Table, Cell, CheckIcon } from './styles'
import { Centered } from '../styles'
import concat from 'lodash/concat'
import filter from 'lodash/filter'
import memoize from 'lodash/memoize'
import find from 'lodash/find'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import { onlyUpdateForKeys } from 'recompose'

import MdCheck from 'react-icons/lib/md/check'

const Check = props =>
  <CheckIcon>
    <MdCheck color="#ffffff" size="18" />
  </CheckIcon>

export const buildAvailability = memoize(availabilities => {
  const day = filter(availabilities, { part: 'day' })
  const evening = filter(availabilities, { part: 'evening' })
  const night = filter(availabilities, { part: 'night' })
  const monday = concat(
    [],
    filter(day, { day: 0 }),
    filter(evening, { day: 0 }),
    filter(night, { day: 0 })
  )
  const tuesday = concat(
    [],
    filter(day, { day: 1 }),
    filter(evening, { day: 1 }),
    filter(night, { day: 1 })
  )
  const wednesday = concat(
    [],
    filter(day, { day: 2 }),
    filter(evening, { day: 2 }),
    filter(night, { day: 2 })
  )
  const thursday = concat(
    [],
    filter(day, { day: 3 }),
    filter(evening, { day: 3 }),
    filter(night, { day: 3 })
  )
  const friday = concat(
    [],
    filter(day, { day: 4 }),
    filter(evening, { day: 4 }),
    filter(night, { day: 4 })
  )
  const saturday = concat(
    [],
    filter(day, { day: 5 }),
    filter(evening, { day: 5 }),
    filter(night, { day: 5 })
  )
  const sunday = concat(
    [],
    filter(day, { day: 5 }),
    filter(evening, { day: 5 }),
    filter(night, { day: 5 })
  )
  return { monday, tuesday, wednesday, thursday, friday, saturday, sunday }
})

const DAYS = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun'
}

const buildDay = (dayArr, dayName) => {
  if (isArray(dayArr) && dayArr.length > 0) {
    const day = !!find(dayArr, { part: 'day' })
    const evening = !!find(dayArr, { part: 'evening' })
    const night = !!find(dayArr, { part: 'night' })
    return (
      <tr>
        <td>
          {dayName}
        </td>
        <Cell available={day}>
          {day && <Check />}
        </Cell>
        <Cell available={evening}>
          {evening && <Check />}
        </Cell>
        <Cell available={night}>
          {night && <Check />}
        </Cell>
      </tr>
    )
  }
  return (
    <tr>
      <td>
        {dayName}
      </td>
      <Cell />
      <Cell />
      <Cell />
    </tr>
  )
}

const Availability = ({ employee }) => {
  const days = buildAvailability(get(employee, 'profile.availabilities'))
  return (
    <Centered>
      <Table>
        <thead>
          <tr>
            <th />
            <th>Day</th>
            <th>Evening</th>
            <th>Night</th>
          </tr>
        </thead>
        <tbody>
          {buildDay(days.monday, DAYS[0])}
          {buildDay(days.tuesday, DAYS[1])}
          {buildDay(days.wednesday, DAYS[2])}
          {buildDay(days.thursday, DAYS[3])}
          {buildDay(days.friday, DAYS[4])}
          {buildDay(days.saturday, DAYS[5])}
          {buildDay(days.sunday, DAYS[6])}
        </tbody>
      </Table>
    </Centered>
  )
}

Availability.propTypes = {
  employee: PT.object.isRequired
}

export default onlyUpdateForKeys(['employee'])(Availability)
