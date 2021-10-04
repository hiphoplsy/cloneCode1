import React from 'react';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {

    return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList header={header} data={data} />
    </AppLayout>
  )
};

export default Profile;
