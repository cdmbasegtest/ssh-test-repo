import styled from 'styled-components'
import { Flex } from 'rebass'

import colors from 'constants/colors'

export const Container = Flex.extend`flex: 1;`

export const NavBar = Flex.extend`
  height: 78px;
  background-color: ${colors.WHITE};
  padding-left: 14px;
`

export const Hint = Flex.extend`
  height: 76px;
  background-color: #eee;
`

export const HintText = styled.span`
  font-size: 18px;
  line-height: 22px;
  color: #606060;
`

export const ProgressContainer = Flex.extend`
  height: 120px;
  background-color: ${colors.WHITE};
`

export const Step = Flex.extend`flex: 1;`

export const ProgressContent = styled.div`width: 1100px;`
