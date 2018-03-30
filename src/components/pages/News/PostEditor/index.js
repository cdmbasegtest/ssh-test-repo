import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dropzone from 'react-dropzone'
import MdAddPhoto from 'react-icons/lib/md/add-a-photo'

import MdSend from 'react-icons/lib/md/send'
import MdAnnounce from 'react-icons/lib/md/volume-up'

import isEmpty from 'lodash/isEmpty'
import moment from 'helpers/moment'

import { Flex } from 'rebass'

import {
  Editor,
  TextInput,
  AddPhoto,
  AddPhotoText,
  PostButton,
  PostButtonIcon,
  AnnounceButton,
  PicturesContainer,
  PushText
} from './styles'

import { Avatar } from 'components/ui/Avatar'
import Pictures from './Pictures'

class PostEditor extends Component {
  constructor(props) {
    super(props)
    this.state = isEmpty(props.post)
      ? {
          text: '',
          pictures: [],
          isEditing: false
        }
      : {
          text: props.post.text,
          pictures: props.post.pictures,
          isEditing: true
        }
  }

  onSubmit = () => {
    const { onEditNews, onAddNews, post } = this.props
    const { text, pictures, isEditing } = this.state
    if (!text && pictures.length < 1) {
      return
    }
    isEditing
      ? onEditNews({ ...post, text, pictures })
      : onAddNews({
          text,
          pictures,
          createdAt: moment.now(),
          author: {
            name: 'John Smith'
          }
        })
    this.setState({ text: '', pictures: [] })
  }

  handleInput = event => {
    this.setState({ text: event.target.value })
  }

  handleFileInput = files => {
    this.setState({
      pictures: [...this.state.pictures, ...files.map(file => file.preview)]
    })
  }

  deletePicture = picture => {
    this.setState({
      pictures: this.state.pictures.filter(_picture => _picture !== picture)
    })
  }

  render() {
    const { text, pictures } = this.state
    const announceButtonShown = this.props.new
    return (
      <div>
        <Editor>
          <Flex align="center" justify="center">
            <Avatar size="66px" style={{ margin: '18px' }} />
            <TextInput
              placeholder="Write here your news"
              value={text}
              onChange={this.handleInput}
            />
            <AddPhoto>
              <Dropzone style={{}} onDrop={this.handleFileInput}>
                <MdAddPhoto opacity="0.36" size="36" />
              </Dropzone>
              <AddPhotoText>Add photo</AddPhotoText>
            </AddPhoto>
          </Flex>
          <PicturesContainer>
            {pictures.map(picture =>
              <Pictures
                picture={picture}
                onPictureDelete={this.deletePicture}
              />
            )}
          </PicturesContainer>
          <Flex align="center" direction="column" w={1}>
            <PostButton onClick={this.onSubmit}>
              <PostButtonIcon>
                <MdSend size="22" />
              </PostButtonIcon>
              {this.state.isEditing ? 'Save post' : 'Create post'}
            </PostButton>
            {announceButtonShown &&
              <Flex align="center" w={1}>
                <PushText>Send as push notification</PushText>
                <AnnounceButton>
                  <PostButtonIcon>
                    <MdAnnounce size="22" />
                  </PostButtonIcon>
                  Create announcement
                </AnnounceButton>
              </Flex>}
          </Flex>
        </Editor>
      </div>
    )
  }
}

PostEditor.propTypes = {
  new: PropTypes.bool,
  onAddNews: PropTypes.func,
  onEditNews: PropTypes.func
}

export default PostEditor
