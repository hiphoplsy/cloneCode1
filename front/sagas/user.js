import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { 
  LOGIN_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOG_IN_FAILURE,
} from '../reducers/user';

function loginAPI(data) {
  return axios.post('/user/login', data);
}

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
}

function* watchLogin() {
  return takeLatest(LOGIN_REQUEST, login);
}

export default function* userSaga() {
  yield all([
    fork (watchLogin),
  ])
} 