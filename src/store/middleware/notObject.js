import isObject from 'lodash/isObject'

export default () => next => action => {
  if (isObject(action)) return next(action)
}
