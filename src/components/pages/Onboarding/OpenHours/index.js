import React, { PureComponent } from 'react'

import reduce from 'lodash/reduce'
import map from 'lodash/map'
import filter from 'lodash/filter'

import { TimeSelector, ButtonCircle as UiButtonCircle } from 'components/ui'

import {
  Container,
  Header,
  Title,
  Content,
  DayActive,
  DayDisactive,
  DayText,
  FlexStyle,
  HR,
  OpenedAttribute,
  ClosedAttribute,
  CheckBoxStyle,
  SubmitRow,
  Row
} from './styles'
import { Flex } from 'rebass'
import Checkbox from 'rc-checkbox'

const ButtonCircle = UiButtonCircle.extend`
  width: 286px;
  height: 54px;
  border-radius: 100px;
  background-color: #d9d9d9;
  font-family: Lato;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
`

class OpenHours extends PureComponent {
  state = {
    days: {
      0: { name: 'Monday', open: false, from: '07:00', to: '21:00' },
      1: { name: 'Tuesday', open: true, from: '07:00', to: '21:00' },
      2: { name: 'Wednesday', open: true, from: '07:00', to: '21:00' },
      3: { name: 'Thursday', open: true, from: '07:00', to: '21:00' },
      4: { name: 'Friday', open: true, from: '07:00', to: '21:00' },
      5: { name: 'Saturday', open: true, from: '07:00', to: '21:00' },
      6: { name: 'Sunday', open: true, from: '07:00', to: '21:00' }
    }
  }

  changeDay = (id, field, value) => state => {
    const days = state.days
    const day = days[id]
    const changedDay = { ...day, [field]: value }
    return { days: { ...days, [id]: changedDay } }
  }

  onCheckboxChange = ({ target: { name: dayIndex } }) => {
    const newOpen = !this.state.days[dayIndex].open
    this.setState(this.changeDay(dayIndex, 'open', newOpen))
  }

  onStartAtChange = ({ time, name: dayIndex }) => {
    this.setState(this.changeDay(dayIndex, 'from', time))
  }

  onFinishAtChange = ({ time, name: dayIndex }) => {
    this.setState(this.changeDay(dayIndex, 'to', time))
  }

  validate = () => {
    for (const day of Object.values(this.state.days)) {
      if (day.open && day.from >= day.to) {
        alert('Make sure start time is lower than end date')
        return false
      }
    }
    if (filter(this.state.days, { open: true }).length < 1) {
      alert('Make sure you have at least one day opened')
      return false
    } else return true
  }

  onHoursSubmit = () => {
    if (this.validate()) {
      const { days } = this.state
      const hours = reduce(
        filter(days, { open: true }),
        (result, value, key) => {
          return {
            ...result,
            [key]: { start_at: value.from, finish_at: value.to }
          }
        },
        {}
      )
      const attributes = {
        'opening-hours': hours
      }
      this.props.onHoursSubmit(attributes)
    }
  }

  render() {
    return (
      <Container>
        <Header align="center" justify="center">
          <Title>Hours of Operation</Title>
        </Header>

        <Content>
          {map(this.state.days, (value, key) => {
            return (
              <Row>
                <Flex
                  align="center"
                  justify="space-around"
                  key={key}
                  style={FlexStyle}
                >
                  {/*// TODO: Replace with component*/}
                  <div style={value.open ? DayActive : DayDisactive}>
                    <Checkbox
                      checked={value.open}
                      name={key}
                      style={CheckBoxStyle}
                      value={value.open}
                      onChange={this.onCheckboxChange}
                    />{' '}
                    <DayText>{value.name.toUpperCase()}</DayText>
                    {value.open
                      ? <OpenedAttribute>Opened</OpenedAttribute>
                      : <ClosedAttribute>Closed</ClosedAttribute>}
                  </div>
                  <TimeSelector
                    caption="FROM"
                    disabled={!value.open}
                    m={2}
                    name={key}
                    time={value.from}
                    onTimeChange={this.onStartAtChange}
                  />
                  <HR />
                  <TimeSelector
                    caption="TO"
                    disabled={!value.open}
                    m={2}
                    name={key}
                    pm={true}
                    time={value.to}
                    onTimeChange={this.onFinishAtChange}
                  />
                </Flex>
              </Row>
            )
          })}
        </Content>
        <SubmitRow>
          <ButtonCircle type="submit" onClick={this.onHoursSubmit}>
            NEXT STEP
          </ButtonCircle>
        </SubmitRow>
      </Container>
    )
  }
}

export default OpenHours
