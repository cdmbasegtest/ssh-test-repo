import styled from 'styled-components'
import { getThemeField } from 'helpers/styles'
import Collapse from 'rc-collapse'

const Accordion = styled(Collapse)`
   & {
     width: 100%;
     font-family: Prompt;
     font-size: 18px;
     font-weight: 500;
     color: ${getThemeField('colors.SECTION_HEADING')}
     background-color: unset;
     border-radius: unset;
     border: none;
     text-align: center;
   }

    & .rc-collapse-content {
      padding: 0 0;
      text-transform: none;
      font-family: Lato;
      font-size: initial;
      font-weight: unset;
      color: #575757;
      background-color: unset;
      border-radius: unset;
      border: none;
      text-align: left;
    }
    
    & .rc-collapse-header {
      text-indent: unset;
      color: inherit;
      cursor: pointer;
    }
`
export default Accordion
