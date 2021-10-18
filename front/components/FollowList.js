import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Card, Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';

import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    if (header === '팔로워') {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };

  return (
    <List
      style={{ marginBottom: '20px' }}
      grid={{ gutter: 16, sm: 2, md: 3 }}
      size="small"
      bordered
      header={<div>{header}</div>}
      dataSource={data}
      loadMore={<div style={{ textAlign: 'center', margin: '10px 0' }}><Button>더보기</Button></div>}
      renderItem={(item) => (
        <List.Item style={{ marginBottom: '20px' }}>
          <Card
            actions={[
              <StopOutlined key="stop" onClick={onCancel(item.id)} />,
            ]}
          >
            <Card.Meta description={data.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
