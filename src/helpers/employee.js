import get from 'lodash/get'
import memoize from 'lodash/memoize'
import map from 'lodash/map'

export const buildFullname = memoize(employee => {
  const profile = get(employee, 'profile')
  return `${get(profile, 'first-name')} ${get(profile, 'last-name')}`
})

export const buildJobsSelect = memoize(jobs => {
  return map(jobs, job => {
    return { text: job.name, value: job.id }
  })
})
