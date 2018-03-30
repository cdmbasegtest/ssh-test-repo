import React from 'react'
import PT from 'prop-types'
import { Panel } from 'rc-collapse'
import { Divider, Accordion } from 'components/ui'
import { Flex, Border } from 'rebass'
import { SectionHeading, UserInfo, Name, Value } from './styles'
import get from 'lodash/get'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import { calculateAge } from 'helpers/date'
import { onlyUpdateForKeys } from 'recompose'

const printLanguages = languages => {
  return reduce(
    languages,
    (result, lang) => {
      return `${result} ${lang.name},`
    },
    ' '
  ).replace(/.$/, '.')
}

const CV = ({ employee }) => {
  const experiences = get(employee.profile, 'experiences')
  const languages = get(employee.profile, 'languages')
  return (
    <Accordion h={1}>
      <Panel header="CV">
        <Divider bg="#f5f5f5" color="#f5f5f5" h="4px" />
        <Flex direction="column" w={1}>
          <UserInfo>
            <Name>Age:</Name>
            <Value>
              {calculateAge(get(employee, 'profile.birthdate'))}
            </Value>
          </UserInfo>
          <UserInfo>
            <Name>Languages spoken:</Name>
            <Value>
              {printLanguages(languages)}
            </Value>
          </UserInfo>
          <SectionHeading>Contact</SectionHeading>
          <UserInfo>
            <Name>Email:</Name>
            <Value>
              {get(employee, 'profile.email')}
            </Value>
          </UserInfo>
          <UserInfo>
            <Name>Phone:</Name>
            <Value>
              {get(employee, 'profile.phone')}
            </Value>
          </UserInfo>
          <UserInfo>
            <Name>Address:</Name>
            <Value>
              {get(employee, 'profile.address')}
            </Value>
          </UserInfo>
          <SectionHeading>Skills</SectionHeading>
          {/* <WorkExperience> */}
          <UserInfo>
            <Name>Work experience:</Name>
            <Value>
              {map(experiences, exp =>
                <div key={exp.id} my={2}>
                  <div>
                    <strong>Company:</strong> {exp.company}
                  </div>
                  <div>
                    <strong>Position:</strong> {exp.position}
                  </div>
                  <div>
                    <strong>Period:</strong> {exp.period}
                  </div>
                  <Border color="gray" />
                </div>
              )}
            </Value>
          </UserInfo>
          {/* {map(experiences, exp =>
              <Box key={exp.id} my={2}>
                <Flex>
                  <Name>Company:</Name> <Value>{exp.company}</Value>
                  <Name>Position:</Name>
                  <Value>{exp.position}</Value>
                  <Name>Period:</Name>
                  <Value>{exp.period}</Value>
                </Flex>
              </Box>
            )} */}
          {/* </WorkExperience> */}
          <UserInfo>
            <Name>High scholarly:</Name> <Value>No info</Value>
          </UserInfo>
        </Flex>
      </Panel>
    </Accordion>
  )
}

CV.propTypes = {
  employee: PT.object.isRequired
}

export default onlyUpdateForKeys(['employee'])(CV)
