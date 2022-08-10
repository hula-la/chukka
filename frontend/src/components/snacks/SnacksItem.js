import styled from 'styled-components';
import vid from './bird.mp4';
import image from './profile.png';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchReply, createReply } from '../../features/snacks/snacksActions';

const Wrapper = styled.div`
  #my-video {
    width: 80%;
    height: 600px;
    margin-bottom: 20px;
  }
  .account {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .profile {
    width: 50px;
    height: 50px;
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
    color: #ff2c55;
    cursor: pointer;
  }
`;

const SnacksItem = ({ snacks }) => {
  const [isReply, setIsReply] = useState(false);

  const dispatch = useDispatch();

  const onClickReply = (e) => {
    setIsReply((state) => !state);
    dispatch(fetchReply(snacks.snacksId));
  };

  const [contents, setContents] = useState('');

  const snacksId = snacks.snacksId;

  const onChangeReply = (e) => {
    setContents(e.target.value);
  };

  const onSubmitRelpy = (e) => {
    e.preventDefault();
    dispatch(createReply({ snacksId, contents }));
  };

  return (
    <Wrapper>
      <div className="account">
        <img src={image} className="profile"></img>
        <span className="snacks-nickname">{snacks.userNickname}</span>
      </div>
      <div className="tags">
        <span className="tagitem"># TAG1</span>
        <span className="tagitem"># TAG2</span>
        <span className="tagitem"># TAG3</span>
        <span className="tagitem"># TAG4</span>
      </div>
      <video
        id="my-video"
        // className="video-js vjs-theme-fantasy"
        controls
        preload="auto"
      >
        <source src={vid} type="video/mp4" />
      </video>
      <ThumbUpOffAltIcon className="pink" />
      <button onClick={onClickReply}>댓글</button>
      {isReply && (
        <div>
          <h3>comment</h3>
          <form onSubmit={onSubmitRelpy}>
            <input onChange={onChangeReply} />
            <button>댓글 작성</button>
          </form>
        </div>
      )}
    </Wrapper>
  );
};

export default SnacksItem;
