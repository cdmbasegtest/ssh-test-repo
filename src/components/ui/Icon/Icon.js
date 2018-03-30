import React from 'react'
import PT from 'prop-types'
import styled from 'styled-components'
import { getThemeField, height } from 'helpers/styles'
import { width } from 'styled-system'

const Icon = ({ glyph, ...props }) =>
  <svg {...props}>
    <use xlinkHref={`#${glyph.id}`} />
  </svg>

export default styled(Icon)`
  fill: ${getThemeField('color')}
  stroke: ${getThemeField('color')}
  vertical-align: middle;
  line-height: 0;
  stroke-width: 0;
  ${height}
  ${width}
`

Icon.propTypes = {
  glyph: PT.object.isRequired,
  h: PT.oneOfType([PT.string, PT.number]),
  height: PT.oneOfType([PT.string, PT.number]),
  w: PT.oneOfType([PT.string, PT.number]),
  width: PT.oneOfType([PT.string, PT.number])
}
