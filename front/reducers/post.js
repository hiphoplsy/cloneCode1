import produce from 'immer';

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '와와아',
    Images: [{
      src: 'https://pixabay.com/images/id-3024154/',
    }, {
      src: 'https://pixabay.com/images/id-488714/',
    }, {
      src: 'https://pixabay.com/images/id-1284253/',
    }],
  }],
  Comments: [{
    id: 1,
    User: {
      id: 2,
      nickname: '제로투',
    },
    content: '댓글입니다.',
  }],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const dummyPost = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '와와아',
    Images: [{
      src: 'https://pixabay.com/images/id-3024154/',
    }, {
      src: 'https://pixabay.com/images/id-488714/',
    }, {
      src: 'https://pixabay.com/images/id-1284253/',
    }],
  }],
  Comments: [{
    id: 1,
    User: {
      id: 2,
      nickname: '제로투',
    },
    content: '댓글입니다.',
  }],
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case ADD_POST_SUCCESS:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(dummyPost(action.data));
    default:
      break;
  }
})