import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { Form, Input, Checkbox } from 'antd';

import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { SIGNUP_REQUEST } from '../reducers/user';

const signup = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, []);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
      return;
    }
    if (!term) {
      setTermError(true);
      return;
    }
    dispatch({
      type: SIGNUP_REQUEST,
      data: { email, nickname, password },
    });
  }, [email, nickname, password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>NodeBird | 회원가입</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit} style={{ padding: 10 }}>
          <div>
            <label htmlFor="email">이메일</label>
            <br />
            <Input
              name="email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <br />
            <Input name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <br />
            <Input
              name="password"
              value={password}
              type="password"
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="password-check">비밀번호 확인</label>
            <br />
            <Input
              name="password-check"
              type="password"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
            {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
          </div>
          <div>
            <Checkbox name="term" checked={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
            {termError && <div style={{ color: 'red' }}>동의해야 가입이 완료됩니다.</div>}
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default signup;
