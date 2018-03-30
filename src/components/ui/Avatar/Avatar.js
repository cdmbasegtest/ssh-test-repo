import React from 'react'
import Rebass from 'rebass'
import noImage from './noImage.png'

const Avatar = ({ small, src, ...rest }) =>
  <Rebass.Avatar size={small ? 40 : 130} src={src ? src : noImage} {...rest} />

export default Avatar
