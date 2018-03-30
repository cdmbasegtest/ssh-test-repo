import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DeleteItem, EditItem } from 'components/ui'

import { Avatar } from 'components/ui/Avatar'

import CommentsEditor from '../CommentsEditor'

import {
  Comment as CommentContainer,
  CommentText,
  AuthorName,
  PostedAt,
  ControlButtons
} from './styles'

class Comment extends Component {
  state = {
    isEditing: false
  }

  deleteComment = () => {
    const { comment, onDeleteComment } = this.props
    onDeleteComment(comment)
  }

  editComment = () => {
    this.setState({ isEditing: true })
  }

  submitEditing = comment => {
    this.props.onEditComment(comment)
    this.setState({ isEditing: false })
  }

  renderEditingMode = () => {
    const { comment } = this.props
    return (
      <CommentsEditor comment={comment} onEditComment={this.submitEditing} />
    )
  }

  renderViewMode = () => {
    const { comment } = this.props
    return (
      <CommentContainer>
        <ControlButtons>
          <DeleteItem onClick={this.deleteComment} />
          <EditItem onClick={this.editComment} />
        </ControlButtons>
        <Avatar size="62px" style={{ margin: '18px', marginLeft: '0' }} />
        <CommentText>
          <AuthorName>
            {comment.author.name}
          </AuthorName>
          <div>
            {comment.text}
          </div>
          <PostedAt>5 minutes ago</PostedAt>
        </CommentText>
      </CommentContainer>
    )
  }

  render() {
    return this.state.isEditing
      ? this.renderEditingMode()
      : this.renderViewMode()
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired
}

export default Comment
