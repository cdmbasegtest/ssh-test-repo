import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'material-ui/DatePicker'
import { createSuit } from 'helpers/styles'
import cx from 'classnames'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Moment from 'helpers/moment'

import MdClose from 'react-icons/lib/md/close'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import TiDelete from 'react-icons/lib/ti/delete'
import TiMail from 'react-icons/lib/ti/mail'
import MdEvent from 'react-icons/lib/md/event'

import './styles.css'

const suit = createSuit('InterviewForm')
injectTapEventPlugin()

class InterviewForm extends Component {
  constructor(props) {
    super(props)

    const defaultData = {
      date: new Date(),
      time: '07:00',
      period: 'AM',
      duration: 15,
      interviewType: 'inPerson'
    }

    const { date, time, period, duration, interviewType } =
      this.props.interviewData || defaultData

    this.state = {
      date,
      time,
      period,
      duration,
      interviewType
    }
  }

  getInterviewDate = () => {
    const { date, time, period } = this.state
    const interviewDate = Moment(
      Moment(date).format('ddd, MMM D YYYY') + ' ' + time + ' ' + period,
      'hh:mm A'
    )
    return interviewDate
  }

  onDateChange = newDate => {
    this.setState({ date: newDate })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onUpButtonClick = event => {
    const newTime = Moment(this.state.time, 'HH:mm')
      .add(15, 'm')
      .format('HH:mm')
    this.setState({ time: newTime })
  }

  onDownButtonClick = event => {
    const newTime = Moment(this.state.time, 'HH:mm')
      .subtract(15, 'm')
      .format('HH:mm')
    this.setState({ time: newTime })
  }

  onPeriodChange = event => {
    this.setState({ period: event.target.id })
  }

  onInterviewClick = () => {
    const data = {
      data: {
        id: '258',
        type: 'applicants',
        attributes: {
          state: 'interview',
          position: null,
          'created-at': '2017-07-16T20:53:26.702+00:00',
          'updated-at': '2017-07-16T20:53:26.702+00:00'
        },
        relationships: {
          profile: {
            data: null
          },
          user: {
            data: {
              id: '2050',
              type: 'users'
            }
          },
          company: {
            data: {
              id: '1141',
              type: 'companies'
            }
          }
        }
      }
    }

    let applicantId = 0

    for (const key in this.props.applicants.entities.applicants) {
      if (
        this.props.applicants.entities.applicants[key].profile.id ===
        this.props.applicant.id
      ) {
        applicantId = key
      }
    }

    this.props.setApplicantInterview(data, applicantId)
  }

  render() {
    const applicant = this.props.applicant
    const data = this.state
    const muiTheme = {
      fontFamily: 'Roboto, sans-serif',
      borderRadius: 2,
      palette: {
        primary1Color: '#78736e',
        primary2Color: '#78736e',
        primary3Color: '#78736e',
        secondaryTextColor: '#78736e',
        pickerHeaderColor: '#78736e'
      }
    }
    return (
      <div className={suit()}>
        <div className={cx(suit('row'), suit('top_line'))}>
          <div className={suit('title')}>Schedule an interview</div>
          <div className={suit('cancel')} onClick={this.props.onFormClose}>
            <MdClose className={suit('cancel_button')} />
          </div>
        </div>
        <div className={cx(suit('row'), suit('title'))}>
          <div className={suit('image')} />
          <h1>
            {[applicant['first-name'], applicant['last-name']].join(' ')}
          </h1>
        </div>
        <div className={cx(suit('row'), suit('date'))}>
          <div className={suit('caption')}>DATE</div>
          <MuiThemeProvider
            muiTheme={getMuiTheme(muiTheme)}
            onTouchTap={() => {}}
          >
            <DatePicker
              className={suit('date_picker')}
              defaultDate={new Date()}
              formatDate={date => {
                return Moment(date).format('ddd, MMM D YYYY')
              }}
              id={'datePicker'}
              onChange={(empty, newDate) => {
                this.onDateChange(newDate)
              }}
            />
          </MuiThemeProvider>
        </div>
        <div className={cx(suit('row'), suit('time'))}>
          <div className={suit('caption')}>TIME</div>
          <div className={suit('col')}>
            <button
              className={cx(suit('time_button'), suit('up_button'))}
              onClick={this.onUpButtonClick}
            >
              <FaAngleUp />
            </button>
            <input
              className={suit('time_input')}
              list="interviewTime"
              name="time"
              type="time"
              value={data.time}
              onChange={this.onChange}
            />
            <datalist id="interviewTime">
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
            </datalist>
            <button
              className={cx(suit('time_button'), suit('down_button'))}
              onClick={this.onDownButtonClick}
            >
              <FaAngleDown />
            </button>
          </div>
          <div className={[suit('periods'), suit('row')].join(' ')}>
            <div
              className={this.state.period === 'AM' && suit('active')}
              id={'AM'}
              name="period"
              onClick={this.onPeriodChange}
            >
              am
            </div>
            <div
              className={this.state.period === 'PM' && suit('active')}
              id={'PM'}
              name="period"
              onClick={this.onPeriodChange}
            >
              pm
            </div>
          </div>
        </div>
        <div className={cx(suit('row'), suit('duration'))}>
          <div className={suit('caption')}>INTERVIEW DURATION</div>
          <select
            className={suit('duration_input')}
            name="duration"
            value={data.duration}
            onChange={this.onChange}
          >
            <option value={15}>15 min</option>
            <option value={20}>20 min</option>
            <option value={25}>25 min</option>
            <option value={30}>30 min</option>
            <option value={35}>35 min</option>
            <option value={40}>40 min</option>
            <option value={45}>45 min</option>
            <option value={50}>50 min</option>
            <option value={55}>55 min</option>
            <option value={60}>60 min</option>
          </select>
        </div>
        <div className={cx(suit('row'), suit('interview_type'))}>
          <div className={cx(suit('caption'), suit('interview_title'))}>
            TYPE OF INTERVIEW
          </div>
          <select name="interviewType" onChange={this.onChange}>
            <option selected value="phone">
              phone
            </option>
            <option value="in person">in person</option>
            <option value="video call">video call</option>
          </select>
        </div>
        {applicant.state === 'interview'
          ? <div className={suit('button-block-wrapper')}>
              <div className={cx(suit('button_block'), suit('small'))}>
                <button className={cx(suit('button'), suit('hire_btn'))}>
                  {' '}<TiMail className={suit('icon')} />Send a job offer
                </button>
                <button
                  className={cx(suit('button'), suit('cancel_btn'))}
                  onClick={this.props.onCancel}
                >
                  {' '}<TiDelete className={suit('icon')} />Cancel interview
                </button>
                <button
                  className={cx(suit('button'), suit('reassign_btn'))}
                  onClick={this.onInterviewClick}
                >
                  {' '}<MdEvent className={suit('icon')} />Reschedule interview
                </button>
              </div>
            </div>
          : <div className={suit('button-block-wrapper')}>
              <div className={suit('button_block')}>
                <button
                  className={cx(suit('button'), suit('reassign_btn'))}
                  onClick={this.onInterviewClick}
                >
                  {' '}<MdEvent className={suit('icon')} />Schedule Interview
                </button>
              </div>
            </div>}
      </div>
    )
  }
}

InterviewForm.propTypes = {
  applicant: PropTypes.object,
  interviewData: PropTypes.object,
  setApplicantInterview: PropTypes.func,
  onCancel: PropTypes.func,
  onFormClose: PropTypes.func
  // onReshedule: PropTypes.func,
  // onShedule: PropTypes.func
}

export { InterviewForm }
