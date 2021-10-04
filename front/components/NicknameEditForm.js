import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.id || '');

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    })
  }, []);

  return (
    <>
      <Form 
        style={{ marginBlock: '20px', border: '1px solid #d9d9d9', padding: '20px' }}
        onFinish={onSubmit}
      >
      <label htmlFor="nickname" />
      <Input 
        maxLength={20}
        name={nickname}
        value={nickname}
        onChange={onChangeNickname}
      />
      <Button type="primary" htmlType="submit">닉네임 변경</Button>
     </Form>
    </>
  )
};

export default NicknameEditForm;
