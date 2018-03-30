import styled from 'styled-components'
import { space, width, fontSize, color } from 'styled-system'

const CornerIcon = styled.div`
  ${space} ${width} ${fontSize} ${color};
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  display: block;
  background-color: white;
  transition: all 0.5s;
  width: 40px;
  height: 40px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: ghostwhite;
  }
`

export default CornerIcon
