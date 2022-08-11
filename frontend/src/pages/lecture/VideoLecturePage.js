import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MenuIcon from '@mui/icons-material/Menu';
import Webcam from 'react-webcam';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  // header
  & .video-lecture-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }
  & .video-lecture-btn-div {
    display: flex;
    align-items: center;
    margin-right: 10px;
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
    cursor: pointer;
  }
  & .btn-video-off {
    border: 1px solid red;
    color: red;
  }
  & .video-lecture-icon {
    margin-right: 8px;
  }
  & .video-off-icon {
    color: red;
  }
  & .btn-sidebar {
    font-size: 50px;
    cursor: pointer;
  }

  // Sidebar
  .sidebar {
    height: 100%;
    position: fixed;
    /* display: flex;
    flex-direction: column; */
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    /* padding-left: 30px; */
  }

  .sb-close {
    width: 0px;
  }
  .sb-open {
    width: 300px;
  }

  .sidebar a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidebar a:hover {
    color: #f1f1f1;
  }

  .sidebar .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  .openbtn {
    font-size: 20px;
    cursor: pointer;
    background-color: #111;
    color: white;
    padding: 10px 15px;
    border: none;
  }

  // body
  & .video-lecture-body {
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    height: 80%;
  }
  /* & video {
    border: 3px solid white;
  } */

  & .lecture-video-container {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  & .lecture-video-container video {
    width: 100%;
  }
  & .user-video-container {
    margin-left: 10px;
    display: flex;
  }
  & .user-video-container video {
    height: 100%;
    top: 0;
    bottom: 0;
  }
  & .video-off {
    visibility: hidden;
  }

  & .video-lecture-footer {
    display: flex;
    justify-content: space-between;
    border: 2px solid white;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;

// sidebar component
const SectionLecture = () => {
  const Wrapper = styled.div`
    color: white;
    & .side-section-title {
      font-size: 30px;
    }
  `;

  return <div className="side-section-title">춤의 기본</div>;
};

const VideoLecturePage = () => {
  const videoConstraints = {
    width: 360,
    height: 800,
    facingMode: 'user',
  };

  const [isVideo, setIsVideo] = useState(true);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const videoRef = useRef(null);

  const onClickHandler = async () => {
    if (isVideo) {
      setIsVideo(false);
      // videoRef.current.srcObject = null;
    } else {
      setIsVideo(true);
      // const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
      // videoRef.current.srcObject = stream;
    }
  };

  return (
    <Wrapper>
      {/* header */}
      <div className="video-lecture-header">
        <h1>강의영상</h1>
        <div className="video-lecture-btn-div">
          {/* Cam On/Off Button */}
          {isVideo && (
            <button className="btn-video-toggle" onClick={onClickHandler}>
              <VideocamIcon className="video-lecture-icon" />
              <span>내 화면</span>
            </button>
          )}

          {!isVideo && (
            <button
              className="btn-video-toggle btn-video-off"
              onClick={onClickHandler}
            >
              <VideocamOffIcon className="video-lecture-icon video-off-icon" />
              <span>내 화면</span>
            </button>
          )}
          {/* SideBar Button */}
          <MenuIcon
            className="btn-sidebar"
            onClick={() => setIsSideBarOpen(true)}
          />
        </div>
      </div>
      {/* sidebar */}
      <div
        id="mySidebar"
        className={isSideBarOpen ? 'sidebar sb-open' : 'sidebar sb-close'}
      >
        <a
          href="javascript:void(0)"
          class="closebtn"
          onClick={() => setIsSideBarOpen(false)}
        >
          ×
        </a>
        <a href="">asddasasdasdd</a>
        <div>
          <div>rrhrhrhhrh</div>
          <SectionLecture />
        </div>
      </div>
      {/* body */}
      <div className="video-lecture-body">
        <div className="lecture-video-container">
          <video controls src="/video/video_pop.mp4" preload="auto">
            <source src="/video/video_pop.mp4" />
          </video>
        </div>
        <div className="user-video-container">
          {/* <video autoPlay ref={videoRef} /> */}
          <Webcam
            mirrored
            className={isVideo ? '' : 'video-off'}
            videoConstraints={videoConstraints}
          />
        </div>
      </div>
      {/* footer */}
      <div className="video-lecture-footer">
        <h1>footer</h1>
      </div>
    </Wrapper>
  );
};

export default VideoLecturePage;
