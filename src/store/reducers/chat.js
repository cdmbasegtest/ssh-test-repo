import { createReducer } from 'helpers/redux'

import {
  CREATE_CHAT,
  OPEN_CHAT,
  GET_EXIST_CHATS,
  GET_LAST_MESSAGES,
  CLOSE_CHAT,
  SHOW_CHAT_LIST
} from 'actions/chat'

const initialState = {
  chat: null,
  chatList: {},
  messages: null,
  isShowModalChat: false,
  isSelect: false,
  isShowList: false,
  isLoading: false,
  isLoaded: false
}

const handlers = {
  [CREATE_CHAT.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      chatList: {
        ...state.chatList,
        entities: {
          ...state.chatList.entities,
          chats: {
            ...state.chatList.entities.chats,
            [payload.result.chats[0]]:
              payload.entities.chats[payload.result.chats[0]]
          }
        },
        result: {
          ...state.result,
          chats: [payload.result.chats[0], ...state.chatList.result.chats]
        }
      },
      chat: payload.entities.chats[payload.result.chats[0]],
      isSelect: true,
      isShowModalChat: true
    }
  },
  [OPEN_CHAT.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      chat: payload,
      isSelect: true,
      isShowModalChat: true
    }
  },
  [GET_EXIST_CHATS.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [GET_EXIST_CHATS.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      chatList: payload,
      isLoaded: true,
      isLoading: false
    }
  },
  [GET_EXIST_CHATS.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: false
    }
  },
  [GET_LAST_MESSAGES.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      messages: payload,
      isSelect: false
    }
  },
  [CLOSE_CHAT.SUCCESS]: state => {
    return {
      ...state,
      chat: null,
      isSelect: false,
      isShowModalChat: false
    }
  },
  [SHOW_CHAT_LIST]: state => {
    return {
      ...state,
      isShowList: state.isShowList ? false : true
    }
  }
}

export default createReducer(initialState, handlers)
