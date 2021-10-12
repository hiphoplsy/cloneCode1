import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Menu, Row, Col } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

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
