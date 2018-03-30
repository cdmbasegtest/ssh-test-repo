import { createReducer } from 'helpers/redux'

import { NOTIFICATION_TYPE } from 'constants/notificationsTypes'

import { ADD_NOTIFICATION, SET_NOTIFICATION } from 'actions/notification'

const data = [
  {
    date: new Date('2017-07-15'),
    sender: {
      name: 'Jake Sully',
      timeFrom: new Date('Mon Jul 31 2017 11:00:00 GMT+0300 (EEST)'),
      timeTo: new Date('Mon Jul 31 2017 16:00:00 GMT+0300 (EEST)')
    },
    accepter: {
      name: 'Pamela Anderson',
      timeFrom: new Date('Wed Aug 2 2017 11:00:00 GMT+0300 (EEST)'),
      timeTo: new Date('Wed Aug 2 2017 16:00:00 GMT+0300 (EEST)')
    },
    id: 0,
    type: NOTIFICATION_TYPE.tradeShift,
    state: 'new',
    data: {
      text: 'I need a trade shift!'
    }
  },
  {
    date: new Date('Wed Jul 19 2017 17:25:23 GMT+0300 (EEST)'),
    sender: {
      name: 'Jake Sully',
      timeFrom: new Date('Mon Jul 31 2017 11:00:00 GMT+0300 (EEST)'),
      timeTo: new Date('Mon Jul 31 2017 16:00:00 GMT+0300 (EEST)')
    },
    accepter: {
      name: 'Pamela Anderson'
    },
    id: 1,
    type: NOTIFICATION_TYPE.findReplacement,
    state: 'processed',
    comment: 'test',
    data: {
      text: 'I need a replacement'
    }
  },
  {
    date: new Date(),
    sender: {
      name: 'Jake Sully',
      timeFrom: new Date('Mon Jul 31 2017 11:00:00 GMT+0300 (EEST)'),
      timeTo: new Date('Mon Jul 31 2017 16:00:00 GMT+0300 (EEST)'),
      reason: "I'm sick"
    },
    id: 2,
    type: NOTIFICATION_TYPE.requestTimeOff,
    state: 'new',
    data: {
      text: 'I need time off'
    }
  },
  {
    date: new Date('2017-07-22'),
    sender: {
      name: 'Jake Sully',
      timeFrom: new Date('Mon Jul 31 2017 11:00:00 GMT+0300 (EEST)'),
      timeTo: new Date('Mon Jul 31 2017 16:00:00 GMT+0300 (EEST)')
    },
    accepter: {
      name: 'Pamela Anderson'
    },
    id: 3,
    type: NOTIFICATION_TYPE.cantMake,
    state: 'new',
    data: {
      text: "I can't make it today"
    }
  },
  {
    date: new Date('2017-07-23'),
    sender: {
      name: 'Jake Sully'
    },
    id: 4,
    type: NOTIFICATION_TYPE.roleUpdate,
    state: 'new',
    data: {
      text: 'I have changed your role'
    }
  },
  {
    date: new Date('2017-07-24'),
    sender: {
      name: 'Jake Sully'
    },
    id: 5,
    type: NOTIFICATION_TYPE.interviewInvitationResponse,
    state: 'new',
    data: {
      text: 'Response to interview invintation'
    }
  },
  {
    date: new Date('Wed Jul 21 2017 14:45:23 GMT+0300 (EEST)'),
    sender: {
      name: 'Jake Sully'
    },
    id: 6,
    type: NOTIFICATION_TYPE.offerAcception,
    state: 'new',
    data: {
      text: 'Offer acception from employee'
    }
  }
]

const initialState = {
  data: data
}

const handlers = {
  [ADD_NOTIFICATION.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      data: [...state.data, payload]
    }
  },
  [SET_NOTIFICATION.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      data: state.data.map(item => (item.id === payload.id ? payload : item))
    }
  }
}

export default createReducer(initialState, handlers)
