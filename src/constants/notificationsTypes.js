export const NOTIFICATION_TYPE = {
  tradeShift: 'tradeShift',
  findReplacement: 'findReplacement',
  requestTimeOff: 'requestTimeOff',
  cantMake: 'cantMake',
  roleUpdate: 'roleUpdate',
  interviewInvitationResponse: 'interviewInvitationResponse',
  offerAcception: 'offerAcception'
}

export const NOTIFCATION_TEXT = {
  [NOTIFICATION_TYPE.tradeShift]: ' is asking to Trade Shifts',
  [NOTIFICATION_TYPE.findReplacement]: ' is asking for a replacement',
  [NOTIFICATION_TYPE.requestTimeOff]: ' is asking for time off ',
  [NOTIFICATION_TYPE.cantMake]: " can't make it today",
  [NOTIFICATION_TYPE.roleUpdate]: "'s role was changed",
  [NOTIFICATION_TYPE.interviewInvitationResponse]:
    ' has responded to your interview invitation',
  [NOTIFICATION_TYPE.offerAcception]: ' has accepted an offer'
}
