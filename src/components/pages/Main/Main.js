import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'

import cx from 'classnames'

import {
  NotificationForm,
  NotificationList,
  ChatList,
  ModalChat,
  EmployeeList
} from 'components/blocks'

import { createSuit } from 'helpers/styles'

import * as routes from 'helpers/routes'

import News from 'components/pages/News'
import Schedule from 'components/pages/Schedule'
import Employee from 'components/pages/Employee'
import Jobs from 'components/pages/Jobs'
import Applicants from 'components/pages/Applicants'
import { Icon, Avatar } from 'components/ui'

import clone from 'lodash/clone'

import iconLogo from 'assets/images/icons/logo.svg'

import MdEventNote from 'react-icons/lib/md/event-note'
import MdGroup from 'react-icons/lib/md/group'
import MdAssignmentTurnedIn from 'react-icons/lib/md/assignment-turned-in'
import MdAssignmentInd from 'react-icons/lib/md/assignment-ind'
import MdPermIdentity from 'react-icons/lib/md/perm-identity'
import FaAngleRight from 'react-icons/lib/fa/angle-right'
import MdChat from 'react-icons/lib/md/chat'
import MdNotificationsNone from 'react-icons/lib/md/notifications-none'
import MdSettings from 'react-icons/lib/md/settings'

import Dropdown from './Dropdown'

import './styles.css'

