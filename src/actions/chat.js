import { createAsyncAction } from 'helpers/redux'

import { apiCall } from './api'

export const SEND_MSG = createAsyncAction('chat/SEND_MESSAGE')
export const sendMessage = (chatId, data) =>
  apiCall({
    endpoint: `/chats/${chatId}/relationships/messages`,
    method: 'POST',
    query: data,
    types: SEND_MSG
  })

export const CREATE_CHAT = createAsyncAction('chat/CREATE')
export const createChat = data =>
  apiCall({
    endpoint: '/chats',
    method: 'POST',
    query: data,
    types: CREATE_CHAT
  })

export const GET_EXIST_CHATS = createAsyncAction('chat/GET_EXIST')
export const getExistChats = () =>
  apiCall({
    endpoint: '/user/relationships/chats?include=users.profile',
    types: GET_EXIST_CHATS
  })

export const OPEN_CHAT = createAsyncAction('chat/OPEN')
export const openChat = data => ({
  type: OPEN_CHAT.SUCCESS,
  payload: data
})

export const GET_LAST_MESSAGES = createAsyncAction('chat/GET_LAST_MESSAGES')
export const getLastMessages = chatId =>
  apiCall({
    endpoint: `/chats/${chatId}/relationships/messages?page%5Blimit%5D=10`,
    types: GET_LAST_MESSAGES
  })

export const CLOSE_CHAT = createAsyncAction('chat/CLOSE')
export const closeChat = () => ({
  type: CLOSE_CHAT.SUCCESS
})

export const SHOW_CHAT_LIST = 'chat/SHOW'
export const showChatList = () => ({
  type: SHOW_CHAT_LIST
})
