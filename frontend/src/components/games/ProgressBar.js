import React from "react";
import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.25);
`;

export const ProgressBar = styled.div`
  width: ${({ progress }) => `${progress}%`};
  height: 50px;
  background: dodgerblue;
`;

const ProgressBar = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressBar progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
