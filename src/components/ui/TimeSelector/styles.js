import styled, { css } from 'styled-components'
import { Flex } from 'rebass'

export const Caption = styled.div`
  font-family: Prompt;
  font-size: 16px;
  font-weight: 500;
  color: #6d6c6c;
  margin-right: 19px;
`

const TimeButton = styled.button`
  display: flex;
  justify-content: center;
  width: 50px;
  height: 18px;
  background-color: ${p => (p.disabled ? '#d8d8d8' : '#969696')};
  font-size: 24px;
  border: none;
  cursor: pointer;
  outline: none;
  color: white;

  & > svg {
    margin-top: -4px;
  }
`

export const UpButton = TimeButton.extend`border-radius: 6px 6px 0 0;`
export const DownButton = TimeButton.extend`border-radius: 6px 6px 0 0;`

export const TimeInput = styled.input.attrs({
  type: 'time'
})`
  position: relative;
  width: 74px;
  font-family: Lato;
  font-size: 18px;
  text-align: center;
  color: #7c7a7a;
  border: none;
  outline: none;
  
  ${p => p.disabled && `padding-right: 23px`};
  
  &::-webkit-clear-button,
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`

export const Periods = Flex.extend`
  width: 68px;
  height: 24px;
  border: solid 1px #7c7a7a;
  text-transform: uppercase;
  font-family: Lato;
  font-size: 15px;
  background-color: #ffffff;
  color: #7c7a7a;
`
export const Period = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  ${p =>
    p.active &&
    css`
    background-color: #7c7a7a;
    color: #ffffff;
  `};
`
