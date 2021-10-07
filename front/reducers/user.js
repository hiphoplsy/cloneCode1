import produce from 'immer';

export const initialState = {
  user: {
    isLoggedIn: false,
    me: null,
    signData: {},
    loginData: {},
    loginLoading: false, // 로그인 시도중
    loginDone: false,
    loginError: null,
    logoutLoading: false, // 로그아웃 시도중
    logoutDone: false,
    logoutError: null, 
    signUpLoading: false, // 회원가입 시도중
    singUpDone: false,
    singUpError: null,
    changeNicknameLoading: false, // 닉네임변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null,
    unFollowLoading: false, // 언팔로우 시도중
    unFollowDone: false,
    unFollowError: null,
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

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

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
    case LOGOUT_REQUEST:
      draft.logoutLoading = true;
      draft.logoutDone = false;
      draft.logoutError = null;
      break;
    case LOGOUT_SUCCESS:
      draft.logoutLoading = false;
      draft.logoutDone = true;
      draft.me = null;
      break;
    case LOGOUT_FAILURE:
      draft.logoutLoading = false;
      draft.logoutError = action.error;
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
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followDone = false;
      draft.followError = null;
      break;
    case FOLLOW_SUCCESS: 
      draft.followLoading = false;
      draft.followDone = true;
      draft.me.Followings.push({ id: action.data });
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.unFollowLoading = true;
      draft.unFollowDone = false;
      draft.unFollowError = null;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unFollowLoading = false;
      draft.unFollowDone = true;
      draft.me.Followings.filter((v) => v.id !== action.data);
      break;
    case UNFOLLOW_FAILURE:
      draft.unFollowLoading = false;
      draft.unFollowError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data });
      break;
    default:
      break;
  }
}); 