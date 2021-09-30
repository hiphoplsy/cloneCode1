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
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
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

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

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
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS:
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.unshift(action.data);
      break;
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    default:
      break;
  }
})