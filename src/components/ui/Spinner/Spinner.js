import React from 'react'
import PT from 'prop-types'
import { keyframes } from 'styled-components'
import iconLoading from './icon-loading.svg'
import { Icon } from 'components/ui/Icon'

const rotate360 = keyframes`
  100% { transform: rotate(360deg); }
`

const RotatingIcon = Icon.extend`animation: ${rotate360} .8s linear infinite;`

const getGeometry = size => ({
  width: size,
  height: size
})

const SIZES = {
  small: 15,
  normal: 20,
  large: 30,
  huge: 500
}

const Spinner = ({ size }) => {
  let geometry

  if (typeof size === 'number') {
    geometry = getGeometry(size)
  } else if (typeof size === 'string') {
    geometry = getGeometry(SIZES[size])
  }

  return (
    <RotatingIcon
      glyph={iconLoading}
      h={`${geometry.height}px`}
      w={geometry.width}
    />
  )
}

Spinner.propTypes = {
  size: PT.oneOfType([
    PT.oneOf(['small', 'normal', 'large', 'huge']),
    PT.number
  ]),
  style: PT.object
}

Spinner.defaultProps = {
  size: 'normal'
}

export default Spinner
