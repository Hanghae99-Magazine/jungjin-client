import React from 'react';
import styled from 'styled-components';
import { BsHeartFill } from 'react-icons/bs';
import { fetchLike } from '../../api/like';

const PostFooter = ({ postData }) => {
  const uploadDate = postData.upload_date.split('T')[0];

  const handleLikeBtn = async (post_id) => {
    const res = await fetchLike(post_id);
    console.log(res);
  };
  return (
    <PostFooterWrapper>
      <div className="like-box">
        <BsHeartFill
          className="like-icon"
          onClick={handleLikeBtn(postData.post_id)}
        />
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
