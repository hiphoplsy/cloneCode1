import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
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

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch(err) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function followAPI(data) {
  return axios.post(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    })
  } catch(err) {
    yield put({
      type: FOLLOW_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}

function unFollowAPI(data) {
  return axios.post(`/user/${data}/unfollow`)
}

function* unFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    })
  } catch(err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}

function logoutAPI() {
  return axios.delete('/user/logout');
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOGOUT_SUCCESS,
    })
  } catch(err) {
    yield put({
      type: LOGOUT_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}



export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchChangeNickname),
    fork(watchFollow),
    fork(watchUnfollow),
  ])
} 