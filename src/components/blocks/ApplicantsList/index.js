import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tabs, TabLink } from 'react-tabs-redux'
import Sortable from 'react-sortablejs'

import isEmpty from 'lodash/isEmpty'
import assign from 'lodash/assign'
import forEach from 'lodash/forEach'
import toArray from 'lodash/toArray'
import sortBy from 'lodash/sortBy'

import FaAngleLeft from 'react-icons/lib/fa/angle-left'
import FaSearch from 'react-icons/lib/fa/search'

import { createSuit } from 'helpers/styles'
import cx from 'classnames'

import './styles.css'

const suit = createSuit('ApplicantsList')

class ApplicantsList extends Component {
  state = {
    currFilter: 'new',
    isFirstOpen: true,
    searchValue: '',
    list: {}
  }

  componentWillMount() {
    if (this.state.isFirstOpen && !isEmpty(this.props.list)) {
      const item = this.getApplicantsList(this.props.list)[0]
      this.props.onSelect(item)
      this.setState({ isFirstOpen: false })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.state.list) {
      this.setState({ list: nextProps.list })
    }
  }

  onChangeOrder = (order, sortable, evt) => {
    const { list } = this.state
    const orderList = {}

    forEach(list.entities.applicants, (value, key) => {
      const position = order.indexOf(key)
      if (position !== -1)
        return (orderList[key] = { ...value, position: position })
      return (orderList[key] = value)
    })

    this.setState({
      list: {
        ...list,
        entities: {
          ...list.entities,
          applicants: orderList
        }
      }
    })

    const query = {}
    query.data = toArray(orderList).map(item => {
      const { id, position } = item
      return {
        id,
        type: 'applicants',
        attributes: { position }
      }
    })

    this.props.sortApplicants(query)
  }

  onTabSelect = filter => {
    this.setState({ currFilter: filter, searchValue: '' })
  }

  onSearch(response) {
    const list = response.result.applicants
      .map(key => {
        const applicant = response.entities.applicants[key]
        if (applicant.state === this.state.currFilter) {
          const currentProfile =
            response.entities.profiles[applicant.profile.id]
          if (
            this.state.searchValue &&
            currentProfile['first-name']
              .toLowerCase()
              .search(this.state.searchValue.toLowerCase()) === -1 &&
            currentProfile['last-name']
              .toLowerCase()
              .search(this.state.searchValue.toLowerCase()) === -1
          )
            return null
          else {
            return assign({}, currentProfile, { state: applicant.state })
          }
        }
        return null
      })
      .filter(applicant => !isEmpty(applicant))
    return list
  }

  getApplicantsList(response) {
    const list = response.result.applicants
      .map(key => {
        const applicant = response.entities.applicants[key]
        const { state, id, position, profile } = applicant
        if (state === this.state.currFilter)
          return assign({}, response.entities.profiles[profile.id], {
            state,
            applicantId: id,
            position
          })
        return null
      })
      .filter(applicant => !isEmpty(applicant))
    return list
  }

  handleChange = event => {
    this.setState({ searchValue: event.target.value })
  }

  renderList() {
    if (isEmpty(this.state.list) || isEmpty(this.state.list.entities)) return

    let applicantsList = this.state.searchValue
      ? this.onSearch(this.state.list)
      : this.getApplicantsList(this.state.list)

    applicantsList = sortBy(applicantsList, 'position')
    return applicantsList.map((item, index) => {
      return (
        <li
          className={cx(
            suit('applicant_list_item'),
            this.props.currentApplicant &&
              this.props.currentApplicant.id === item.id &&
              suit('active')
          )}
          data-id={item.applicantId}
          key={item.id}
          onClick={() => this.props.onSelect(item)}
        >
          <FaAngleLeft className={suit('applicant_icon')} />
          <div className={suit('applicant_image')} />
          <div className={suit('applicant_name')}>
            {item['first-name'] + ' ' + item['last-name']}
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <div className={suit()}>
        <Tabs
          className={suit('tabs_wrapper')}
          handleSelect={this.onTabSelect}
          selectedTab={this.state.currFilter}
        >
          <div className={suit('title')}>Applicants</div>
          <div className={suit('tabs')}>
            <TabLink to="new"> New </TabLink>
            <TabLink to="pending"> Pending </TabLink>
            <TabLink to="interview"> Interview </TabLink>
          </div>
        </Tabs>
        <div className={suit('applicants_list')}>
          <Sortable
            options={{
              animation: 150
            }}
            ref={c => {
              if (c) {
                this.simpleList = c.sortable
              }
            }}
            tag="ul"
            onChange={this.onChangeOrder}
          >
            {this.renderList()}
          </Sortable>
        </div>
        <div className={suit('search-wrapper')}>
          <input
            placeholder="Search by name"
            type="search"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
          <button>
            <FaSearch className={suit('search-wrapper-icon')} />
          </button>
        </div>
      </div>
    )
  }
}

ApplicantsList.propTypes = {
  list: PropTypes.object,
  sortApplicants: PropTypes.func,
  onSelect: PropTypes.func
}

export { ApplicantsList }
