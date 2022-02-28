import React from 'react';
import styled from 'styled-components';
import { BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLike } from '../../redux/modules/like';

const PostFooter = ({ postData }) => {
  const dispatch = useDispatch();
  const uploadDate = postData.upload_date.split('T')[0];

  const handleLikeBtn = (e) => {
    e.stopPropagation();
    dispatch(fetchLike(postData.post_id));
  };

  const isLike = useSelector(({ like }) => {
    return like.isLike;
  });

  console.log(isLike);

  return (
    <PostFooterWrapper>
      <div className="like-box">
        <BsHeartFill className="like-icon" onClick={handleLikeBtn} />
        <span>{postData.post_like}</span>
      </div>
      <div className="date-box">
        <p>{uploadDate}</p>
      </div>
    </PostFooterWrapper>
  );
};

const PostFooterWrapper = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  .like-box {
    display: flex;
    gap: 0.5rem;
  }
  .like-icon {
    color: #000;
    cursor: pointer;
  }

  .date-vox {
  }
`;

export default PostFooter;
