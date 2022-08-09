import React from 'react';
import VideoRoomComponent from './VideoRoomComponent';

import { useNavigate } from 'react-router-dom';

const LivePage = () => {
  const navigate = useNavigate();
  return (
    <VideoRoomComponent
      navigate={() => {
        navigate(-1);
      }}
    />
  );
};

export default LivePage;
