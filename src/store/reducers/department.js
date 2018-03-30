import { createReducer } from 'helpers/redux'

import {
  ADD_DEPARTMENT,
  SHOW_DEPARTMENT,
  DELETE_DEPARTMENT,
  HIDE_DEPARTMENT,
  SAVE_DEPARTMENT,
  CREATE_DEPARTMENT,
  LOAD_DEPARTMENTS
} from 'actions/departments'

const initialState = {
  isDepShown: false,
  depData: [],
  currentDepartment: null,
  creatingDepartment: false
}

const handlers = {
  [ADD_DEPARTMENT.SUCCESS]: (state, { payload }) => ({
    ...state,
    isDepShown: false,
    creatingDepartment: false,
    depData: [
      ...state.depData,
      ...Object.values(payload.entities.departments || {})
    ]
  }),
  [SHOW_DEPARTMENT.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isDepShown: true,
      currentDepartment: payload
    }
  },
  [DELETE_DEPARTMENT.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      depData: state.depData.filter(({ id }) => id !== payload.deletedId)
    }
  },
  [HIDE_DEPARTMENT.SUCCESS]: state => {
    return {
      ...state,
      isDepShown: false
    }
  },
  [SAVE_DEPARTMENT.SUCCESS]: (state, { payload }) => {
    const newDep = Object.values(payload.entities.departments)[0]
    return {
      ...state,
      creatingDepartment: false,
      depData: state.depData.map(
        item => (item.id === newDep.id ? newDep : item)
      )
    }
  },
  [CREATE_DEPARTMENT.REQUEST]: state => {
    return {
      ...state,
      creatingDepartment: true
    }
  },
  [CREATE_DEPARTMENT.FAILURE]: state => {
    return {
      ...state,
      creatingDepartment: false
    }
  },
  [LOAD_DEPARTMENTS.REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [LOAD_DEPARTMENTS.SUCCESS]: (state, { payload }) => ({
    ...state,
    depData: [],//Object.values(payload.entities.departments),
    isLoading: false
  })
}

export default createReducer(initialState, handlers)
