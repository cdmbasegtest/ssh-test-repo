import React from 'react'

import styled from 'styled-components'
import MdEdit from 'react-icons/lib/md/edit'

const EditItem = props =>
  <div {...props}>
    <MdEdit size="24" />
  </div>

export default styled(EditItem)`
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 38px;
  width: 34px;
  height: 34px;
  opacity: 0.7;
  background-color: #ffffff;
  border-radius: 50%;

  & :hover {
    background-color: #433e3d;
    color: #ffffff;
  }
`
