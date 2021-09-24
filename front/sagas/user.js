import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
} from '../reducers/user';

function loginAPI(data) {
  return axios.post('/user/login', data);
};

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      data: err.response.data,
    });
  }
};

function* watchLogin() {
  return takeLatest(LOGIN_REQUEST, login);
};

function signUpAPI(data) {
  return axios.post('/user/signup', data);
};

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    })
  } catch(err) {
    yield put({
      type: SIGNUP_FAILURE,
      data: err.response.data,
    })
  }
};

function* watchSignUp() {
  return takeLatest(SIGNUP_REQUEST, signUp);
};

export default function* userSaga() {
  yield all([
    fork (watchLogin),
    fork (watchSignUp),
  ])
} 