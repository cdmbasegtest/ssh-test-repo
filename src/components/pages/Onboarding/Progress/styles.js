import { Box } from 'rebass'

export const StepContainer = Box.extend`
  position: relative;

  :after {
    content: '';
    position: absolute;
    top: 11px;
    left: 50%;
    height: 4px;
    background-color: #d8d8d8;
    width: calc(100% + 40px);
  }
`
