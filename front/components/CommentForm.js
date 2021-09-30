import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentLoading } = useSelector((state) => state.post);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
    setCommentText('');
  }, [commentText]);

  return(
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0  }}>
        <Input.TextArea
          bordered
          row={4}
          maxLength={40}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button 
          style={{ position: 'absolute', right: 0, bottom: -40 }} 
          type="primary" 
          loading={addCommentLoading}
          htmlType="submit"
        >댓글삐약</Button>
      </Form.Item>
    </Form>
  )
};

CommentForm.propTypes = {
  post: PropTypes.array.isRequired,
}

export default CommentForm;
