import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PostEditor from './PostEditor'
import Post from './Post'

import { NewsPage, Header, Content } from './styles'

class News extends Component {
  deletePost = post => {
    this.props.onDeleteNews(post)
  }

  deleteComment = comment => {
    this.props.onDeleteComment(comment)
  }

  render() {
    const {
      newsData,
      onAddNews,
      onAddComment,
      onDeleteNews,
      comments,
      onShowComments,
      onHideComments,
      onDeleteComment,
      onEditNews,
      onEditComment
    } = this.props
    return (
      <NewsPage>
        <Header>News</Header>
        <Content>
          <PostEditor new onAddNews={onAddNews} />
          {newsData.map(post =>
            <Post
              comments={comments}
              key={post.id}
              post={post}
              onAddComment={onAddComment}
              onDeleteComment={onDeleteComment}
              onDeleteNews={onDeleteNews}
              onEditComment={onEditComment}
              onEditNews={onEditNews}
              onHideComments={onHideComments}
              onShowComments={onShowComments}
            />
          )}
        </Content>
      </NewsPage>
    )
  }
}

News.propTypes = {
  onAddComment: PropTypes.func,
  onAddNews: PropTypes.func,
  onDeleteComment: PropTypes.func,
  onDeleteNews: PropTypes.func,
  onEditComment: PropTypes.func,
  onEditNews: PropTypes.func,
  onHideComments: PropTypes.func,
  onShowComments: PropTypes.func
}
export default News
