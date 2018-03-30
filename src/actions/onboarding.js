import { createAsyncAction } from 'helpers/redux'
import { apiCall } from './api'
import { getFields, getRawViewer } from '../store/reducers/selectors/viewer'

export const COMPLETE_STEP = createAsyncAction('onboarding/COMPLETE_STEP')

export const completeStep = step => (dispatch, getState) => {
  const { 'onboarding-steps': stepsDone } = getFields(getState())

  dispatch(
    apiCall({
      alt: true,

      method: 'PATCH',
      endpoint: `/user`,
      types: COMPLETE_STEP,
      query: {
        data: {
          type: 'users',
          attributes: {
            'onboarding-steps': [...stepsDone, step.id],
            'onboarding-completed': false
          }
        }
      }
    })
  )
}

export const COMPLETE_ONBOARDING = createAsyncAction('onboarding/COMPLETE')
export const completeOnboarding = lastStep => (dispatch, getState) => {
  const { attributes } = getRawViewer(getState())
  const stepsDone = attributes['onboarding-steps']
  dispatch(
    apiCall({
      alt: true,

      method: 'PATCH',
      endpoint: `/user`,
      types: COMPLETE_ONBOARDING,
      query: {
        data: {
          type: 'users',
          attributes: {
            ...attributes,
            'onboarding-steps': [...stepsDone, lastStep.id],
            'onboarding-completed': true
          }
        }
      }
    })
  )
}
