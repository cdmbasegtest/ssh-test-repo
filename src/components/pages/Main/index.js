import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getNotification } from 'store/reducers/selectors/notifications'
import {
  loadEmployees,
  showEmployeeList,
  hideEmployeeList
} from 'actions/employee'
import {
  getId,
  isAuthenticated,
  isOnboarded,
  getJWTHeader
} from 'store/reducers/selectors/viewer'

import {
  sendMessage,
  createChat,
  getExistChats,
  openChat,
  closeChat,
  getLastMessages,
  showChatList
} from 'actions/chat'

import { logOut } from 'actions/auth'
import { setNotification } from 'actions/notification'
import { getState } from 'store/reducers/selectors/chat'
import * as employeeState from 'store/reducers/selectors/employee'

import Main from './Main'
import { getUserCompanyId } from 'store/reducers/selectors/companies'

const selector = createStructuredSelector({
  isAuthenticated,
  isOnboarded,
  getNotification,
  getChat: getState,
  getEmployees: employeeState.getState,
  getJWTHeader,
  userId: getId,
  companyId: getUserCompanyId
})

const actions = {
  onLogOut: logOut,
  setNotification: setNotification,
  onSendMessage: sendMessage,
  onChatCreate: createChat,
  getExistChats,
  onOpenChat: openChat,
  onCloseChat: closeChat,
  getEmployeeList: loadEmployees,
  showEmployeeList: showEmployeeList,
  hideEmployeeList: hideEmployeeList,
  getLastMessages: getLastMessages,
  onShowChatList: showChatList
}

export default connect(selector, actions)(Main)
