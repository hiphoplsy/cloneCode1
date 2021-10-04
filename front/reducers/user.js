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
    signUpLoading: false,
    singUpDone: false,
    singUpError: null,
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: null,
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

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

const reducer = (state=initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case SIGNUP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpDone = false;
      draft.singUpError = null;
      break;
    case SIGNUP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      draft.me = dummyUser(action.data);
      break;
    case SIGNUP_FAILURE:
      draft.signUpLoading = false;
      draft.singUpError = action.error;
      break;
    case LOGIN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOGIN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me = dummyUser(action.data);
      break;
    case LOGIN_FAILURE:
      draft.loginDone = false;
      draft.loginError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      draft.nickname = action.data.nickname;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;
    default:
      break;
  }
}); 