import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
  & .video-lecture-left-div {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  & .video-lecture-exit {
    cursor: pointer;
    margin-right: 10px;
    font-size: 50px;
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
  & .btn-video-toggle:hover {
    background: rgba(127, 127, 127, 0.5);
  }
  & .btn-video-off {
    border: 1px solid red;
    color: red !important;
  }
  & .video-lecture-icon {
    margin-right: 8px;
  }
  & .video-off-icon {
    color: red !important;
  }
  & .btn-sidebar {
    font-size: 50px;
    margin-left: 10px;
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
    padding-top: 10px;
    /* padding-left: 30px; */
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    margin-left: 30px;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 370px;
  }

  .sidebar-body {
    margin-left: 30px;
  }

  .sb-close {
    width: 0px;
    /* z-index: -1; */
  }
  .sb-open {
    width: 400px;
  }

  .sidebar a {
    /* padding: 8px 8px 8px 32px; */
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    /* display: block; */
    transition: 0.3s;
    margin-right: 25px;
  }

  .sidebar a:hover {
    color: #f1f1f1;
  }

  .sidebar .closebtn {
    /* position: absolute;
    top: 0;
    right: 25px; */
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

  // footer

  & .video-lecture-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 18px;
    /* border: 2px solid white; */
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    font-size: 24px;
    & div {
      cursor: pointer;
      display: flex;
      align-items: center;
      & span {
        margin: 0px 10px;
      }
    }
  }
`;

// sidebar component
const SectionLecture = ({ section, index }) => {
  const Wrapper = styled.div`
    width: 300px;
    display: block;
    color: white;
    & .side-section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    & .side-section-title {
      font-size: 30px;
      display: block;
    }
    & .side-section-playtime {
      font-size: 18px;
    }
    min-height: 120px;
    margin-bottom: 12px;
  `;

  const { secTitle, secContent, secPlayTime } = section;

  return (
    <Wrapper>
      <div className="side-section-header">
        <div className="side-section-title">
          {index + 1}. {secTitle}
        </div>
        <div className="side-section-playtime">{secPlayTime}</div>
      </div>
      <div className="side-section-content">{secContent}</div>
    </Wrapper>
  );
};

const VideoLecturePage = () => {
  const navigate = useNavigate();
  const videoConstraints = {
    width: 360,
    height: 800,
    facingMode: 'user',
  };

  const [isVideo, setIsVideo] = useState(true);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

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

  // 소강의 더미 데이터
  const dummySection = [
    { secTitle: '춤의 기본', secContent: '스트레칭', secPlayTime: '15:23' },
    { secTitle: '춤의 기본-2', secContent: '스텝', secPlayTime: '15:23' },
    { secTitle: '춤의 기본-3', secContent: '스텝2', secPlayTime: '15:23' },
  ];

  return (
    <Wrapper>
      {/* header */}
      <div className="video-lecture-header">
        <div className="video-lecture-left-div">
          <ExitToAppIcon
            className="video-lecture-exit"
            onClick={() => navigate('/lectures')}
          />
          <h1>강의영상</h1>
        </div>
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
        <div className="sidebar-header">
          <h1>강의 목록</h1>
          <a
            href=""
            class="closebtn"
            onClick={(e) => {
              e.preventDefault();
              setIsSideBarOpen(false);
            }}
          >
            ×
          </a>
        </div>
        <div className="sidebar-body">
          {dummySection.map((section, index) => (
            <SectionLecture section={section} index={index} key={index} />
          ))}
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
        <div className="video-lecture-prev">
          <ArrowBackIosIcon />
          <span>이전 강의 없음</span>
        </div>
        <div className="video-lecture-next">
          <span>2. 춤의 기본-2</span>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </Wrapper>
  );
};

export default VideoLecturePage;
