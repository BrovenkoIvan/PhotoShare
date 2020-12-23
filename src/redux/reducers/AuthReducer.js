import {SETDATA, SETUSER, SIGNIN, SIGNOUT, ADDERROR, CLEAN_ERROR} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  dataUser: {},
  loading: true,
  errorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNIN:
      return {...state, user: action.payload};
    case SIGNOUT:
      return {...state, user: null};
    case ADDERROR: 
      return {...state, errorMessage: action.payload}
    case CLEAN_ERROR: 
      return {...state, errorMessage: ''}
    case SETDATA:
      return {...state, dataUser: action.payload, };
    case SETUSER:
      return {...state, user: action.payload,loading: false};
    default:
      return state;
  }
};
