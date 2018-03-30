import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { saveJob } from 'actions/jobs'

import { getJob } from 'store/reducers/selectors/job'

import { getDepartment } from 'store/reducers/selectors/department'

import Jobs from './Jobs'

const actions = {
  onSaveJob: saveJob
}

const selector = createStructuredSelector({
  getJob,
  getDepartment
})

export default connect(selector, actions)(Jobs)
