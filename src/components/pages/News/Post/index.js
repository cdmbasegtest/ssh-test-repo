import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DeleteItem, EditItem } from 'components/ui'

import { Flex } from 'rebass'

import moment from 'helpers/moment'

import PostEditor from '../PostEditor'
import CommentsEditor from './CommentsEditor'
import Comment from './Comment'

import {
  Content,
  ControlButtons,
  ProfileInfo,
  UserName,
  PostText,
  Picture,
  CreatedAt,
  ToggleComments,
  Border
} from './styles'

import { Avatar } from 'components/ui/Avatar'

const ToggleShowComments = ({ post, onShowComments, onHideComments }) => {
  const { commentsShown } = post
  const action = (commentsShown ? onHideComments : onShowComments).bind(
    null,
    post
  )

  const text = commentsShown ? 'Hide all comments' : 'Show all comments'
  return (
    <ToggleComments onClick={action}>
      {text}
    </ToggleComments>
  )
}

class Post extends Component {
  state = {
    isEditing: false
  }

  deletePost = () => {
    const { post, onDeleteNews } = this.props
    onDeleteNews(post)
  }

  editPost = () => {
    this.setState({ isEditing: true })
  }

  submitEditing = post => {
    this.props.onEditNews(post)
    this.setState({ isEditing: false })
  }

  renderEditingMode = () => {
    const { post } = this.props
    return <PostEditor post={post} onEditNews={this.submitEditing} />
  }

  renderViewMode = () => {
    const {
      post,
      onDeleteComment,
      onHideComments,
      onShowComments,
      comments,
      onAddComment,
      onEditComment
    } = this.props
    return (
      <Content>
        <PostText>
          <ControlButtons>
            <DeleteItem onClick={this.deletePost} />
            <EditItem onClick={this.editPost} />
          </ControlButtons>
          <ProfileInfo>
            <Avatar size="66px" style={{ margin: '18px' }} />
            <Flex direction="column">
              <UserName>
                {post.author.name}
              </UserName>
              <CreatedAt>
                {moment(post.createdAt).fromNow()}
              </CreatedAt>
            </Flex>
          </ProfileInfo>
          {post.text}
        </PostText>
        {post.pictures.map(pic => <Picture src={pic} />)}
        <Border />
        <Flex direction="column" w={542}>
          <ToggleShowComments
            post={post}
            onHideComments={onHideComments}
            onShowComments={onShowComments}
          />
          {post.commentsShown &&
            <Border>
              {comments
                .filter(comment => comment.postId === post.id)
                .map(comment =>
                  <Comment
                    comment={comment}
                    key={comment.id}
                    onDeleteComment={onDeleteComment}
                    onEditComment={onEditComment}
                  />
                )}
            </Border>}
          <CommentsEditor post={post} onAddComment={onAddComment} />
        </Flex>
      </Content>
    )
  }

  render() {
    return this.state.isEditing
      ? this.renderEditingMode()
      : this.renderViewMode()
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onDeleteNews: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  onEditNews: PropTypes.func.isRequired,
  onHideComments: PropTypes.func.isRequired,
  onShowComments: PropTypes.func.isRequired
}

export default Post
