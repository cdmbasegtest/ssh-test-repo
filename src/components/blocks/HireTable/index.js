import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import TiDeleteOutline from 'react-icons/lib/ti/delete-outline'
import MdFileUpload from 'react-icons/lib/md/file-upload'

import cloneDeep from 'lodash/cloneDeep'
import range from 'lodash/range'

import { createSuit } from 'helpers/styles'

import './styles.css'

const suit = createSuit('HireTable')

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const title = ['Day', 'Evening', 'Night']

const rowArrayEmpty = range(7).map(function() {
  return range(3).map(function() {
    return 0
  })
})

class HireTable extends Component {
  constructor(props) {
    super(props)

    const hiringStatus = props.hiringStatus
    if (hiringStatus === 'publish') {
      this.state = {
        table: props.hiringArr,
        leftTitle: days,
        topTitle: title
      }
    } else {
      const table =
        hiringStatus === 'close'
          ? Array(7).fill(Array(3).fill(null))
          : rowArrayEmpty
      const leftTitle = hiringStatus === 'close' ? Array(7).fill(null) : days
      const topTitle = hiringStatus === 'close' ? Array(3).fill(null) : title

      this.state = {
        table,
        leftTitle,
        topTitle
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const hiringStatus = nextProps.hiringStatus
    if (hiringStatus === 'publish') {
      return this.setState({
        table: nextProps.hiringArr,
        leftTitle: days,
        topTitle: title
      })
    }

    const table =
      hiringStatus === 'close'
        ? Array(7).fill(Array(3).fill(null))
        : rowArrayEmpty
    const leftTitle = hiringStatus === 'close' ? Array(7).fill(null) : days
    const topTitle = hiringStatus === 'close' ? Array(3).fill(null) : title

    this.setState({
      table,
      leftTitle,
      topTitle
    })
  }

  onSelectCell(rowIndex, colIndex) {
    if (this.props.hiringStatus !== 'pending') return

    const table = cloneDeep(this.state.table)
    const oldValue = table[rowIndex][colIndex]

    if (oldValue === 1) {
      table[rowIndex][colIndex] = 0
    } else {
      table[rowIndex][colIndex] = 1
    }

    this.setState({ table: table })
  }

  renderTopTitle() {
    return this.state.topTitle.map((name, index) => {
      if (!name)
        return (
          <div
            className={cx(suit('empty-block'), suit('empty-block-top'))}
            key={index}
          />
        )
      return (
        <div key={index}>
          {name}
        </div>
      )
    })
  }

  renderLeftTitle() {
    return this.state.leftTitle.map((name, index) => {
      if (!name) return <div className={suit('empty-block')} key={index} />
      return (
        <div className={suit('title-left-cell')} key={index}>
          {name}
        </div>
      )
    })
  }

  renderCell(row, rowIndex) {
    return row.map((cell, colIndex) => {
      if (cell !== null) {
        const className = cell
          ? 'HireTable-table-cell-active HireTable-table-cell'
          : 'HireTable-table-cell'
        return (
          <div
            className={className}
            key={colIndex}
            onClick={() => this.onSelectCell(rowIndex, colIndex)}
          />
        )
      }

      return <div className={suit('table-cell')} key={colIndex} />
    })
  }

  renderTable() {
    return this.state.table.map((row, index) => {
      return (
        <div className={suit('table-row')} key={index}>
          {this.renderCell(row, index)}
        </div>
      )
    })
  }

  render() {
    const { hiringStatus, onChangeHiringStatus } = this.props
    return (
      <div className={suit()}>
        <div className={suit('title')}>
          {hiringStatus === 'pending'
            ? <div>Availabilites needed</div>
            : <div
                className={cx(suit('empty-block'), suit('empty-block-top-big'))}
              />}
        </div>
        <div className={suit('title-top')}>
          <div />
          {this.renderTopTitle()}
        </div>
        <div className={suit('table-container')}>
          <div className={suit('title-left')}>
            {this.renderLeftTitle()}
          </div>
          <div className={suit('table')}>
            {this.renderTable()}
          </div>
        </div>
        <div>
          {hiringStatus !== 'close'
            ? hiringStatus === 'pending'
              ? <div
                  className={suit('post-btn')}
                  onClick={() => onChangeHiringStatus(this.state.table)}
                >
                  <MdFileUpload className={suit('post-icon')} />
                  <span>Post Opening</span>
                </div>
              : <div className={suit('stop-btn')}>
                  <TiDeleteOutline className={suit('stop-icon')} />
                  <span>Stop hiring</span>
                </div>
            : <div
                className={cx(suit('empty-block'), suit('empty-block-bottom'))}
              />}
        </div>
      </div>
    )
  }
}

HireTable.propTypes = {
  hiringArr: PropTypes.array,
  hiringStatus: PropTypes.oneOf(['close', 'pending', 'publish']),
  onChangeHiringStatus: PropTypes.func
}

export { HireTable }
