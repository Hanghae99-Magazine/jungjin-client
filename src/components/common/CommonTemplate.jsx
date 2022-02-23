import React from 'react';
import styled from 'styled-components';

const CommonTemplate = ({ children }) => {
  return <Template>{children}</Template>;
};

const Template = styled.main`
  h2 {
    text-align: center;
    margin: 4rem;
    font-size: 2rem;
    font-weight: bolder;
  }
`;
export default CommonTemplate;
