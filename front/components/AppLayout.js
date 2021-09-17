import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';

const AppLayout = ({ children }) => {
  
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.SubMenu key="menu1" title="메뉴">
          <Menu.Item key="home">
            <Link href='/'><a>홈</a></Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link href='/profile'><a>프로필</a></Link>
          </Menu.Item>
          <Menu.Item key="signup">
            <Link href='/signup'><a>회원가입</a></Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  )
}

export default AppLayout;
