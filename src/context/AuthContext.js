import createDataContext from './createDataContext';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return { errorMessage: '', user: action.payload};
    case 'signup':
      return { errorMessage: '', user: action.payload};
    case 'clearErrorMessage':
      return {...state, errorMessage: ''};
    case 'signout':
      return {errorMessage: '', user: null};
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clearErrorMessage'});
};

const signin = dispatch => async ({email, password}) => {
  try {
    const responce = await auth().signInWithEmailAndPassword(email, password);
    dispatch({type: 'signin', payload: responce.user});
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err,
    });
  }
};
const writeUserData = (email, name, userId) => {
  database()
    .ref('users/' + userId)
    .set({
      userName: name,
      email: email,
      userAvatarImage: null
    });
};
const signup = (dispatch) => async ({email, password, name}) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({type: 'signup', payload: result.user})
        writeUserData(email, name, result.user.uid, result.user )
      })
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: err,
    });
  }
};
const signOut = (dispatch) => async () => {
  try {
    await auth().signOut();
    dispatch({type: 'signout'});
  } catch (e) {
    console.log(err);
  }
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, clearErrorMessage, signup, signOut},
  {errorMessage: '', user: null},
);
