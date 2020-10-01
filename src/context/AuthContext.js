import createDataContext from './createDataContext';
import auth from '@react-native-firebase/auth';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {errorMessage: ''};
    case 'clearErrorMessage':
      return {...state, errorMessage: ''};
    case 'signout':
      return {errorMessage: ''};
    case 'adduser':
      return {...state, user: action.payload}
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clearErrorMessage'});
};

const signin = (dispatch) => async ({email, password}) => {
  try {
    const responce = await auth().signInWithEmailAndPassword(email, password);
    console.log('signin', responce);
    dispatch({type: 'signin', payload: responce});
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};
const signup = (dispatch) => async ({email, password}) => {
  try {
    const responce = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log('signup', responce);
    dispatch({type: 'signin', payload: responce});
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
};
const logout = (dispatch) => async () => {
  try {
    await auth().signOut();
  } catch (e) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with signout',
    });
  }
};
const setUser = dispatch => async ({user}) => {
    dispatch({type: 'adduser', payload: user})
}

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, clearErrorMessage, signup, logout, setUser},
  {errorMessage: '', user: null},
);
