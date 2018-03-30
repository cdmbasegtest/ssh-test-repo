import get from 'lodash/get'

export const hex2rgba = (hex, opacity) => {
  const hexValue = hex.replace('#', '')
  const r = parseInt(hexValue.substring(0, 2), 16)
  const g = parseInt(hexValue.substring(2, 4), 16)

  const b = parseInt(hexValue.substring(4, 6), 16)
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
}

export const createSuit = component => descendent =>
  component + (descendent ? `-${descendent}` : '')

export const getThemeField = key => props => `${get(props.theme, key)};`

export const height = p => `
  height: ${p.height || p.h}; 
`
