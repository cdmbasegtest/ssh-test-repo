import Rebass from 'rebass'
import styled from 'styled-components'

export const ContentHeader = Rebass.Flex.extend`
  display: block;
  height: 74px;
  margin-bottom: 7px;
  text-align: center;
  & h1 {
    font-size: 22px;
    font-family: 'Mitr';
  }

  & h2 {
    font-size: 18px;
    font-family: 'Prompt';
  }
`
export const Section = styled(Rebass.Flex).attrs({
  justify: p => p.justify || 'center',
  align: p => p.align || 'center'
})`
  min-height: 48px;
  width: 100%;
  background-color: white;
  color: #6d6c6c;
  text-align: center;
  font-family: Prompt;
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
`

export const Footer = Rebass.Flex.extend`
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 85px;
  background-color: #f0f0f0;
  border-radius: 6px;
`
export const Label = styled.label`display: block;`