const suit = createSuit('MainPage')

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isNotificationShown: false,
      isNotificationListShown: false,
      notificationData: {}
    }

    this.onShowNotification = this.onShowNotification.bind(this)
    this.onHideNotification = this.onHideNotification.bind(this)
    this.onShowNotificationList = this.onShowNotificationList.bind(this)
    this.onHideNotificationList = this.onHideNotificationList.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  onShowNotificationList() {
    this.setState({
      isNotificationListShown: true
    })
  }

  onHideNotificationList() {
    this.setState({
      isNotificationListShown: false,
      isNotificationShown: false
    })
  }

  onShowNotification(data) {
    this.setState({
      isNotificationShown: true,
      notificationData: data
    })
  }

  onHideNotification() {
    this.setState({
      isNotificationShown: false
    })
  }

  onConfirm(comment) {
    const newData = clone(this.state.notificationData)
    newData.state = 'processed'
    newData.comment = comment
    this.props.setNotification(newData)
    this.onHideNotification()
  }

  render() {
    const currentUser = this.props.userId
    const {
      getChat,
      getExistChats,
      getEmployees,
      onOpenChat,
      onCloseChat,
      getLastMessages,
      onSendMessage,
      getEmployeeList,
      showEmployeeList,
      getJWTHeader,
      onShowChatList,
      companyId
    } = this.props

    const { data } = this.props.getNotification

    if (!this.props.isAuthenticated) {
      return <Redirect to={routes.authPath()} />
    }

    if (!this.props.isOnboarded) {
      return <Redirect to={routes.onboardingPath()} />
    }

    let user = null
    if (getChat.chat)
      user = getChat.chat.users.find(item => item.id !== currentUser)

    return (
      <div className={suit()}>
        <div className={suit('tabs')}>
          <div className={suit('tab')}>
            <Icon glyph={iconLogo} h="49px" w="58px" />
          </div>
          <NavLink
            activeClassName={'is-active'}
            className={suit('tab')}
            to={routes.schedulePath()}
          >
            <div>
              <MdEventNote className={suit('tab-icon')} />
              <FaAngleRight
                className={cx(suit('tab-hover'), suit('tab-icon'))}
              />
            </div>
            <div>Schedule</div>
          </NavLink>
          <NavLink
            activeClassName={'is-active'}
            className={suit('tab')}
            to={routes.newsPath()}
          >
            <div>
              <MdGroup className={suit('tab-icon')} />
              <FaAngleRight
                className={cx(suit('tab-hover'), suit('tab-icon'))}
              />
            </div>
            <div>News</div>
          </NavLink>

          <NavLink
            activeClassName={'is-active'}
            className={suit('tab')}
            to={routes.jobsPath()}
          >
            <div>
              <MdAssignmentTurnedIn className={suit('tab-icon')} />
              <FaAngleRight
                className={cx(suit('tab-hover'), suit('tab-icon'))}
              />
            </div>
            <div>Opening</div>
          </NavLink>

          <NavLink
            activeClassName={'is-active'}
            className={suit('tab')}
            to={routes.employeesPath()}
          >
            <div>
              <MdAssignmentInd className={suit('tab-icon')} />
              <FaAngleRight
                className={cx(suit('tab-hover'), suit('tab-icon'))}
              />
            </div>
            <div>Employees</div>
          </NavLink>

          <NavLink
            activeClassName={'is-active'}
            className={suit('tab')}
            to={routes.applicantsPath()}
          >
            <div>
              <MdPermIdentity className={suit('tab-icon')} />
              <FaAngleRight
                className={cx(suit('tab-hover'), suit('tab-icon'))}
              />
            </div>
            <div>Applicants</div>
          </NavLink>
        </div>

        <div className={suit('content')}>
          <div className={suit('header')}>
            <div
              className={cx(
                suit('header-icon-background'),
                suit('header-block'),
                getChat.isShowList && suit('header-icon-active')
              )}
              onClick={onShowChatList}
            >
              <MdChat className={suit('header-icon-chat')} />
            </div>
            <div
              className={cx(
                suit('header-block'),
                this.state.isNotificationListShown && suit('header-icon-active')
              )}
              onClick={this.onShowNotificationList}
            >
              <MdNotificationsNone className={suit('header-icon-bell')} />
            </div>
            <div className={suit('header-block')}>
              <MdSettings className={suit('header-icon-settings')} />
            </div>
            <div className={suit('header-block')}>
              <div className={suit('username')}>James Arthur Thunder</div>
              <Avatar small />
              <Dropdown onLogOut={this.props.onLogOut} />
            </div>
          </div>

          <Route component={Schedule} path={routes.schedulePath()} />
          <Route component={News} path={routes.newsPath()} />
          <Route component={Employee} path={routes.employeesPath()} />
          <Route component={Jobs} path={routes.jobsPath()} />
          <Route component={Applicants} path={routes.applicantsPath()} />
        </div>
        {this.state.isNotificationShown &&
          <NotificationForm
            notification={this.state.notificationData}
            onAccept={this.onConfirm}
            onClose={this.onHideNotification}
            onConfirm={this.onConfirm}
            onRefuse={this.onConfirm}
          />}

        {this.state.isNotificationListShown &&
          <NotificationList
            list={data}
            onClose={this.onHideNotificationList}
            onSelect={this.onShowNotification}
          />}

        {getChat.isShowList &&
          <div className={suit('chat')}>
            <ChatList
              chats={getChat.chatList}
              companyId={companyId}
              currentChat={getChat.chat}
              currentUser={currentUser}
              getEmployeeList={getEmployeeList}
              getExistChats={getExistChats}
              isLoaded={getChat.isLoaded}
              isLoading={getChat.isLoading}
              onOpenChat={onOpenChat}
              onShowEmployeeList={showEmployeeList}
            />
            {getChat.isShowModalChat &&
              <ModalChat
                data={getChat.chat}
                getLastMessages={getLastMessages}
                messages={getChat.messages}
                token={getJWTHeader}
                update={getChat.isSelect}
                user={user}
                onCloseChat={onCloseChat}
                onSendMessage={onSendMessage}
              />}
            {getEmployees.isShowEmployeeList &&
              <EmployeeList
                className={suit('chat-employee-list')}
                data={this.props.getEmployees}
                hideEmployeeList={this.props.hideEmployeeList}
                userId={currentUser}
                onChatCreate={this.props.onChatCreate}
              />}
          </div>}
      </div>
    )
  }
}

Main.propTypes = {
  getNotification: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  isOnboarded: PropTypes.bool.isRequired,
  setNotification: PropTypes.func,
  userId: PropTypes.string,
  onLogOut: PropTypes.func.isRequired
}

export default Main
