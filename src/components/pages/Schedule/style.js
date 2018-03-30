import styled from 'styled-components'
import { Flex, Relative } from 'rebass'
import { color } from 'styled-system'

export const ContentHeader = Flex.extend`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 74px;
  text-align: center;
  background-color: #f6f4f2;
`

const Base = styled.div`
  font-family: Lato;
  font-size: 12px;
`

export const Title = styled.div`
  font-family: Mitr;
  font-size: 22px;
  text-align: center;
  color: #575757;
`

export const HeaderDate = Base.extend`
  font-size: 13px;
  font-weight: bold;
  color: #737373;
`

export const CurrentWeek = styled.div`
  font-family: Prompt;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
`

export const DepartmentName = Title.extend`
  font-family: Prompt;
  font-size: 16px;
`

export const Tr = Flex.extend`
  width: 100%;
  min-height: 74px;
  background-color: #fff;
  border-right: solid 1px #d8d8d8;
  &:hover {
    background-color: rgba(255, 255, 255, 0.01);
  }

  > div:first-child {
    min-width: 175px;
    flex: 1.5 1;
    border-right: solid 3px #aca2a2;
  }
`



export const EmployeeName = Base.extend`
  font-size: 14px;
  color: #4b4a4a;
`

export const Hours = Base.extend`
  font-weight: bold;
  color: #cc7f3d;
`

export const JobName = Base.extend`
  font-weight: bold;
  color: #2d74c6;
`

export const TimeOff = Base.extend`
  font-size: 13px;
  font-weight: bold;
  font-style: italic;
  color: #e17f7f;
`

export const AvailableTime = Base.extend`
  font-size: 13px;
  color: #aeacac;
  text-align: center;
`

export const Scheduled = Base.extend`
  font-weight: bold;
  text-align: center;
  ${color};
`

export const Cell = Flex.extend`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: solid 1px #d8d8d8;
  flex: 1 0;
  position: relative;
`

export const ShadowBox = Relative.extend`
  flex: 1 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.45);
`

export const Circle = Flex.extend`
  cursor: pointer;
  border-radius: 50%;
  background-color: #ffffff;
  opacity: 0.43;
  justify-content: center;
  align-items: center;
`
