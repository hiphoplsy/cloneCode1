import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button, Card, Popover, List, Avatar, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, UnorderedListOutlined } from '@ant-design/icons';

import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import PostImages from './PostImages';

import { REMOVE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleCommentForm = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          <UnorderedListOutlined key="comment" onClick={onToggleCommentForm} />,
          liked
            ? <HeartTwoTone key="heart" onClick={onToggleLike} />
            : <HeartOutlined key="heart" onClick={onToggleLike} />,
          <Popover
            key="more"
            content={[
              <Button.Group>
                {id && post.User.id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger" onClick={onRemovePost}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>,
            ]}
          />,
        ]}
        extra={<FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname[0]}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} 개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  avatar={(
                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  author={item.User.nickname}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
