import React, { Component } from 'react'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import { Flex } from 'rebass'
import { PostButton, CommentInput } from './styles'

import { Avatar } from 'components/ui/Avatar'

class CommentsEditor extends Component {
  constructor(props) {
    super(props)
    this.state = isEmpty(props.comment)
      ? {
          text: '',
          isEditing: false
        }
      : {
          text: props.comment.text,
          isEditing: true
        }
  }

  handleInput = event => {
    this.setState({ text: event.target.value })
  }

  handleSubmit = () => {
    const { onAddComment, onEditComment, comment, post } = this.props
    const { text, isEditing } = this.state
    if (!text) {
      return
    }
    if (isEditing) {
      onEditComment({ ...comment, text })
    } else {
      onAddComment({
        text,
        postId: post.id,
        author: {
          name: 'Good Guy'
        }
      })
    }
    this.setState({ text: '' })
  }

  render() {
    return (
      <div>
        <Flex align="center" justify="center">
          <Avatar size="62px" style={{ margin: '18px', marginLeft: '-25px' }} />
          <CommentInput
            placeholder="Leave a comment"
            value={this.state.text}
            onChange={this.handleInput}
          />
        </Flex>
        <Flex align="center" justify="center">
          <PostButton onClick={this.handleSubmit}>
            {this.state.isEditing ? 'Save comment' : 'Post yor comment'}
          </PostButton>
        </Flex>
      </div>
    )
  }
}

CommentsEditor.propTypes = {
  comment: PropTypes.object,
  post: PropTypes.object,
  onAddComment: PropTypes.func,
  onEditComment: PropTypes.func
}

export default CommentsEditor
