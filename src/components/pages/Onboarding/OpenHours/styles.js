import styled from 'styled-components'
import { Flex, Text } from 'rebass'

import colors from 'constants/colors'

export const Container = styled.div`
  flex: 1;
  background-color: #ffffff;
  justifyContent: center;
  align-items: center;
`

export const Header = Flex.extend`
  height: 87px;
  background-color: #ffffff;
`

export const Title = Text.extend`
  font-size: 26px;
  color: #7c7c7c;
`

export const Content = styled.div`
  padding-top: 35px;
  padding-bottom: 35px;
  display: flex;
  flex: 1;
  background-color: #eeeeee;
  flex-direction: column;
  justifyContent: center;
  align-items: center;
`
export const FlexStyle = {
  backgroundColor: 'white',
  borderRadius: '6px',
  width: '764px',
  height: '120px',
  justifyContent: 'flex-start',
}

export const Row = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.17);
  margin-bottom: 14px;
`

// TODO: Remove that style inject
export const DayActive = {
  width: '224px',
  height: '120px',
  borderTopLeftRadius: '6px',
  borderBottomLeftRadius: '6px',
  backgroundColor: '#4d9984',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginRight: '36px',
  position: 'relative'
}

// TODO: Remove that style inject
export const DayDisactive = {
  width: '224px',
  height: '120px',
  borderTopLeftRadius: '6px',
  borderBottomLeftRadius: '6px',
  backgroundColor: '#969696',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginRight: '36px',
  position: 'relative'
}

export const DayText = styled.div`
  font-family: Prompt;
  font-size: 20px;
  font-weight: 500;
  text-align: left;
  color: #ffffff;
  margin-left: 32px;
`
export const HR = styled.div`
  width: 4px;
  height: 100px;
  background-color: #f2f2f2;
  margin-left: 21px;
  margin-right: 32px;
`
export const OpenedAttribute = styled.div`
  position: absolute;
  right: 7px;
  top: 7px;
  font-family: Prompt;
  font-size: 11px;
  font-weight: 500;
  text-align: right;
  color: #d6fff4;
`

export const ClosedAttribute = styled.div`
  position: absolute;
  right: 7px;
  top: 7px;
  font-family: Prompt;
  font-size: 11px;
  font-weight: 500;
  text-align: right;
  color: #f9faec;
`

// TODO: Remove that style inject
export const CheckBoxStyle = {
  marginLeft: '22px',
  width: '24px',
  height: '24px'
}

export const SubmitRow = styled.div`
  display: flex;
  flex: 1;
  height: 170px;
  justify-content: center;
  align-items: center;
`
