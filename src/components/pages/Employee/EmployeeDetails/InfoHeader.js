import React from 'react'
import PT from 'prop-types'
import { Box } from 'rebass'
import { HeaderInfo } from './styles'
import { buildFullname } from 'helpers/employee'
import { formatDate } from 'helpers/date'
import { Avatar } from 'components/ui'
import get from 'lodash/get'
import { onlyUpdateForKeys } from 'recompose'

import { Flex } from 'rebass'

const InfoHeader = ({ employee }) => {
  const job = get(employee, 'job')
  const position = get(job, 'name')
  const salary = get(job, 'salary')
  return (
    <Flex>
      <Avatar ml={31} mt={31} />
      <Box mt={45} mx={20}>
        <HeaderInfo>
          <h1>
            {buildFullname(employee)}
          </h1>
        </HeaderInfo>
        <HeaderInfo>
          Date of hiring: <strong>{formatDate(employee['hired-at'])}</strong>
        </HeaderInfo>
        <HeaderInfo>
          Salary:{' '}
          <strong>{(salary && `${salary}$ / H`) || 'No information'}</strong>
        </HeaderInfo>
        <HeaderInfo>
          Position:{' '}
          <strong>{(position && `${position}`) || 'No position'}</strong>
        </HeaderInfo>
      </Box>
    </Flex>
  )
}

InfoHeader.propTypes = {
  employee: PT.object.isRequired
}

export default onlyUpdateForKeys(['employee'])(InfoHeader)
