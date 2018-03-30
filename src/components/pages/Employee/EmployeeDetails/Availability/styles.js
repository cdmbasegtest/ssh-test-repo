import styled, { css } from 'styled-components'
import { getThemeField } from 'helpers/styles'
import { Flex } from 'rebass'

export const Table = styled.table`
  border-spacing: 0;
  padding-bottom: 31px;

  & th,
  & tr,
  & td {
    width: 66px;
    height: 30px;
  }

  & tr td:nth-of-type(1) {
    padding-right: 14px;
    border: none;
    text-align: right;
  }

  & thead {
    border: none;
    padding-bottom: 10px;
  }

  & tbody td {
    border: solid 1px ${getThemeField('colors.TABLE_BORDER')};
  }
`
// prettier-ignore
export const Cell = styled.td`
    position: sticky;

  ${p => p.available && css`
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 3px;
      left: 3px;
      right: 3px;
      bottom: 3px;
      z-index: -1;
      background-color: ${getThemeField('colors.BLUE')};
    }
  `};
`

export const CheckIcon = Flex.extend`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`
