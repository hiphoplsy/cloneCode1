import { all, fork } from 'redux-saga/effects';

import userSaga from './user';

export default funtion* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ])
};
