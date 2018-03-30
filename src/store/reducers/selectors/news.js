import { createSelector } from 'reselect'

export const getState = state => state.news

export const getNews = createSelector(getState, news => news)
