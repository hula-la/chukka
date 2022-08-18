import React from 'react';
import MultiGameComponent from './MultiGameComponent';

import { useNavigate } from 'react-router-dom';

const MultiGamePage = () => {
  const navigate = useNavigate();
  return (
    <MultiGameComponent
      navigate={() => {
        navigate(-1);
      }}
    />
  );
};

export default MultiGamePage;
