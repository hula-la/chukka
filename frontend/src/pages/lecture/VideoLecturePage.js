import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & .video-lecture-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }
  & .btn-video-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    box-sizing: border-box;
    border: 1px solid white;
    border-radius: 50px;
    color: white;
    width: 205px;
    height: 50px;
    font-size: 1.5rem;
  }
  & .video-lecture-icon {
    margin-right: 8px;
  }
  & .video-off {
    color: red;
  }

  & .video-lecture-body {
    display: flex;
    justify-content: space-between;
  }

  & .lecture-video-container {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  & .lecture-video-container video {
    width: 100%;
    /* height: 100%; */
  }
  & .user-video-container {
    /* width: 30%; */
    margin-left: 20px;
    display: flex;
    /* justify-content: center; */
    overflow: hidden;
  }
  & .user-video-container video {
    height: 100%;
    top: 0;
    bottom: 0;
    /* display: none; */
  }
`;

const VideoLecturePage = () => {
  const [isVideo, setIsVideo] = useState(true);

  const CONSTRAINTS = {
    video: {
      width: 20,
      height: 20,
    },
    audio: false,
  };

  const videoRef = useRef(null);

  const onClickHandler = async () => {
    if (isVideo) {
      setIsVideo(false);
      videoRef.current.srcObject = null;
    } else {
      setIsVideo(true);
      const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
      videoRef.current.srcObject = stream;
    }
  };

  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  };
  useEffect(() => {
    startVideo();
  }, []);

  return (
    <Wrapper>
      <div className="video-lecture-header">
        <h1>강의영상</h1>
        <button className="btn-video-toggle" onClick={onClickHandler}>
          <VideocamOffIcon className="video-lecture-icon video-off" />
          <span>내 화면</span>
        </button>
      </div>
      <div className="video-lecture-body">
        <div className="lecture-video-container">
          <video controls src="/video/video_pop.mp4" preload="auto">
            <source src="/video/video_pop.mp4" />
          </video>
        </div>
        <div className="user-video-container">
          <video autoPlay ref={videoRef} />
        </div>
      </div>
    </Wrapper>
  );
};

export default VideoLecturePage;
