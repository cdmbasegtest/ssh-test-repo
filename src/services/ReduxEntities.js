import build from 'redux-object'

const denormalize = (entities, type, id) =>
  build(entities, type, id, { eager: true })

export default {
  denormalize
}
