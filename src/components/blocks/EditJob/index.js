import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'

import { createSuit } from 'helpers/styles'

import './styles.css'

const suit = createSuit('editJob')

const LANGUAGES = [
  {
    id: 25,
    name: 'English'
  },
  {
    id: 26,
    name: 'Russian'
  },
  {
    id: 27,
    name: 'France'
  }
]

const EDUCATION = [
  {
    id: 1,
    name: 'None'
  },
  {
    id: 2,
    name: 'Elementary'
  },
  {
    id: 3,
    name: 'High school'
  },
  {
    id: 4,
    name: 'Trade school'
  },
  {
    id: 5,
    name: 'College'
  },
  {
    id: 6,
    name: 'University'
  }
]

class EditJob extends Component {
  constructor(props) {
    super(props)

    const { name, jobDesc, salary, experience, yearsExp, id } = this.props.data
    this.state = {
      name,
      jobDesc,
      salary,
      experience,
      yearsExp,
      id
    }

    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleSalaryChange = this.handleSalaryChange.bind(this)
    this.handleExperienceChange = this.handleExperienceChange.bind(this)
    this.handleSalarySliderChange = this.handleSalarySliderChange.bind(this)
    this.renderList = this.renderList.bind(this)

    this.handleCarOptionChange = this.handleCarOptionChange.bind(this)
    this.onPlusExperience = this.onPlusExperience.bind(this)
    this.onMinusExperience = this.onMinusExperience.bind(this)
    this.onSend = this.onSend.bind(this)
    this.onChangeLanguage = this.onChangeLanguage.bind(this)
    this.onChangeEducation = this.onChangeEducation.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {
      name,
      jobDesc,
      salary,
      experience,
      yearsExp,
      language,
      education
    } = nextProps.data
    this.setState({
      name,
      jobDesc,
      salary,
      experience,
      yearsExp,
      language,
      education
    })
  }

  onSend(data) {
    this.props.onSaveJob(data)
  }

  handleOptionChange = value => {
    this.onSend({ ...this.props.data, experience: value })
  }

  handleCarOptionChange = value => {
    this.onSend({ ...this.props.data, car: value })
  }

  handleNameChange = event => {
    this.onSend({ ...this.props.data, name: event.target.value })
  }

  handleDescriptionChange = event => {
    this.onSend({ ...this.props.data, jobDesc: event.target.value })
  }

  handleSalaryChange = event => {
    this.onSend({ ...this.props.data, salary: event.target.value })
  }

  handleSalarySliderChange = event => {
    this.onSend({ ...this.props.data, salary: event.target.value })
  }

  handleExperienceChange = event => {
    this.onSend({ ...this.props.data, yearsExp: event.target.value })
  }

  onPlusExperience = () => {
    this.onSend({ ...this.props.data, yearsExp: ++this.state.yearsExp })
  }

  onMinusExperience = () => {
    this.onSend({ ...this.props.data, yearsExp: --this.state.yearsExp })
  }

  onChangeLanguage = event => {
    this.onSend({ ...this.props.data, language: event.target.value })
  }

  onChangeEducation = event => {
    this.onSend({ ...this.props.data, education: event.target.value })
  }

