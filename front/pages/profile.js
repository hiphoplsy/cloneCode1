import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followersList = [{ nickname: 'zero' }, { nickname: 'zero1' }, { nickname: 'zero2' }];
  const followingsList = [{ nickname: 'zero' }, { nickname: 'zero1' }, { nickname: 'zero2' }];

  return (
    <AppLayout>
      <Head>
        <title>내프로필 || NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={followingsList} />
      <FollowList header="팔로워 목록" data={followersList} />
    </AppLayout>
  );
};

export default Profile;
