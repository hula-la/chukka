import React from 'react';
import styled from 'styled-components';
import StarFill from './StarFill';
import StarEmpty from './StarEmpty';

const ReviewStar = ({ score }) => {
  const StarWrapper = styled.div`
    display: flex;
    align-items: center;
    .cls-1 {
      fill: #ffd401;
    }
    & svg {
      width: 16px;
      margin-right: 2px;
    }
  `;
  return (
    <StarWrapper>
      {[...Array(score)].map((n, index) => (
        <StarFill key={index} />
      ))}
      {[...Array(5 - score)].map((n, index) => (
        <StarEmpty key={score + 1 + index} />
      ))}
    </StarWrapper>
  );
};

export default ReviewStar;
