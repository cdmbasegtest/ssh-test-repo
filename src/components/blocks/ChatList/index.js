import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import { Spinner, Avatar } from 'components/ui'
import isEmpty from 'lodash/isEmpty'
import take from 'lodash/take'
import moment from 'moment'

import MdCreate from 'react-icons/lib/md/create'
import FaAngleLeft from 'react-icons/lib/fa/angle-left'

import { createSuit } from 'helpers/styles'
import './styles.css'

import { Flex } from 'rebass'

const suit = createSuit('ChatList')

class ChatList extends PureComponent {
  componentWillMount() {
    this.props.getExistChats()
  }

  renderUserList = employees => {
    const { isLoading, isLoaded } = this.props
    if (isLoading) {
      return <Spinner />
    }
    if (isLoaded && isEmpty(employees.result)) {
      return (
        <Flex align="center" flex="1 0" justify="center">
          There are no chats yet
        </Flex>
      )
    }
    if (isLoaded && !isEmpty(employees)) {
      const { onOpenChat } = this.props
      const chats = take(employees.result.chats, 5)
      // const chats = employees.result.chats
      return chats.map(key => {
        const item = employees.entities.chats[key]
        const itemCreatedAt = new Date(item['created-at'])
        let user = item.users.find(item => item.id !== this.props.currentUser)
        if (user) user = employees.entities.profiles[user.id]
        const username = user['first-name'] + ' ' + user['last-name']
        const userAvatar = user.avatar.thumb.url
        return (
          <div
            className={cx(
              suit('row'),
              suit('row-chat'),
              this.props.currentChat &&
                this.props.currentChat.id === item.id &&
                suit('row-chat-active')
            )}
            key={item.id}
            onClick={() => {
              onOpenChat({ ...item, username, userAvatar })
            }}
          >
            <FaAngleLeft className={suit('row-chat-icon')} />
            <Avatar className={suit('row-chat-avatar')} src={userAvatar} />
            <div className={suit('row-chat-text')}>
              {username}
            </div>
            <div className={suit('time')}>
              {moment(itemCreatedAt).format('HH:mm')}
            </div>
          </div>
        )
      })
    }
  }

  onAddClick = () => {
    this.props.getEmployeeList(this.props.companyId)
    this.props.onShowEmployeeList()
  }

  render() {
    const { chats } = this.props
    return (
      <div className={suit()}>
        <div className={suit('head')}>
          <MdCreate className={suit('add_btn')} onClick={this.onAddClick} />
          <div className={suit('head-text')}>Chat</div>
        </div>
        {this.renderUserList(chats)}
      </div>
    )
  }
}

ChatList.propTypes = {
  chats: PropTypes.object,
  currentChat: PropTypes.object,
  currentUser: PropTypes.string,
  getEmployeeList: PropTypes.func,
  getExistChats: PropTypes.func,
  onOpenChat: PropTypes.func,
  onShowEmployeeList: PropTypes.func
}

export { ChatList }
