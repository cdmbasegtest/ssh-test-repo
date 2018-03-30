import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import EditableItem from '../EditableItem'
import map from 'lodash/map'

import MdAdd from 'react-icons/lib/md/add'

import { createSuit } from 'helpers/styles'

import './styles.css'

const suit = createSuit('DepartmentsColumn')

class Departments extends Component {
  componentDidMount() {
    const { onLoadDepartments, companyId } = this.props
    onLoadDepartments(companyId)
  }

  onSelectItem = item => {
    const { onSelectDep, onHideJob } = this.props
    onSelectDep(item)
    onHideJob()
  }

  render() {
    const {
      depList,
      onAddDepartment,
      onShowModal,
      onSaveDep,
      onCreateDepartment,
      onCancelCreatingDepartment,
      creatingDepartment,
      currentDepartment
    } = this.props

    const itemList = map(depList, item => {
      const selected = currentDepartment && item.id === currentDepartment.id
      return (
        <EditableItem
          item={item}
          key={item.id}
          kind="department"
          selected={selected}
          onAddItem={onAddDepartment}
          onEditItem={onSaveDep}
          onSelectItem={this.onSelectItem}
          onShowModal={onShowModal}
        />
      )
    })

    return (
      <nav className={suit()}>
        <div className={suit('header')}>
          <button
            className={suit('new-department')}
            onClick={onCreateDepartment}
          >
            <MdAdd className={suit('icon')} size="18" />New department
          </button>
        </div>
        {creatingDepartment &&
          <EditableItem
            kind="department"
            new
            onAddItem={onAddDepartment}
            onCancelCreating={onCancelCreatingDepartment}
          />}
        <div className={suit('label')}>All departments</div>
        {itemList}
      </nav>
    )
  }
}

Departments.propTypes = {
  companyId: PropTypes.number,
  depList: PropTypes.array,
  onHideJob: PropTypes.func,
  onLoadDepartments: PropTypes.func,
  onSelectDep: PropTypes.func,
  onShowModal: PropTypes.func
}

export default withRouter(Departments)
