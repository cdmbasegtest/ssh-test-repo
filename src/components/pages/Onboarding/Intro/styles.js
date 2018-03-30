import styled from 'styled-components'
import { Flex, Text } from 'rebass'
import * as UI from 'components/ui'

import colors from 'constants/colors'

export const Container = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.WHITE};
`

export const Header = Flex.extend`height: 87px;`

export const Title = Text.extend`
  font-size: 26px;
  color: #7c7c7c;
  width: 286px;
`

export const Content = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
`
export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

export const Input = UI.Input.extend`
  width: 519px;
  font-family: Lato;
  font-size: 15px;
  color: #666666;
`

export const PhoneInput = Input.extend`
  width: 253px;
  margin-right: 266px;
`

export const SubmitInput = UI.Input.extend`
  width: 286px;
  height: 54px;
  border-radius: 100px;
  background-color: #4ab597;
  font-family: Lato;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  margin-top: 64px;
  margin-bottom: 73px;
`

export const Select = UI.Select.extend`
  width: 519px;
  font-family: Lato;
  font-weight: bold;
  font-size: 15px;
  color: #666666;
`

export const Label = styled.label`
  width: 381px;
  margin-right: 31px;
  font-family: Lato;
  font-size: 18px;
  text-align: right;
  color: #666666;
`

export const Textarea = UI.Textarea.extend`
  width: 519px;
  height: 132px;
  font-family: Lato;
  font-weight: bold;
  font-size: 15px;
  color: #666666;
`
