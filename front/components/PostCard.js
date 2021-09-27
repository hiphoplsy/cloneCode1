import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Card, Popover } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined } from '@ant-design/icons';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const id = useSelector((state) => state.user.me?.id);

  return (
    <Card
      cover={post.Images[0] && <PostImages images={post.images} />}
      actions={[
        <RetweetOutlined key="retweet" />,
        liked 
          ? <HeartTwoTone key="heart" onClick={onToggleLike} />
          : <HeartOutlined key="heart" onClick={onToggleLike} />,
        <Popover
          key="more" content={[
            <Button.Group>
              {id && post.User.id
              ? (
                <>
                  <Button>수정</Button>
                  <Button type="danger">삭제</Button>
                </>
              )
              : <Button>신고</Button>}
            </Button.Group>
          ]}
        >
        </Popover>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
        title={post.User.nickname[0]}
        description={post.content}
      />
    </Card>
  )
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default PostCard;