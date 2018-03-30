import React from 'react'
import styled from 'styled-components'
import { getThemeField } from 'helpers/styles'
import { Flex } from 'rebass'

export const Centered = props =>
  <Flex align="center" justify="center" {...props} />

export const Option = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 50px;
  padding-left: 15px;
  transition: all 0.5s;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #433e3d;
  }
`

export const Icon = styled.div`padding-right: 15px;`

export const HeaderInfo = Flex.extend`
  margin-left: 46px;
  text-align: center;

  & h1 {
    font-family: Lato;
    font-size: 18px;
    text-align: left;
    color: #575757;
  }
`

export const UserInfo = Flex.extend`
  margin-top: 9.5px;
  margin-left: 80px;
  text-align: center;

  & h1 {
    font-size: 18px;
  }

  & p {
    color: ${getThemeField('colors.LIGHT_TEXT')};
  }
`

export const Name = Flex.extend`
  justify-content: flex-end;
  flex: 1 1 0%;
  font-family: Lato;
  font-size: 15px;
  font-weight: bold;
  color: #575757;
`

export const Value = styled.div`
  flex: 2 1 0%;
  text-align: left;
  margin-left: 15px;
`

export const SectionHeading = styled.h1`
  text-transform: uppercase;
  font-family: Prompt;
  font-size: 18px;
  width: 43%;
  text-align: right;
  margin-top: 32px;
  font-weight: 500;
  color: ${getThemeField('colors.SECTION_HEADING')};
`
