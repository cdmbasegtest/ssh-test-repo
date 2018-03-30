import get from 'lodash/get'
import mergeWith from 'lodash/mergeWith'
import omit from 'lodash/omit'
import isArray from 'lodash/isArray'

const mergeCustomizer = (objValue, srcValue) =>
  isArray(objValue) ? srcValue : undefined

const initialState = {
  users: {},
  companies: {},
  employees: {},
  profiles: {}
}

export default (state = initialState, action) => {
  const data = get(action, 'payload.data')
  const meta = get(action, 'meta', {})
  if (data && meta.isSuccess) {
    return mergeWith({}, state, omit(data, 'meta'), mergeCustomizer)
  }

  return state
}
