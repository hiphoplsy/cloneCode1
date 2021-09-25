import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import useInput from '../hooks/useInput';
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        text,
      },
    });
    setText('');
  }, []);

  return (
    <>
      <Form style={{ margin: '10px 0 20px' }} encType="multiple/form-data" onFinish={onSubmit}>
        <Input.TextArea 
          value={text}
          onChange={onChangeText}
          maxLength={280}
          placeholder="무슨 일이 일어나고 있나요?"
        />
        <div>
          <input type="file" multiple hidden ref={imageInput} />
          <Button onClick={onClickImageUpload}>이미지 올리기</Button>
          <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
        </div>
        <div>
          {imagePaths.map((v) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={v} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </>
  )
};

export default PostForm;
