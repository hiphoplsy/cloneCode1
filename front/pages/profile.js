import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import wrapper from '../store/configureStore';

const Profile = () => {
  // const followersList = [{ nickname: 'zero' }, { nickname: 'zero1' }, { nickname: 'zero2' }];
  // const followingsList = [{ nickname: 'zero' }, { nickname: 'zero1' }, { nickname: 'zero2' }];
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);
  const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);
  const { data: followingsData, error: followingsError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);
  const { data: followersData, error: followersError } = useSWR(`http://localhost:3065/user/followings?limit=${followersLimit}`, fetcher);
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (followersError || followingsError) {
    console.log(followersError || followingsError);
    return '팔로잉 또는 팔로워 정보 로드중 오류가 발생하였습니다.';
  }

  if (!me) {
    return '내정보 로딩중....';
  }

  return (
    <AppLayout>
      <Head>
        <title>내프로필 || NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉" data={followingsData} loading={!followingsData && !followingsError} onClickMore={loadMoreFollowings} />
      <FollowList header="팔로워" data={followersData} loading={!followersData && !followersError} onClickMore={loadMoreFollowers} />
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
