import PropTypes from 'prop-types'
import { Divider as RDivider } from 'rebass'
import { height } from 'helpers/styles'

const Divider = RDivider.extend`${height};`

Divider.propTypes = {
  h: PropTypes.string,
  height: PropTypes.string
}

export default Divider
