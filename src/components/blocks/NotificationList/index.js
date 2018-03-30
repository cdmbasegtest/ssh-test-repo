import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Tabs, TabLink } from 'react-tabs-redux'
import Moment from 'react-moment'

import { createSuit } from 'helpers/styles'
import { NOTIFCATION_TEXT } from 'constants/notificationsTypes'
import isEmpty from 'lodash/isEmpty'
import MdClose from 'react-icons/lib/md/close'
import FaAngleLeft from 'react-icons/lib/fa/angle-left'

import './styles.css'

const suit = createSuit('NotificationList')

class NotificationList extends PureComponent {
  state = {
    currFilter: 'new'
  }

  setFilter = newFilter => {
    this.setState({ currFilter: newFilter })
  }

  getNotificationsList(data) {
    const filteredList = data
      .map(notification => {
        if (this.state.currFilter === 'all') {
          return notification
        }
        if (notification.state === this.state.currFilter) {
          return notification
        }
        return null
      })
      .filter(notification => !isEmpty(notification))
    return filteredList
  }

  renderList() {
    if (isEmpty(this.props.list)) return
    const notificationList = this.getNotificationsList(this.props.list)
    return notificationList.map((item, list) => {
      return (
        <div key={item.id} onClick={() => this.props.onSelect(item)}>
          <FaAngleLeft className={suit('arrow')} />
          <div className={suit('image')} />
          <div className={suit('message')}>
            <div className={suit('caption')}>
              <span>
                {item.sender.name}
              </span>
              {NOTIFCATION_TEXT[item.type]}
            </div>
            <Moment className={suit('time')} fromNow>
              {item.date}
            </Moment>
          </div>
          <div className={suit('actions')}>
            <div>attrib1</div>
            <div>attrib2</div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className={suit('')}>
        <div className={suit('top_line')}>
          <div>
            <h1>Notifications</h1>
          </div>
          <Tabs className={suit('tabs')}>
            <TabLink to="new" onClick={() => this.setFilter('new')}>
              New
            </TabLink>
            <TabLink to="processed" onClick={() => this.setFilter('processed')}>
              Processed
            </TabLink>
            <TabLink to="all" onClick={() => this.setFilter('all')}>
              All
            </TabLink>
          </Tabs>
          <button onClick={() => this.props.onClose()}>
            <MdClose />
          </button>
        </div>
        <div className={suit('notification_list')}>
          {this.renderList()}
          {/*
          <div>
            <div className={suit('arrow')}>&lt;</div>
            <div className={suit('image')} />
            <div className={suit('message')}>
              <div className={suit('caption')}><span>Jake Sully </span>is asking for a tradeshift</div>
              <div className={suit('time')}>5 minutes ago</div>
            </div>
            <div className={suit('actions')}>
              <button>action</button>
            </div>
          </div>
          <div>
            <div className={suit('arrow')}>&lt;</div>
            <div className={suit('image')} />
            <div className={suit('message')}>
              <div className={suit('caption')}><span>Jake Sully </span>is asking for a tradeshift</div>
              <div className={suit('time')}>5 minutes ago</div>
            </div>
            <div className={suit('actions')}>
              <button>action</button>
            </div>
          </div>
          <div className={suit('active')}>
            <div className={suit('arrow')}>&lt;</div>
            <div className={suit('image')} />
            <div className={suit('message')}>
              <div className={suit('caption')}><span>Jake Sully </span>is asking for a tradeshift</div>
              <div className={suit('time')}>5 minutes ago</div>
            </div>
            <div className={suit('actions')}>
              <button>action</button>
            </div>
          </div>
          <div>
            <div className={suit('arrow')}>&lt;</div>
            <div className={suit('image')} />
            <div className={suit('message')}>
              <div className={suit('caption')}><span>Jake Sully </span>is asking for a tradeshift</div>
              <div className={suit('time')}>5 minutes ago</div>
            </div>
            <div className={suit('actions')}>
              <button>action</button>
            </div>
          </div>
          <div>
            <div className={suit('arrow')}>&lt;</div>
            <div className={suit('image')} />
            <div className={suit('message')}>
              <div className={suit('caption')}><span>Jake Sully </span>is asking for a tradeshift</div>
              <div className={suit('time')}>5 minutes ago</div>
            </div>
            <div className={suit('actions')}>
              <button>action</button>
            </div>
          </div>
          */}
        </div>
      </div>
    )
  }
}

NotificationList.propTypes = {
  list: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func
}

export { NotificationList }
