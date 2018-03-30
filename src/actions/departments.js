import { createAsyncAction } from 'helpers/redux'
import { apiCall } from './api'
import { getUserCompanyId } from 'store/reducers/selectors/companies'

export const CREATE_DEPARTMENT = createAsyncAction('department/CREATE')
export const createDepartment = () => ({
  type: CREATE_DEPARTMENT.REQUEST
})
export const cancelDepartmentCreating = () => ({
  type: CREATE_DEPARTMENT.FAILURE
})

export const LOAD_DEPARTMENTS = createAsyncAction('department/LOAD')
export const loadDepartments = companyId =>
  apiCall({
    endpoint: `/companies/${companyId}/relationships/departments`,
    types: LOAD_DEPARTMENTS
  })

export const ADD_DEPARTMENT = createAsyncAction('department/ADD')
export const addDepartment = ({ name }) => (dispatch, getState) => {
  const companyId = getUserCompanyId(getState())
  dispatch(
    apiCall({
      endpoint: `/companies/${companyId}/relationships/departments`,
      method: 'POST',
      query: {
        data: {
          type: 'departments',
          attributes: {
            name: name
          }
        }
      },
      types: ADD_DEPARTMENT
    })
  )
}

export const SHOW_DEPARTMENT = createAsyncAction('department/SHOW')
export const showDepartment = department => ({
  type: SHOW_DEPARTMENT.SUCCESS,
  payload: department
})

export const DELETE_DEPARTMENT = createAsyncAction('department/DELETE')
export const deleteDepartment = ({ id }) =>
  apiCall({
    endpoint: `/departments/${id}`,
    method: 'DELETE',
    alt: true,
    types: DELETE_DEPARTMENT
  })

export const HIDE_DEPARTMENT = createAsyncAction('department/HIDE')
export const hideDepartment = () => ({
  type: HIDE_DEPARTMENT.SUCCESS
})

export const SAVE_DEPARTMENT = createAsyncAction('department/SAVE')
export const saveDepartment = department =>
  apiCall({
    endpoint: `/departments/${department.id}`,
    method: 'PATCH',
    query: {
      data: {
        type: 'departments',
        attributes: {
          ...department
        }
      }
    },
    types: SAVE_DEPARTMENT
  })
