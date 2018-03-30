import replace from 'lodash/replace'

export const relativePath = (...args) => replace(args.join('/'), /\/{2,}/g, '/')
