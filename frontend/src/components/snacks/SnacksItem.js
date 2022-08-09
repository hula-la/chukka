import styled from 'styled-components';
import vid from './bird.mp4';
import image from './profile.png';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

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

const SnacksItem = () => {
  return (
    <Wrapper>
      <div className="account">
        <img src={image} className="profile"></img>
        <span className="snacks-nickname">Nickname</span>
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
      {/* <ThumbUpAltIcon className='pink'/> */}
    </Wrapper>
  );
};

export default SnacksItem;
