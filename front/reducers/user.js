import produce from 'immer';

export const initialState = {
  user: {
    isLoggedIn: false,
    me: null,
    signData: {},
    loginData: {},
    loginLoading: false,
    loginDone: false,
    loginError: null,
  }
};

export const dummyUser = {
  id: 1,
  nickname: 'zerocho',
  Posts: [],
  Followings: [],
  Followers: [],
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const reducer = (state=initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOGIN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me = action.data;
      break;
    case LOGIN_FAILURE:
      draft.loginDone = false;
      draft.loginError = action.error;
      break;
    default:
      break;
  }
}); 