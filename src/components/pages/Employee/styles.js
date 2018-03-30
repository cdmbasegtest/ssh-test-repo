import styled from 'styled-components'
import { Flex } from 'rebass'

export const ContentHeader = Flex.extend`
  position: relative;
  justify-content: center;
  align-items: center;
  height: 74px;
  background-color: #f6f4f2;
`

export const Container = styled.div`
  width: 100%;
  overflow-y: auto;
`

export const Content = Flex.extend`
  justify-content: flex-end;
  padding: 13px 0;
  min-height: 89%;
  margin-top: 13px;
  background-color: #f6f4f2;
`

export const Title = styled.div`
  font-size: 22px;
  font-family: 'Mitr';
  padding: 0;
`

export const Current = styled.div`
  font-size: 18px;
  font-family: 'Prompt';
  padding: 0;
`

export const InviteButton = styled.button`
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  width: 204px;
  height: 28px;
  border-radius: 90px;
  background-color: #1a80bd;
  box-shadow: 0 2px 4px 0 rgba(15, 40, 106, 0.5);
  font-family: Lato;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
`

export const SendIcon = styled.div`
  position: absolute;
  left: 12px;
`

export const InviteTitle = styled.div`
  font-family: Prompt;
  font-size: 22px;
  font-weight: 500;
  color: #575757;
  margin-top: 85px;
`

export const InputGroup = Flex.extend`
  flex-direction: column;
  margin-top: 28px;
`

export const DepartmentInfo = Flex.extend`
  flex-direction: column;
  align-items: center;
  margin-top: 5px;

  & div {
    font-family: Lato;
    font-size: 20px;
    color: #575757;
    margin-top: 5px;
  }
`
