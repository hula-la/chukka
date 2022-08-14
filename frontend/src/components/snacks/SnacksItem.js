import styled from 'styled-components';
import vid from './bird.mp4';
import defaultImage from '../../img/default.jpeg';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReply,
  createReply,
  likeSnacks,
} from '../../features/snacks/snacksActions';

const Wrapper = styled.div`
  #my-video {
    max-height: 600px;
    margin-bottom: 20px;
    overflow: hidden;
  }
  .account {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .profile {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    vertical-align: middle;
  }
  .snacks-nickname {
    margin-left: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
  }
  .tags {
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .tagitem {
    margin-right: 10px;
    opacity: 0.4;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .pink {
    fill: #ff2c55;
  }
  .icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  .snacks-info {
    position: relative;
    bottom: 3rem;
    text-shadow: gray 0.1rem 0.1rem;
    font-size: 1rem;
  }
  .snacks-ttl {
    padding: 0rem 1rem;
  }
  .video {
    display: flex;
    flex-direction: row;
  }
  .side-btns {
    position: relative;
    top: 510px;
    right: 3rem;
    display: flex;
    flex-direction: column;
  }
  .reply {
    margin-top: 0.5rem;
  }
  .reply-container {
    position: absolute;
    bottom: -3px;
    background-color: rgb(255, 255, 255, 0.8);
    width: 100%;
    height: 500px;
  }
  .reply-form {
    position: absolute;
    left: 0.5rem;
    bottom: 0.5rem;
  }
  .reply-form > input {
    border: none;
    height: 2rem;
    width: 220px;
    padding: 0.5rem 0.5rem;
    color: black;
  }
  .reply-upload-btn {
    margin-left: 0.7rem;
    vertical-align: middle;
    cursor: pointer;
    fill: gray;
    transition: 300ms;
    :hover {
      fill: #ff2c55;
    }
  }
`;

const SnacksItem = ({ snacks }) => {
  const dispatch = useDispatch();
  const { snacksReply } = useSelector((state) => state.snacks);

  // 댓글 컴포넌트 열고 닫기
  const [isReply, setIsReply] = useState(false);

  // 버튼 클릭시
  const onClickReply = (e) => {
    setIsReply((state) => !state);
    dispatch(fetchReply(snacks.snacksId));
  };

  // 댓글 생성
  const [contents, setContents] = useState('');

  const snacksId = snacks.snacksId;

  const onChangeReply = (e) => {
    setContents(e.target.value);
  };

  const onSubmitRelpy = (e) => {
    e.preventDefault();
    dispatch(createReply({ snacksId, contents }));
  };

  // 게시글 좋아요
  const [snacksLike, setSnacksLike] = useState(null);

  useEffect(() => {
    setSnacksLike(snacks.like);
  }, []);

  const onClickLike = () => {
    console.log(snacksLike);
    console.log(snacksReply);
    // document.getElementById('my-video').play();
    setSnacksLike((isLike) => {
      return !isLike;
    });
    dispatch(likeSnacks(snacksId));
  };

  return (
    <Wrapper>
      <div className="account">
        <img
          src={snacks.userProfile === null ? defaultImage : snacks.userProfile}
          className="profile"
        ></img>
        <span className="snacks-nickname">{snacks.userNickname}</span>
      </div>
      <div className="tags">
        {snacks.snacksTag.map((tag, index) => {
          return (
            <span className="tagitem" key={index}>
              # {tag}{' '}
            </span>
          );
        })}
      </div>
      <div className="video">
        <div>
          <video
            id="my-video"
            // className="video-js vjs-theme-fantasy"
            // controls
            preload="auto"
          >
            <source
              src={`https://chukkadance.s3.ap-northeast-2.amazonaws.com/vid/snacks/${snacks.snacksId}`}
              type="video/mp4"
            />
          </video>
          <div className="snacks-info">
            <span className="snacks-ttl">{snacks.snacksTitle}</span>
            {isReply && (
              <div className="reply-container">
                {snacksReply.length !== 0 && (
                  <div className="reply-list">
                    <h1>sd</h1>
                    {snacksReply.map((reply, index) => {
                      return <li key={index}>{reply.contents}</li>;
                    })}
                  </div>
                )}
                <form onSubmit={onSubmitRelpy} className="reply-form">
                  <input
                    onChange={onChangeReply}
                    className="reply-input"
                    placeholder="댓글을 입력하세요"
                  />
                  <button>
                    <EditOutlinedIcon className="reply-upload-btn" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="side-btns">
          {!snacksLike && (
            <ThumbUpOffAltIcon onClick={onClickLike} className="icon" />
          )}
          {snacksLike && (
            <ThumbUpAltIcon onClick={onClickLike} className="pink icon" />
          )}
          {!isReply && (
            <ModeCommentOutlinedIcon
              onClick={onClickReply}
              className="reply icon"
            />
          )}
          {isReply && (
            <ModeCommentOutlinedIcon
              onClick={onClickReply}
              className="reply pink icon"
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default SnacksItem;
