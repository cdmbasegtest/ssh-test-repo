import styled from 'styled-components'

export const DropdownContainer = styled.div`
  position: relative;
  background-color: #ffffff;
`

export const Options = styled.div`
  position: absolute;
  background-color: #78736e;
  top: 35px;
  right: 0;
  border-radius: 6px;
  color: #ffffff;
  padding: 5px 10px;

  & div {
    cursor: pointer;
  }
`
