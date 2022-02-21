import React from 'react';
import styled from 'styled-components';

const Responsive = ({ children }) => {
  return <ResponsiveWrapper>{children}</ResponsiveWrapper>;
};

const ResponsiveWrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  @media screen and (max-width: 1280px) {
    width: 1024px;
  }
  @media screen and (max-width: 1024px) {
    width: 800px;
  }
  @media screen and (max-width: 768px) {
    width: calc(100% - 2rem);
  }
`;

export default Responsive;
