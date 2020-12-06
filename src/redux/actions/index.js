import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {SIGNIN, SETDATA, SIGNOUT, SETUSER} from './types';

export const signin = ({email, password}) => async (dispatch) => {
  try {
    const responce = await auth().signInWithEmailAndPassword(email, password);
    dispatch({type: SIGNIN, payload: responce.user});
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err,
    });
  }
};

export const signup = ({email, password,name}) => async (dispatch) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({type: SIGNIN, payload: result.user});
        writeUserData(email, name, result.user.uid, result.user);
      });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: err,
    });
  }
};
const writeUserData = ({email, name, userId}) => {
  database()
    .ref('users/' + userId)
    .set({
      userName: name,
      email: email,
      userAvatarImage: null,
      postUser: null,
    });
};
export const signOut = () => async (dispatch) => {
  try {
    await auth().signOut();
    dispatch({type: SIGNOUT});
  } catch (e) {
    console.log(err);
  }
};
export const setUser = ({user}) => (dispatch) => {
  dispatch({ type: SETUSER, payload: user })
}

export const setDataUser = (data) => async (dispatch) => {
  dispatch({type: SETDATA, payload: data})
}