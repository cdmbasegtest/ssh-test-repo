import React from 'react'
import PT from 'prop-types'
import { Flex, Box } from 'rebass'
import styled from 'styled-components'
import { space, width, fontSize, color } from 'styled-system'

const Form = ({ show, onClose, heading, children, px, ...rest }) => {
  return show
    ? <Flex color="white" is="form" px={px ? px : 20} {...rest}>
        <Box>
          <h2>
            {heading}
          </h2>
        </Box>
        {children}
      </Flex>
    : null
}

Form.propTypes = {
  heading: PT.string,
  show: PT.bool.isRequired,
  onClose: PT.func.isRequired
}

export default styled(Form)`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  position: relative;
  flex-direction: column;
  background-color: #78736e;
  flex-grow: 1;
  justify-content: space-around;
  align-items: center;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`
