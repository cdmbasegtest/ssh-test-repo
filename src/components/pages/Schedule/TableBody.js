import React from 'react'
import EmployeeRow from './TableRow'
import { buildAvailability } from '../Employee/EmployeeDetails/Availability/Availability'
import get from 'lodash/get'
import map from 'lodash/map'
import findLast from 'lodash/findLast'

const TableBody = ({
  employees,
  toggleSchedule,
  schedules,
  week,
  onOpenCreateShift
}) => {
  return (
    <div>
      {map(employees, employee => {
        const schedule = findLast(schedules, {
          employee: { id: employee.id }
        })

        const {
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday
        } = buildAvailability(get(employee, 'profile.availabilities'))

        const availabilities = [
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday
        ]
        return (
          <EmployeeRow
            availabilities={availabilities}
            employee={employee}
            key={employee.id}
            schedule={schedule}
            toggleSchedule={toggleSchedule}
            week={week}
            onOpenCreateShift={onOpenCreateShift}
          />
        )
      })}
    </div>
  )
}

export default TableBody
