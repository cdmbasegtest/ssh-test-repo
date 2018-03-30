import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { createSuit } from 'helpers/styles'
import cx from 'classnames'
import MdThumbDown from 'react-icons/lib/md/thumb-down'
import MdThumbUp from 'react-icons/lib/md/thumb-up'
import MdClose from 'react-icons/lib/md/close'
import moment from 'helpers/moment'

import './styles.css'

const suit = createSuit('NotificationForm')

class NotificationForm extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      comment: ''
    }

    this.config = true
  }

  handleChange = event => {
    this.setState({ comment: event.target.value })
  }

  renderTimePeriod = subject => {
    return (
      <span>
        {moment(subject.timeFrom).format('h:mm a')} -{' '}
        {moment(subject.timeTo).format('h:mm a')} shift on{' '}
        {moment(subject.timeFrom).format('DD/MMM')}
      </span>
    )
  }

  renderNotificationText(notificationType) {
    const notification = this.props.notification
    switch (notificationType) {
      case 'tradeShift':
        return (
          <div className={suit('main')}>
            <div>
              {notification.sender.name} agreed to trade their
            </div>
            <div>
              {this.renderTimePeriod(notification.sender)}
            </div>
            <div>
              with {notification.accepter.name}'s
            </div>
            <div>
              {this.renderTimePeriod(notification.accepter)}
            </div>
          </div>
        )
      case 'findReplacement':
        return (
          <div className={suit('main')}>
            <div>
              {notification.accepter.name} agreed to cover {' '}
              {notification.sender.name}'s
            </div>
            <div>
              {this.renderTimePeriod(notification.sender)}}
            </div>
          </div>
        )
      case 'requestTimeOff':
        return (
          <div className={suit('main')}>
            <div>
              {notification.sender.name} is requesting 4 days off because of{' '}
              reason below:
            </div>
            <div>
              <span>
                {notification.sender.reason}
              </span>
            </div>
          </div>
        )
      case 'cantMake':
        return (
          <div className={suit('main')}>
            <div>
              {notification.sender.name}'s{' '}
              {this.renderTimePeriod(notification.sender)}
            </div>
            <div>has been covered by</div>
            <div>
              <span>
                {notification.accepter.name}
              </span>
            </div>
          </div>
        )
      case 'interviewInvitationResponse':
        return (
          <div className={suit('main')}>
            <div>
              {notification.sender.name} accepted/rejected the job interview.
            </div>
          </div>
        )
      default:
        return
    }
  }

  render() {
    const notification = this.props.notification
    return (
      <div className={suit('')}>
        <div className={suit('title')}>
          <div className={suit('image')} />
          <div className={suit('name')}>
            {notification.sender.name}
          </div>
        </div>
        {this.renderNotificationText(notification.type)}
        {(notification.type === 'requestTimeOff' &&
          notification.comment === undefined) ||
        (notification.comment === undefined && this.config)
          ? <div className={suit('comment')}>
              <textarea
                placeholder="Write your comments here"
                onChange={this.handleChange}
              />
            </div>
          : <div>
              {notification.comment}
            </div>}
        {notification.state === 'processed'
          ? <div />
          : notification.type === 'requestTimeOff' ||
            (this.config && notification.type !== 'cantMake')
            ? <div className={suit('buttons')}>
                <button
                  className={cx(suit('button'), suit('refuse_btn'))}
                  onClick={() => this.props.onRefuse(this.state.comment)}
                >
                  <MdThumbDown />Refuse
                </button>
                <button
                  className={cx(suit('button'), suit('accept_btn'))}
                  onClick={() => this.props.onAccept(this.state.comment)}
                >
                  <MdThumbUp />Accept
                </button>
              </div>
            : <div className={suit('buttons')}>
                <button
                  className={suit('button')}
                  onClick={() => this.props.onConfirm(this.state.comment)}
                >
                  OK
                </button>
              </div>}
        <div className={suit('right_line')}>
          <button onClick={() => this.props.onConfirm(this.state.comment)}>
            <MdClose />
          </button>
        </div>
      </div>
    )
  }
}

NotificationForm.propTypes = {
  data: PropTypes.object,
  onAccept: PropTypes.func,
  onConfirm: PropTypes.func,
  onRefuse: PropTypes.func
}

export { NotificationForm }
