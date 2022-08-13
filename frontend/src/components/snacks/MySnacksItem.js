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
  }
`;

const MySnacksItem = ({ snacks }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default MySnacksItem;
