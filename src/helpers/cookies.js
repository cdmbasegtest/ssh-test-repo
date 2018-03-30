import cookies from 'js-cookie'

import config from 'constants/config'

const { prefix } = config.cookie

export const formatKey = key => `${prefix}.${key}`

export const get = key => cookies.get(key && formatKey(key))

export const set = (key, value, options = {}) =>
  cookies.set(formatKey(key), value, options)

export const remove = (key, options = {}) =>
  cookies.remove(formatKey(key), options)

export default { formatKey, get, set, remove }
