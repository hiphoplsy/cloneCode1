import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';

import useInput from '../hooks/useInput';
import { LOGIN_REQUEST } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: LOGIN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="email">이메일</label>
        <br />
        <Input
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요"
          bordered
          required
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <br />
        <Input
          name="password"
          value={password}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          bordered
          required
          onChange={onChangePassword}
        />
      </div>
      <div>
        <Button type="primary" htmlType="submit">로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </div>
    </Form>
  );
};

export default LoginForm;
