const APP_TITLE = "APP_TITLE";
const ALERT_MSG = "ALERT_MSG";
const ALERT_OPEN = "ALERT_OPEN";
const ALERT_TYPE = "ALERT_TYPE";
const OPERATION_RESULT = "OPERATION_RESULT";

const stateInitial = {
  title: "Panel",
  operationResult: 0,
  alertMsg: '',
  alertOpen: false,
  alertType: 'info'
};

export const appReducer = (state = stateInitial, action) => {
  console.log('action', action)
  switch (action.type) {
    case APP_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case ALERT_MSG:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case ALERT_OPEN:
      return {
        ...state,
        alertOpen: action.payload,
      };
    case ALERT_TYPE:
      return {
        ...state,
        alertType: action.payload,
      };
    case OPERATION_RESULT:
      return {
        ...state,
        operationResult: action.payload,
      }
    default:
      return state;
  }
};

export const setTitle = title => {
  return dispatch => {
    dispatch({
      type: APP_TITLE,
      payload: title
    });
  }
};

export const setOperationResult = result => {
  return dispatch => {
    dispatch({
      type: OPERATION_RESULT,
      payload: result
    });
  }
};

export const setAlertMsg = alertMsg => {
  return dispatch => {
    dispatch({
      type: ALERT_MSG,
      payload: alertMsg
    });
  }
}

export const setAlertOpen = alertOpen => {
  return dispatch => {
    dispatch({
      type: ALERT_OPEN,
      payload: alertOpen
    });
  }
}

export const setAlertType = alertType => {
  return dispatch => {
    dispatch({
      type: ALERT_TYPE,
      payload: alertType
    });
  }
}