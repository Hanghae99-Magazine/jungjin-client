import React from 'react';
import styled from 'styled-components';

const CommonInput = ({ children, ...props }) => {
  const { id, type, placeholder, onChange } = props;
  return (
    <ComonInputWrapper
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      onChange={onChange}
    />
  );
};

const ComonInputWrapper = styled.input`
  width: 300px;
  display: block;
  border: 1px solid #000;
  margin: 20px 30px 0px;
  color: #000;
  padding: 15px 10px;
  border-radius: 5px;
  font-size: 1.6rem;
  ::placeholder {
    font-size: 1.6rem;
    color: #8c8c8c;
  }
`;

export default CommonInput;
