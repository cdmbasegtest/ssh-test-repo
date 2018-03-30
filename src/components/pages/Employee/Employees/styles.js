import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'

export const Header = props =>
  <Flex
    align="center"
    bg="#78736e"
    color="white"
    justify="center"
    {...props}
    w={1}
  />

export const EmployeesContainer = Flex.extend`
  flex-direction: column;
  height: 703px;
  align-items: center;
  background-color: #edebeb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  width: 270px;
`

export const EmployeeName = styled.div`
  font-family: Lato;
  font-size: 14px;
  font-weight: bold;
  color: #565656;
  margin-left: 12px;
`

export const H1 = styled.h1`
  font-family: Prompt;
  font-size: 18px;
  font-weight: 500;
`

export const Search = styled.input`
  height: 30px;
  width: 254px;
  background-color: #ffffff;
  border: solid 1px #979797;
  margin: 8px 0;
  padding: 6px 10px;
`
