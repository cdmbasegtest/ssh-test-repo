import PropTypes from 'prop-types'
import { Panel } from 'rebass'

const Scrollable = Panel.extend`
  overflow-y: auto;
  border: none;
  flex-grow: 1;
  background-color: #ffffff;
  height: ${p => (p.h ? p.h : '100%')};
`

Scrollable.propTypes = {
  h: PropTypes.string
}

export default Scrollable
