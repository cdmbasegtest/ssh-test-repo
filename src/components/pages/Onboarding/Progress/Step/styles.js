import styled from 'styled-components'
import { Flex } from 'rebass'

import colors from 'constants/colors'

export const Circle = Flex.extend`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #d8d8d8;
  margin-bottom: 15px;
  cursor: ${p => (p.isSelectable ? 'pointer' : 'default')};

  ${p => p.isCompleted && 'background-color: #979797;'};

  ${p =>
    p.isSelected &&
    `
      position: relative;
      background-color: #4ab597;

      :before {
        content: " ";
        position: absolute;
        top: -6px;
        left: -6px;
        right: -6px;
        bottom: -6px;
        border: 3px solid #4ab597;
        border-radius: 50%;
      }
    `};
`

export const Name = styled.span`
  font-size: 18px;
  color: #bfbfbf;

  ${p => p.isCompleted && 'color: #a5a4a4'};
  ${p => p.isSelected && 'color: #4ab597'};
`

export const Index = styled.span`
  font-size: 14px;
  color: ${colors.WHITE};
`
