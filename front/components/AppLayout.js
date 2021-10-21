import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { Menu, Row, Col, Input } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import useInput from '../hooks/useInput'

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.SubMenu key="menu1" title="메뉴">
          <Menu.Item key="home">
            <Link href="/"><a>홈</a></Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link href="/profile"><a>프로필</a></Link>
          </Menu.Item>
          <Menu.Item key="signup">
            <Link href="/signup"><a>회원가입</a></Link>
          </Menu.Item>
          <Menu.Item>
            <Input.Search
              style={{ verticalAlign: 'middle' }}
              enterButton
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}
            />
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6} />
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="http://hiphoplsy.tistory.com" target="_blank" rel="noreferer noopener noreferrer">블로그</a>
          { me
            ? <UserProfile />
            : <LoginForm />}
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
