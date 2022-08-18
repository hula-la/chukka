import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSections } from '../../features/lecture/lectureActions';
import styled from 'styled-components';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';
import Webcam from 'react-webcam';
import NotFound from '../NotFound';
import { useEffect } from 'react';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  // header
  & .video-lecture-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    /* border-bottom: 0.1rem solid #ff2c55; */
  }
  & .video-lecture-left-div {
    display: flex;
    align-items: center;
    margin-left: 1rem;
    cursor: pointer;
    opacity: 0.7;
    transition: 300ms;
    :hover {
      opacity: 1;
      /* border-bottom-color: #ff2c55; */
      /* background-color: #ff2c55; */
    }
  }
  & .video-lecture-exit {
    margin-right: 1rem;
    font-size: 3rem;
  }
  & .title {
    text-align: center;
  }
  & .video-lecture-btn-div {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
  & .btn-video-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    box-sizing: border-box;
    /* border: 1px solid white; */
    background-color: rgb(255, 44, 85, 1);
    border-radius: 3rem;
    color: white;
    width: 8rem;
    height: 3rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 300ms;
    opacity: 0.8;
    ::after {
      content: ' ON';
    }
  }
  & .btn-video-toggle:hover {
    opacity: 1;
  }
  & .btn-video-off {
    background-color: rgb(255, 255, 255, 0.3);
    ::after {
      content: ' OFF';
    }
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
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  & .btn-sidebar:hover {
    opacity: 1;
  }

  .hr {
    height: 0.2rem;
    background-color: #ff2c55;
    border: none;
    margin: 0 1rem 2rem;
    opacity: 0.5;
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
  .sidebar-title {
    font-size: 3rem;
  }

  .sidebar-body {
    padding: 3rem 3rem;
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
    font-size: 36px;
    margin-left: 50px;
    opacity: 0.5;
  }
  .sidebar .closebtn:hover {
    opacity: 1;
  }
  .sidebar .closeicon {
    width: 3rem;
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
    margin: 0 auto;
    height: 75vh;
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
    max-width: 100%;
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
    display: none;
    /* visibility: hidden; */
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
    font-size: 1.3rem;
    & div {
      cursor: pointer;
      display: flex;
      align-items: center;

      & span {
        margin: 0px 10px;
        opacity: 0.5;
        transition: 100ms;
        :hover {
          opacity: 0.8;
          color: #ff2c55;
          font-weight: bold;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

// sidebar component
const SectionLecture = ({ section, index, sideBarClickHandler }) => {
  const { sectionId } = useParams();
  const Wrapper = styled.div`
    width: 300px;
    display: block;
    color: white;
    opacity: 0.7;
    border-bottom: #ff2c55 0.1rem solid;
    cursor: pointer;
    :hover {
      opacity: 1;
    }
    & .side-section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    & .side-section-title {
      font-size: 1.5rem;
      display: block;
    }
    & .side-section-playtime {
      font-size: 1rem;
      line-height: 1.5;
      color: rgb(255, 44, 85, 0.7);
    }

    min-height: 6rem;
    margin-bottom: 2rem;
  `;

  const { secTitle, secContents, secThumb } = section;

  return (
    <Wrapper onClick={() => sideBarClickHandler(index + 1)}>
      <div className="side-section-header">
        <div className="side-section-title">
          {index + 1}. {secTitle}
        </div>
        <div className="side-section-playtime">{}</div>
      </div>
      <div className="side-section-content">{secContents}</div>
    </Wrapper>
  );
};

const VideoLecturePage = () => {
  const { lectureId, sectionIdx } = useParams();
  // const { lectureId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionInfo, setSectionInfo] = useState(null);
  const [sectionList, setSectionList] = useState([]);
  useEffect(() => {
    dispatch(fetchSections(lectureId));
  }, [dispatch]);
  const sections = useSelector((state) => state.lecture.sections);
  // setSections(useSelector((state) => state.lecture.sections));
  useEffect(() => {
    setSectionList(sections);
  }, [sections]);
  useEffect(() => {
    // const section = sections.filter((sec) => sec.secId == sectionId)[0];
    const section = sections[sectionIdx - 1];
    setSectionInfo(section);
  }, [sections, sectionIdx]);
  const videoConstraints = {
    width: 360,
    height: 800,
    facingMode: 'user',
  };

  const [isVideo, setIsVideo] = useState(true);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const onClickHandler = () => {
    if (isVideo) {
      setIsVideo(false);
    } else {
      setIsVideo(true);
    }
  };

  const sideBarClickHandler = (secId) => {
    setIsSideBarOpen(false);
    navigate(`/lectures/${lectureId}/section/${secId}`);
  };

  return (
    <Wrapper>
      {sectionInfo && (
        <>
          {/* header */}
          <div className="video-lecture-header">
            <div
              className="video-lecture-left-div"
              onClick={() => navigate(`/lectures/${lectureId}`)}
            >
              <ExitToAppIcon className="video-lecture-exit" />
              <h3>강의로 돌아가기</h3>
            </div>
            <h1 className="title">
              {`${sectionIdx}. ${sectionInfo.secTitle}`}
            </h1>
            <div className="video-lecture-btn-div">
              {/* Cam On/Off Button */}
              {isVideo && (
                <button className="btn-video-toggle" onClick={onClickHandler}>
                  <VideocamIcon className="video-lecture-icon" />
                </button>
              )}

              {!isVideo && (
                <button
                  className="btn-video-toggle btn-video-off"
                  onClick={onClickHandler}
                >
                  <VideocamOffIcon className="video-lecture-icon video-off-icon" />
                </button>
              )}
              {/* SideBar Button */}
              <MenuIcon
                className="btn-sidebar"
                onClick={() => setIsSideBarOpen(true)}
              />
            </div>
          </div>
          <hr className="hr" />
          {/* sidebar */}
          <div
            id="mySidebar"
            className={isSideBarOpen ? 'sidebar sb-open' : 'sidebar sb-close'}
          >
            <div className="sidebar-header">
              <h1 className="sidebar-title">챕터</h1>
              <a
                href=""
                class="closebtn"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSideBarOpen(false);
                }}
              >
                <CloseIcon class="closeicon" style={{ fill: '#ff2c55' }} />
              </a>
            </div>
            <div className="sidebar-body">
              {sectionList.map((section, index) => (
                <SectionLecture
                  section={section}
                  index={index}
                  key={index}
                  sideBarClickHandler={sideBarClickHandler}
                />
              ))}
            </div>
          </div>
          {/* body */}
          <div className="video-lecture-body">
            <div className="lecture-video-container">
              <video controls src={sectionInfo.secThumb} preload="auto">
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
              {sectionIdx == 1 ? (
                <span>이전 강의 없음</span>
              ) : (
                <span
                  onClick={() => {
                    navigate(
                      `/lectures/${lectureId}/section/${
                        parseInt(sectionIdx) - 1
                      }`,
                    );
                  }}
                >{`${sectionIdx - 1}. ${
                  sectionList[sectionIdx - 2].secTitle
                }`}</span>
              )}
            </div>
            <div className="video-lecture-next">
              {sectionIdx == sectionList.length ? (
                <span>다음 강의 없음</span>
              ) : (
                <span
                  onClick={() => {
                    navigate(
                      `/lectures/${lectureId}/section/${
                        parseInt(sectionIdx) + 1
                      }`,
                    );
                  }}
                >
                  {`${parseInt(sectionIdx) + 1}. ${
                    sectionList[sectionIdx].secTitle
                  }`}
                </span>
              )}

              <ArrowForwardIosIcon />
            </div>
          </div>
        </>
      )}
      {!sectionInfo && <NotFound />}
    </Wrapper>
  );
};

export default VideoLecturePage;
