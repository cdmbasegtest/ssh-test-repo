import { createAsyncAction } from 'helpers/redux'

export const ADD_NEWS = createAsyncAction('news/ADD')
export const addNews = post => ({
  type: ADD_NEWS.SUCCESS,
  payload: post
})

export const EDIT_NEWS = createAsyncAction('news/EDIT')
export const editNews = post => ({
  type: EDIT_NEWS.SUCCESS,
  payload: post
})

export const DELETE_NEWS = createAsyncAction('news/DELETE')
export const deleteNews = post => ({
  type: DELETE_NEWS.SUCCESS,
  payload: post
})

export const ADD_COMMENT = createAsyncAction('news/ADD_COMMENT')
export const addComment = comment => ({
  type: ADD_COMMENT.SUCCESS,
  payload: comment
})

export const EDIT_COMMENT = createAsyncAction('news/EDIT_COMMENT')
export const editComment = comment => ({
  type: EDIT_COMMENT.SUCCESS,
  payload: comment
})

export const DELETE_COMMENT = createAsyncAction('news/DELETE_COMMENT')
export const deleteComment = comment => ({
  type: DELETE_COMMENT.SUCCESS,
  payload: comment
})

export const SHOW_COMMENTS = createAsyncAction('news/SHOW_COMMENTS')
export const showComments = post => ({
  type: SHOW_COMMENTS.SUCCESS,
  payload: { post }
})

export const HIDE_COMMENTS = createAsyncAction('news/HIDE_COMMENTS')
export const hideComments = post => ({
  type: HIDE_COMMENTS.SUCCESS,
  payload: { post }
})
