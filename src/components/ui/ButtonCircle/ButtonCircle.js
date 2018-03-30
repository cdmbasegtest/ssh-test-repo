import PT from 'prop-types'
import Rebass from 'rebass'
import { getThemeField } from '../../../helpers/styles'
import { width, color, fontSize } from 'styled-system'

const ButtonCircle = Rebass.ButtonCircle.extend`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 175px;
  height: 40px;
  height: ${p => p.h};
  padding: 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  color: #312e2e;
  background-color: ${getThemeField('colors.BUTTON_DEFAULT')};
  background-color: ${p =>
    p.danger && getThemeField('colors.BUTTON_DANGER')(p)};
  color: ${p => p.danger && '#ffffff'};
  color: ${p => p.success && '#ffffff'};
  background-color: ${p =>
    p.success && getThemeField('colors.BUTTON_SUCCESS')(p)};
  align-self: ${p => p.centered && 'center'};
  font-family: Lato;
  ${width}
  ${color}
  ${fontSize}
`
ButtonCircle.propTypes = {
  danger: PT.bool,
  success: PT.bool
}

export default ButtonCircle
