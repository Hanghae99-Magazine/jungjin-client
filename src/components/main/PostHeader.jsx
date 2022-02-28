import React from 'react';

import { AiFillDelete } from 'react-icons/ai';
import { IoMdCreate } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../../api/posts';
import { getPostById } from '../../redux/modules/posts';

const PostHeader = ({ postData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nickname = sessionStorage.getItem('nickname');

  const handleUpdateBtn = () => {
    dispatch(getPostById(postData.post_id));
    navigate(`/write/update/${postData.post_id}`);
  };

  const handleDeleteBtn = async () => {
    await deletePost(postData.post_id);
    navigate('/');
  };
  return (
    <PostHeaderWrapper className="user-info-container">
      <div className="user-profile-info">
        <span>{postData.nickname}</span>
      </div>
      {nickname === postData.nickname ? (
        <div className="update-container">
          <IoMdCreate className="update-btn" onClick={handleUpdateBtn} />
          <AiFillDelete className="delete-btn" onClick={handleDeleteBtn} />
        </div>
      ) : (
        ''
      )}
    </PostHeaderWrapper>
  );
};

const PostHeaderWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  font-weight: bolder;
  .update-container {
    font-size: 2.2rem;
    display: flex;
    gap: 1rem;
    .update-btn:hover {
      cursor: pointer;
      color: #eee1f2;
    }
    .delete-btn:hover {
      cursor: pointer;
      color: #ff0000;
    }
  }
`;

export default PostHeader;
