import moment from 'helpers/moment'
import memoize from 'lodash/memoize'

export const formatDate = memoize(dateString => {
  return moment(dateString).format('dddd DD, gggg')
})

export const calculateAge = memoize(birthdate => {
  return moment().diff(birthdate, 'years')
})
