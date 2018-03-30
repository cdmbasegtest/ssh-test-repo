import { css } from 'styled-components'
import { getThemeField } from 'helpers/styles'
import { Flex } from 'rebass'

const Card = Flex.extend`
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  background-color: ${getThemeField('colors.WHITE')};
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.45);
  position: relative;
  ${css};
`

export default Card
