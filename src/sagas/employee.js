import { all, put, take, select, fork } from 'redux-saga/effects'
import map from 'lodash/map'
import get from 'lodash/get'

import {
  LOAD,
  LOAD_ALL,
  LOAD_DEPARTMENT,
  LOAD_ALL_DEPARTMENTS,
  loadEmployee,
  loadDepartment,
  loadJobs,
  employeeDataReady,
  EMPLOYEE_DATA_READY,
  INIT,
  loadDepartments,
  loadEmployees,
  initDone
} from 'actions/employee'
import { getEmployee } from 'store/reducers/selectors/employee'
import { loadViewerCompanies, LOAD_VIEWER_COMPANIES } from 'actions/viewer'
import { getUserCompanyId } from 'store/reducers/selectors/companies'
import { waitForTypes } from 'helpers/sagas'

export function* prepareSelected() {
  while (true) {
    yield take([LOAD.SUCCESS])
    const employee = yield select(getEmployee)
    const companyId = get(employee, 'company.id')
    if (companyId) {
      yield put(loadDepartment(companyId))
      const { payload } = yield take(LOAD_DEPARTMENT.SUCCESS)

      yield all(map(payload.data.departments, dep => put(loadJobs(dep.id))))

      yield put(employeeDataReady())
    } else {
      yield put(employeeDataReady())
    }
  }
}

export function* initialLoad() {
  while (true) {
    yield take([INIT])
    let userCompanyId = yield select(getUserCompanyId)
    if (!userCompanyId) {
      yield put(loadViewerCompanies())
      yield take(LOAD_VIEWER_COMPANIES.SUCCESS)
      userCompanyId = yield select(getUserCompanyId)
      yield put(loadEmployees(userCompanyId))
      yield put(loadDepartments(userCompanyId))
      yield waitForTypes([LOAD_ALL.SUCCESS, LOAD_ALL_DEPARTMENTS.SUCCESS])
      yield put(initDone())
    } else {
      yield put(loadEmployees(userCompanyId))
      yield put(loadDepartments(userCompanyId))
      yield waitForTypes([LOAD_ALL.SUCCESS, LOAD_ALL_DEPARTMENTS.SUCCESS])
      yield put(initDone())
    }
    const employee = yield select(getEmployee)
    yield put(loadEmployee(employee.id))
    yield take(EMPLOYEE_DATA_READY)
    yield put(initDone())
  }
}

export default function* rootEmployees() {
  yield all([fork(prepareSelected), fork(initialLoad)])
}
