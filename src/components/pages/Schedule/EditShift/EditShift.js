import React, { PureComponent } from 'react'
import styled from 'styled-components'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import { Absolute, Flex } from 'rebass'
import {
  TimeSelector,
  ButtonCircle,
  Accordion,
  CornerIcon
} from 'components/ui'
import { Panel } from 'rc-collapse'
import Checkbox from 'rc-checkbox'

import { Footer, Section, ContentHeader, Label } from './style'
import onClickOutside from 'react-onclickoutside'
import { buildFullname } from 'helpers/employee'
import { branch, renderNothing } from 'recompose'

import moment from 'helpers/moment'
import ColorsPalette from './ColorsPalette'

class EditShift extends PureComponent {
  state = {
    startAt: null,
    finishAt: null,
    color: 'red',
    dates: []
  }

  componentWillMount() {
    const datesMap = new Map()
    forEach(Array.from(this.props.week.by('day')), day => {
      const date = day.format('YYYY-MM-DD')
      const selected = date === this.props.date
      datesMap.set(date, selected)
    })
    this.setState({
      startAt: moment(`07:00 AM`, 'HH:mm A').clone(),
      finishAt: moment(`07:00 AM`, 'HH:mm A').clone(),
      color: 'red',
      dates: datesMap
    })
  }

  handleClickOutside = () => {
    this.props.onClickOutside()
  }

  onSubmit = () => {
    const { startAt, finishAt, color, dates } = this.state
    const { scheduleId, date, employee } = this.props
    const selectedDates = new Map(
      [...dates.entries()].filter(entry => entry[1])
    ) //filter out all non selected dates
    if (startAt.isBefore(finishAt) && !startAt.isSame(finishAt)) {
      this.props.onShiftAdd(
        [date, ...selectedDates.keys()],
        employee,
        scheduleId,
        startAt.format('HH:mm'),
        finishAt.format('HH:mm'),
        color
      )
      this.props.onClose()
    } else {
      alert('Please make sure start date is before end date and not equal')
    }
  }

  onStartAtChange = ({ time, period }) => {
    const result = moment(`${time} ${period}`, 'HH:mm A')
    this.setState({ startAt: result })
  }

  onFinishAtChange = ({ time, period }) => {
    const result = moment(`${time} ${period}`, 'HH:mm A')
    this.setState({ finishAt: result })
  }

  onCheckboxChange = event => {
    const key = event.target.name
    const selected = this.state.dates.get(key)
    this.setState(state => {
      return { dates: new Map([...state.dates, [key, !selected]]) }
    })
  }

  setColor = color => this.setState({ color })

  render() {
    const { onClose, className, employee, date, week } = this.props
    const { startAt, finishAt, color, dates } = this.state

    const Checkboxes = map(Array.from(week.by('day')), day => {
      const weekDay = day.format('ddd')
      const dateString = day.format('YYYY-MM-DD')
      const disabled = dateString === date
      return (
        <Label>
          <Checkbox
            checked={dates.get(dateString)}
            disabled={disabled}
            name={dateString}
            value={dates.get(dateString)}
            onChange={this.onCheckboxChange}
          />{' '}
          {weekDay}
        </Label>
      )
    })

    return (
      <Absolute className={className} w={554}>
        <CornerIcon onClick={onClose}>X</CornerIcon>
        <ContentHeader bg="#f0f0f0">
          <h1>Add shift</h1>
          <h2>
            {date}
          </h2>
        </ContentHeader>
        <Section>
          For: {buildFullname(employee)}
        </Section>
        <Section justify="space-around">
          <TimeSelector
            caption="From"
            date={startAt}
            m={2}
            onTimeChange={this.onStartAtChange}
          />
          <TimeSelector
            caption="To"
            date={finishAt}
            m={2}
            onTimeChange={this.onFinishAtChange}
          />
        </Section>
        <Section>Role</Section>
        <Section>
          <Accordion>
            <Panel header="Copy shift to multiple days this week">
              <Flex justify="space-around">
                {Checkboxes}
              </Flex>
            </Panel>
          </Accordion>
        </Section>
        <Section>
          <Accordion>
            <Panel header="Color">
              <ColorsPalette
                selectedColor={color}
                onColorSelected={this.setColor}
              />
            </Panel>
          </Accordion>
        </Section>
        <Footer>
          <ButtonCircle success w={472} onClick={this.onSubmit}>
            Add to Schedule
          </ButtonCircle>
        </Footer>
      </Absolute>
    )
  }
}

export default branch(props => !props.show, renderNothing)(styled(
  onClickOutside(EditShift)
)`
    top: 50%;
    left: 10%;
    background-color: #f0f0f0;
    z-index: 1;
    border-radius: 6px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.45);
`)