  renderList = list => {
    return list.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      )
    })
  }

  render() {
    const {
      name,
      jobDesc,
      salary,
      experience,
      yearsExp,
      language,
      education,
      car
    } = this.props.data

    return (
      <div className={suit()}>
        <label className={suit('name-of-the-job')}>Name of the job</label>
        <input
          className={cx(
            suit('input'),
            suit('input-border'),
            suit('name-text'),
            suit('text')
          )}
          type="text"
          value={name}
          onChange={this.handleNameChange}
        />

        <label className={suit('name-of-the-job')}>
          Description of the job
        </label>
        <textarea
          className={cx(
            suit('input'),
            suit('input-border'),
            suit('input-textarea'),
            suit('text')
          )}
          rows="4"
          value={jobDesc}
          onChange={this.handleDescriptionChange}
        />

        <div className={cx(suit('row'), suit('salary-container'))}>
          <div className={cx(suit('name-text'), suit('text'))}>Salary:</div>
          <input
            className={suit('input-salary')}
            type="number"
            value={salary}
            onChange={this.handleSalaryChange}
          />
          <div className={cx(suit('name-text'), suit('text'))}>$/H</div>
          <div className={suit('salary-slider-field')}>
            <div className={suit('salary-slider-field-labels')}>
              <span className={suit('salary-slider-field-labels-min-label')}>
                0.5
              </span>
              <span className={suit('salary-slider-field-labels-max-label')}>
                100
              </span>
            </div>
            <input
              className={suit('salary-slider')}
              max="100"
              min="0.5"
              step="0.01"
              type="range"
              value={salary}
              onChange={this.handleSalarySliderChange}
            />
          </div>
        </div>

        <div className={suit('dashed-border')} />

        <div className={suit('row')}>
          <div className={[suit('text'), suit('skills-block')].join(' ')}>
            Hire for a first job?
          </div>
          <ul className={suit('first-job')}>
            <li key="1" onClick={() => this.handleOptionChange(true)}>
              <input
                checked={experience && 'checked'}
                name=""
                type="radio"
                value
                onChange={() => {}}
              />
              <label>Yes</label>
              <div
                className={suit('check')}
                onClick={() => this.handleOptionChange(true)}
              />
            </li>
            <li key="2" onClick={() => this.handleOptionChange(false)}>
              <input
                checked={!experience && 'checked'}
                name=""
                type="radio"
                value={false}
                onChange={() => {}}
              />
              <label>No</label>
              <div className={suit('check')} />
            </li>
          </ul>
        </div>

        <div className={suit('row')}>
          <div className={[suit('text'), suit('skills-block')].join(' ')}>
            Number of years of experience
          </div>
          <div className={suit('spin')}>
            <span
              onClick={() => {
                this.onMinusExperience()
              }}
            >
              <FaAngleDown className={suit('arrows')} />
            </span>
            <input
              className={cx(suit('input-border'), suit('input-experience'))}
              type="number"
              value={yearsExp}
              onChange={this.handleExperienceChange}
            />
            <span
              onClick={() => {
                this.onPlusExperience()
              }}
            >
              <FaAngleUp className={suit('arrows')} />
            </span>
          </div>
        </div>

        <div className={suit('row')}>
          <div className={cx(suit('text'), suit('skills-block'))}>
            Languages spoken
          </div>
          <select
            className={cx(suit('select'), suit('select-list'))}
            value={language}
            onChange={this.onChangeLanguage}
          >
            {this.renderList(LANGUAGES)}
          </select>
        </div>

        <div className={suit('row')}>
          <div className={cx(suit('text'), suit('skills-block'))}>
            Education required
          </div>
          <select
            className={cx(suit('select'), suit('select-list'))}
            value={education}
            onChange={this.onChangeEducation}
          >
            {this.renderList(EDUCATION)}
          </select>
        </div>

        <div className={suit('row')}>
          <div className={[suit('text'), suit('skills-block')].join(' ')}>
            Do you have a car?
          </div>
          <ul className={suit('first-job')}>
            <li key="1" onClick={() => this.handleCarOptionChange(true)}>
              <input
                checked={car && 'checked'}
                name=""
                type="radio"
                value
                onChange={() => {}}
              />
              <label>Yes</label>
              <div
                className={suit('check')}
                onClick={() => this.handleOptionChange(true)}
              />
            </li>
            <li key="2" onClick={() => this.handleCarOptionChange(false)}>
              <input
                checked={!car && 'checked'}
                name=""
                type="radio"
                value={false}
                onChange={() => {}}
              />
              <label>No</label>
              <div className={suit('check')} />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

EditJob.propTypes = {
  data: PropTypes.object,
  onSaveJob: PropTypes.func
}

export { EditJob }
