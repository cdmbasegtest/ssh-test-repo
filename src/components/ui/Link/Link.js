import React from 'react'
import PT from 'prop-types'
import styled from 'styled-components'
import { Link as LinkRR } from 'react-router-dom'

import { protocol, emailURI, phoneURI } from 'constants/regexps'
import { getThemeField } from 'helpers/styles'

const StyledLink = styled(LinkRR)`
  outline: none;
  color: inherit;
  cursor: pointer;
  transition: color .2s ease;
  font-weight: bold; 
  color: ${getThemeField('color')}

  a:hover {
    text-decoration: none;
    color: ${getThemeField('hover')}
  }
  
  a:active {
    color: ${getThemeField('active')}
  }
`

const A = StyledLink.withComponent('a')

export const Link = props => {
  const refProps = { ...props }

  if (props.onClick) {
    refProps.onClick = props.onClick
  } else if (props.href) {
    if (
      !(
        protocol.test(props.href) ||
        emailURI.test(props.href) ||
        phoneURI.test(props.href)
      )
    ) {
      refProps.href = `http://${refProps.href}`
    }

    if (protocol.test(refProps.href)) {
      refProps.target = '_blank'
    }
  }

  return (
    <span>
      {props.to
        ? <StyledLink {...refProps} />
        : <A {...refProps} rel="noopener noreferrer" />}
    </span>
  )
}

Link.propTypes = {
  children: PT.node,
  className: PT.string,
  href: PT.string,
  to: PT.oneOfType([PT.string, PT.object]),
  onClick: PT.func
}
