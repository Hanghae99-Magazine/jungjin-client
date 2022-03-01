import React, { useState } from 'react';
import styled from 'styled-components';
import { BsHeartFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { fetchLike } from '../../redux/modules/like';

const PostFooter = ({ postData }) => {
  const dispatch = useDispatch();

  const nickname = sessionStorage.getItem('nickname');

  const validate = postData.like_list.includes(nickname);

  const [like, setLike] = useState(validate);

  const uploadDate = postData.upload_date.split('T')[0];

  const handleLikeBtn = () => {
    dispatch(fetchLike(postData.post_id));
    setLike(!validate);
  };

  return (
    <PostFooterWrapper>
      <div className="like-box">
        {!like ? (
          <BsHeartFill className="unlike-btn" onClick={handleLikeBtn} />
        ) : (
          <BsHeartFill className="like-btn" onClick={handleLikeBtn} />
        )}
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
  .unlike-btn {
    color: #000;
    cursor: pointer;
  }
  .like-btn {
    color: #f00;
    cursor: pointer;
  }
`;

export default PostFooter;
