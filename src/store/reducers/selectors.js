import { createReducer } from 'helpers/redux'

import { SELECT_APPLICANT, GET_APPLICANTS } from 'actions/applicant'

const APPLICANTS_DATA = [
  {
    id: '1',
    name: 'Anna',
    age: '12',
    language: 'english',
    email: 'some@gmail.com',
    phone: '+380961112233',
    address: '',
    workExperience: '',
    avatar: './img/avatar.jpg',
    type: 'new'
  },
  {
    id: '2',
    name: 'Julia',
    age: '12',
    language: 'english',
    email: 'some@gmail.com',
    phone: '+380961112233',
    address: '',
    workExperience: '',
    avatar: './img/avatar.jpg',
    type: 'new'
  },
  {
    id: '3',
    name: 'Ivan',
    age: '12',
    language: 'english',
    email: 'some@gmail.com',
    phone: '+380961112233',
    address: '',
    workExperience: '',
    avatar: './img/avatar.jpg',
    type: 'pending'
  },
  {
    id: '4',
    name: 'James,',
    age: '12',
    language: 'english',
    email: 'some@gmail.com',
    phone: '+380961112233',
    address: '',
    workExperience: '',
    avatar: './img/avatar.jpg',
    type: 'interview'
  },
  {
    id: '5',
    name: 'Jisi',
    age: '12',
    language: 'english',
    email: 'some@gmail.com',
    phone: '+380961112233',
    address: '',
    workExperience: '',
    avatar: './img/avatar.jpg',
    type: 'new'
  }
]

const initialState = {
  applicants: [],
  currentCV: null
}

const handlers = {
  [SELECT_APPLICANT]: (state, { payload }) => ({
    ...state,
    currentCV: payload
  }),
  [GET_APPLICANTS]: (state, { payload }) => ({
    ...state,
    applicants: APPLICANTS_DATA // payload TODO CHANGE
  })
}

export default createReducer(initialState, handlers)
