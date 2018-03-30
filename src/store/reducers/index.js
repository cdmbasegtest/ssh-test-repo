import { combineReducers } from 'redux'

import app from './app'
import companies from './companies'
import data from './data'
import router from './router'
import viewer from './viewer'
import notification from './notification'
import job from './job'
import chat from './chat'
import department from './department'
import applicant from './applicant'
import employee from './employee'
import news from './news'
import schedule from './schedule'

export default combineReducers({
  app,
  companies,
  data,
  router,
  viewer,
  department,
  applicant,
  chat,
  employee,
  job,
  notification,
  news,
  schedule
})
