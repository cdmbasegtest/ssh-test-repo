import { connect } from 'react-redux'
import News from './News'

import { getNews } from 'store/reducers/selectors/news'
import {
  addNews,
  deleteNews,
  addComment,
  deleteComment,
  showComments,
  hideComments,
  editNews,
  editComment
} from 'actions/news'

const actions = {
  onAddComment: addComment,
  onAddNews: addNews,
  onDeleteNews: deleteNews,
  onDeleteComment: deleteComment,
  onEditComment: editComment,
  onEditNews: editNews,
  onHideComments: hideComments,
  onShowComments: showComments
}

export default connect(getNews, actions)(News)
