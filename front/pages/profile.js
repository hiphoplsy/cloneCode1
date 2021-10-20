import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import wrapper from '../store/configureStore';

const Profile = () => {
  const followersList = [{ nickname: 'zero' }, { nickname: 'zero1' }, { nickname: 'zero2' }];
  const followingsList = [{ nickname: 'zero' }, { nickname: 'zero1' }, { nickname: 'zero2' }];

  return (
    <AppLayout>
      <Head>
        <title>내프로필 || NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉" data={followingsList} />
      <FollowList header="팔로워" data={followersList} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.store.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile;
