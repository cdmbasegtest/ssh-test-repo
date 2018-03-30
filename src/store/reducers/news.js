import { createReducer } from 'helpers/redux'

import {
  ADD_NEWS,
  ADD_COMMENT,
  SHOW_COMMENTS,
  HIDE_COMMENTS,
  DELETE_NEWS,
  EDIT_NEWS,
  DELETE_COMMENT,
  EDIT_COMMENT
} from 'actions/news'

import moment from 'helpers/moment'
import map from 'lodash/map'
import filter from 'lodash/filter'

const newsData = [
  {
    id: '0',
    author: {
      id: '11',
      name: 'John Smith'
    },
    createdAt: moment.now(),
    text: `Many people feel that there is a limited 
       amount of abundance, wealth, or chances 
       to succeed in life. Furthermore, there is 
       a solid belief that if one person succeeds,
       another must fail.This might be true, in 
       some cases, such as in a small company or school,
       where opportunity is limited by management. However,
       the world is a big place, and there are opportunities created 
       from ideas that help people, and no one gets hurt in the process.`,
    pictures: ['http://i79.beon.ru/97/81/8197/3/1046803/apple.jpeg'],
    commentsShown: false
  },
  {
    id: '1',
    author: {
      id: '11',
      name: 'John Smith'
    },
    createdAt: moment.now(),
    text: 'Some more awesome news',
    pictures: [],
    commentsShown: false
  }
]

const comments = [
  {
    id: '0',
    author: {
      id: '20',
      name: 'Good Guy'
    },
    postId: '0',
    text: 'Nice comment'
  },
  {
    id: '1',
    author: {
      id: '20',
      name: 'Good Guy'
    },
    postId: '1',
    text: 'One more comment'
  }
]

const initialState = {
  newsData: newsData,
  comments: comments,
  commentsShown: false
}

const handlers = {
  [ADD_NEWS.SUCCESS]: (state, { payload }) => ({
    ...state,
    newsData: [{ ...payload, id: state.newsData.length }, ...state.newsData]
  }),
  [EDIT_NEWS.SUCCESS]: (state, { payload }) => ({
    ...state,
    newsData: map(
      state.newsData,
      post => (post.id === payload.id ? { ...post, ...payload } : post)
    )
  }),
  [DELETE_NEWS.SUCCESS]: (state, { payload }) => ({
    ...state,
    newsData: filter(state.newsData, post => post.id !== payload.id)
  }),
  [ADD_COMMENT.SUCCESS]: (state, { payload }) => ({
    ...state,
    comments: [{ ...payload, id: state.comments.length }, ...state.comments]
  }),
  [EDIT_COMMENT.SUCCESS]: (state, { payload }) => ({
    ...state,
    comments: map(
      state.comments,
      comment =>
        comment.id === payload.id ? { ...comment, ...payload } : comment
    )
  }),
  [DELETE_COMMENT.SUCCESS]: (state, { payload }) => ({
    ...state,
    comments: filter(state.comments, comment => comment.id !== payload.id)
  }),
  [SHOW_COMMENTS.SUCCESS]: (state, { payload }) => ({
    ...state,
    newsData: map(
      state.newsData,
      post =>
        post.id === payload.post.id ? { ...post, commentsShown: true } : post
    )
  }),
  [HIDE_COMMENTS.SUCCESS]: (state, { payload }) => ({
    ...state,
    newsData: map(
      state.newsData,
      post =>
        post.id === payload.post.id ? { ...post, commentsShown: false } : post
    )
  })
}

export default createReducer(initialState, handlers)
