import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import FaAngleLeft from 'react-icons/lib/fa/angle-left'
import { Avatar } from 'components/ui'

import { createSuit } from 'helpers/styles'
import './styles.css'

import MdClose from 'react-icons/lib/md/close'

import isEmpty from 'lodash/isEmpty'
import { Flex } from 'rebass'

const suit = createSuit('EmployeeList')

class EmployeeList extends Component {
  constructor(props) {
    super(props)

    const list = {}
    this.state = {
      list: list
    }

    this.onSelectEmployee = this.onSelectEmployee.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ list: nextProps.data.profiles })
  }

  getList(data) {
    return data.result.profiles.map(key => {
      return data.entities.profiles[key]
    })
  }

  renderList() {
    if (isEmpty(this.state.list))
      return (
        <Flex align="center" flex="1 0" justify="center">
          There are no employees yet
        </Flex>
      )
    const list = this.state.list
    return Object.values(list).map(item => {
      return (
        <div
          className={cx(suit('row'), suit('row-employee'))}
          key={item.id}
          onClick={() => {
            this.props.hideEmployeeList()
            this.onSelectEmployee(item.id)
          }}
        >
          <FaAngleLeft className={suit('row-employee-icon')} />
          <Avatar
            className={suit('row-employee-avatar')}
            src={item.attributes.avatar.thumb.url}
          />
          <div className={suit('row-employee-text')}>
            {item.attributes['first-name']} {item.attributes['last-name']}
          </div>
        </div>
      )
    })
  }

  onSelectEmployee = employeeId => {
    const data = {
      data: {
        type: 'chats',
        attributes: {
          name: 'My super chat'
        },
        relationships: {
          users: {
            data: [
              {
                id: this.props.userId,
                type: 'users'
              },
              {
                id: employeeId,
                type: 'users'
              }
            ]
          }
        }
      }
    }

    this.props.onChatCreate(data)
  }

  render() {
    return (
      <div className={suit()}>
        <div className={suit('head')}>
          <div className={suit('head-text')}>Employees</div>
          <MdClose
            className={suit('head-cross')}
            onClick={this.props.hideEmployeeList}
          />
        </div>
        <div className={suit('list')}>
          {this.renderList()}
        </div>
      </div>
    )
  }
}

EmployeeList.propTypes = {
  data: PropTypes.object,
  onChatCreate: PropTypes.func
}

export { EmployeeList }
