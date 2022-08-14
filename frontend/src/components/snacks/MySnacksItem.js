<<<<<<< HEAD
import styled from 'styled-components';
import vid from './bird.mp4';
import image from './profile.png';

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
=======
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import vid from './bird.mp4';

const Wrapper = styled.div`
  /* height: 70vh; */
  #my-video {
    width: 15vw;
    height: 60vh;
    margin: 0 auto;
    transition: 200ms;
    cursor: pointer;
    :hover {
      opacity: 0.5;
    }
>>>>>>> develop/front
  }
`;

const MySnacksItem = ({ snacks }) => {
  return (
    <Wrapper>
<<<<<<< HEAD
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
=======
      <Link to={`/snacks/${snacks.snacksId}`}>
        <video
          id="my-video"
          className="video-js vjs-theme-fantasy"
          preload="auto"
        >
          <source
            src={`https://chukkadance.s3.ap-northeast-2.amazonaws.com/vid/snacks/${snacks.snacksId}`}
            type="video/mp4"
          />
        </video>
      </Link>
>>>>>>> develop/front
    </Wrapper>
  );
};

export default MySnacksItem;
