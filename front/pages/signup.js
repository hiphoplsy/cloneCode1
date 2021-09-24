import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from 'antd';

import useInput from '../hooks/useInput';
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
    setPasswordCheckError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, []);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback(() => {
    if (passwrod !== passwordCheck) {
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
    })
  }, [email, nickname, password, passwordCheck, term]);

  return (
    <div>
      <Form onFinish={onSubmit}>
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
    </div>
  )
};

export default signup;
