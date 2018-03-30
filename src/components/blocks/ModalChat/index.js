import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import MdAttachFile from 'react-icons/lib/md/attach-file'
import MdAddAPhoto from 'react-icons/lib/md/add-a-photo'
import MdClose from 'react-icons/lib/md/close'

import { InputText } from 'components/blocks/InputText'
import { Avatar } from 'components/ui'

import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

import normalize from 'jsonapi-normalizer'
import Pusher from 'pusher-js'
import { pusher } from 'constants/config'

import { createSuit } from 'helpers/styles'
import './styles.css'

const suit = createSuit('ModalChat')
const emptyMessages = {
  entities: {
    messages: []
  },
  result: {
    messages: []
  }
}

class ModalChat extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      messages: emptyMessages,
      currChatId: -1
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.renderMessages = this.renderMessages.bind(this)
    this.renderRigthMessages = this.renderRigthMessages.bind(this)
    this.renderLeftMessages = this.renderLeftMessages.bind(this)
  }

  componentDidMount() {
    const { data } = this.props
    this.props.getLastMessages(data.id)
  }

  componentDidUpdate() {
    this.refs.messagesBox.scrollTop = this.refs.messagesBox.scrollHeight
  }

  componentWillReceiveProps(nextProps) {
    const { data, token, update } = nextProps
    if (nextProps.data.id !== this.state.currChatId) {
      this.setState({ currChatId: nextProps.data.id })
      this.pusher = new Pusher(pusher.token, {
        authEndpoint: `https://pivot-backend-api.herokuapp.com/api/v1/chats/${data.id}/auth`,
        encrypted: true,
        auth: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/vnd.api+json'
          }
        }
      })
      this.chatRoom = this.pusher.subscribe(`presence-chats.${data.id}`)
      this.chatRoom.bind(
        'messages',
        newmessageData => {
          const newmessageDataNormal = normalize(newmessageData)
          const newmessage =
            newmessageDataNormal.entities.messages[
              newmessageDataNormal.result.messages[0]
            ]
          const messagesObj = cloneDeep(this.state.messages)
          messagesObj.entities.messages[newmessage.id] = newmessage
          messagesObj.result.messages.unshift(String(newmessage.id))
          this.setState({ messages: messagesObj })
        },
        this
      )

      nextProps.getLastMessages(data.id)
    } else {
      if (update) nextProps.getLastMessages(data.id)
      else if (isEmpty(nextProps.messages.entities))
        this.setState({ messages: emptyMessages })
      else this.setState({ messages: nextProps.messages })
    }
  }

  sendMessage(text) {
    const { data } = this.props
    if (text !== '') {
      const query = {
        data: {
          type: 'chats',
          attributes: {
            content: text
          }
        }
      }
      this.props.onSendMessage(data.id, query)
    }
  }

  renderMessages(messages) {
    const { user } = this.props
    return cloneDeep(messages.result.messages).reverse().map(key => {
      const message = messages.entities.messages[key]
      if (String(message['user-id']) === user.id)
        return this.renderRigthMessages(message)
      else return this.renderLeftMessages(message)
    })
  }

  renderRigthMessages(message) {
    return (
      <div className={suit('message-right')} key={message.id}>
        <div>
          <Avatar
            className={suit('message-avatar')}
            src={this.props.data.userAvatar}
          />
        </div>
        <div className={suit('message-right-text')}>
          {message.content}
        </div>
      </div>
    )
  }

  renderLeftMessages(message) {
    return (
      <div className={suit('message-left')} key={message.id}>
        {message.content}
      </div>
    )
  }

  render() {
    const { messages } = this.state
    return (
      <div className={suit()}>
        <div className={suit('head')}>
          <span>
            {this.props.data.username}
          </span>
          <div className={suit('close_btn')} onClick={this.props.onCloseChat}>
            <MdClose />
          </div>
        </div>
        <div className={suit('message')} ref={'messagesBox'}>
          {!isEmpty(this.state.messages) &&
            !isEmpty(this.state.messages.entities) &&
            this.renderMessages(messages)}
        </div>
        <div className={suit('footer')}>
          <MdAttachFile className={suit('footer-files')} />
          <MdAddAPhoto className={suit('footer-photo')} />
          <InputText onSubmit={this.sendMessage} />
        </div>
      </div>
    )
  }
}

ModalChat.propTypes = {
  data: PropTypes.object,
  getLastMessages: PropTypes.func,
  messages: PropTypes.object,
  token: PropTypes.string,
  update: PropTypes.bool,
  user: PropTypes.object,
  onCloseChat: PropTypes.func,
  onSendMessage: PropTypes.func
}

export { ModalChat }
