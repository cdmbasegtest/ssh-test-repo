import React, { PureComponent } from 'react'
import PT from 'prop-types'
import styled from 'styled-components'
import { width, space } from 'styled-system'
import uniqueId from 'lodash/uniqueId'
import noop from 'lodash/noop'

import moment from 'helpers/moment'

import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'

import { Flex } from 'rebass'

import {
  Caption,
  DownButton,
  UpButton,
  TimeInput,
  Period,
  Periods
} from './styles'
import { onlyUpdateForKeys } from 'recompose'

class TimeSelector extends PureComponent {
  static defaultProps = {
    time: '07:00',
    period: 'AM',
    am: true,
    pm: false,
    duration: 15,
    date: new Date(),
    onTimeChange: result => console.log(result)
  }

  constructor(props) {
    super(props)
    const { time, period, date, duration, am, pm } = props
    this.state = { time, period, date, duration, am: pm ? false : am, pm }
  }

  componentWillMount() {
    const id = uniqueId('prefix-')
    this.setState({ id: id })
  }

  onChange = ({ time, period, date }) => {
    this.props.onTimeChange({ time, period, date, name: this.props.name }) //Callback to make values available in the parent component
    this.setState({ time, period, date })
  }

  onSelect = event => {
    const { date } = this.state
    const selected = moment(event.target.value, 'hh:mm A')
    const period = selected.format('A')
    const time = selected.format('HH:mm')
    const isAm = period === 'AM'
    isAm
      ? this.setState({ pm: false, am: true })
      : this.setState({ pm: true, am: false })
    this.onChange({ time, period, date })
  }

  onUpButtonClick = () => {
    const { date } = this.state
    let time = moment(this.state.time, 'HH:mm')
      .add(this.state.duration, 'm')
      .format('HH:mm A')
    const period = time.substr(time.lastIndexOf(' '), time.length).trim()
    time = time.substr(0, time.lastIndexOf(' '))
    const isAm = period === 'AM'
    isAm
      ? this.setState({ pm: false, am: true })
      : this.setState({ pm: true, am: false })
    this.onChange({ time, period, date })
  }

  onDownButtonClick = () => {
    const { date } = this.state
    let time = moment(this.state.time, 'HH:mm')
      .subtract(this.state.duration, 'm')
      .format('HH:mm A')
    const period = time.substr(time.lastIndexOf(' '), time.length).trim()
    time = time.substr(0, time.lastIndexOf(' '))
    const isAm = period === 'AM'
    isAm
      ? this.setState({ pm: false, am: true })
      : this.setState({ pm: true, am: false })
    this.onChange({ time, period, date })
  }

  onAm = () => {
    const { date, period } = this.state
    if (period !== 'AM') {
      const time = moment(this.state.time, 'HH:mm').add(12, 'h').format('HH:mm')
      this.setState({ pm: false, am: true })
      this.onChange({ time, period: 'AM', date })
    }
  }
  onPm = () => {
    const { date, period } = this.state
    if (period !== 'PM') {
      const time = moment(this.state.time, 'HH:mm').add(12, 'h').format('HH:mm')
      this.setState({ pm: true, am: false })
      this.onChange({ time, period: 'PM', date })
    }
  }

  render() {
    const { className, caption, disabled } = this.props
    const { time, id, am, pm } = this.state
    return (
      <Flex align="center" className={className} justify="center">
        <Caption>
          {caption}
        </Caption>
        <Flex direction="column">
          <UpButton
            disabled={disabled}
            onClick={disabled ? noop : this.onUpButtonClick}
          >
            <FaAngleUp />
          </UpButton>
          <TimeInput
            disabled={disabled}
            list={id}
            name="time"
            value={time}
            onChange={this.onSelect}
          />
          {disabled
            ? null
            : <datalist id={id}>
                <option>01:00</option>
                <option>02:00</option>
                <option>03:00</option>
                <option>04:00</option>
                <option>05:00</option>
                <option>06:00</option>
                <option>07:00</option>
                <option>08:00</option>
                <option>09:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>13:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
                <option>22:00</option>
                <option>23:00</option>
                <option>24:00</option>
              </datalist>}
          <DownButton
            disabled={disabled}
            onClick={disabled ? noop : this.onDownButtonClick}
          >
            <FaAngleDown />
          </DownButton>
        </Flex>
        <Periods>
          <Period active={am} onClick={this.onAm}>
            am
          </Period>
          <Period active={pm} onClick={this.onPm}>
            pm
          </Period>
        </Periods>
      </Flex>
    )
  }
}

TimeSelector.propTypes = {
  caption: PT.string,
  date: PT.oneOfType([
    PT.instanceOf(Date),
    PT.instanceOf(moment),
    PT.string,
    PT.number
  ]),
  duration: PT.number,
  period: PT.oneOf(['AM', 'PM', 'am', 'pm']),
  time: PT.string,
  onTimeChange: PT.func.isRequired
}

export default onlyUpdateForKeys([
  'caption',
  'date',
  'duration',
  'period',
  'time',
  'disabled'
])(styled(TimeSelector)`
  ${width}
  ${space}
`)
