import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { fetchMusic } from '../../features/game/gameActions';
import { Carousel } from '3d-react-carousal';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;

  .select-music {
    margin-top: 2rem;
  }
  .btn {
    margin-bottom: 0;
    align-items: center;
  }
`;

const StyledButton = styled.button`
  color: white;
  background-color: #ff2c55;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  width: 140px;
  height: 42px;
  border: none;
  cursor: pointer;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
  :hover {
    opacity: 0.7;
  }
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { musicList } = useSelector((state) => state.game);
  const [thumbnailList, setThumbnailList] = useState([]);
  const [musicNum, setMusicNum] = useState(null);
  const [highScore, setHighScore] = useState(null);

  useEffect(() => {
    if (musicList.lengh === 0) {
      return;
    } else {
      const thumbnail = musicList.map((music) => {
        return (
          <div>
            <img
              width={'300vW'}
              src={`${process.env.REACT_APP_S3_URL_CHUKKA}/game/thumnail/${music.songId}`}
              alt={`${music.songId}`}
            />

            <div>
              {music.songName} | {music.singer} | {'★'.repeat(music.level)} |{' '}
              {music.highScore}
            </div>
          </div>
        );
      });
      setThumbnailList(thumbnail);
    }
  }, [musicList]);

  useEffect(() => {
    dispatch(fetchMusic());
  }, [dispatch]);

  const onSlideChange = (index) => {
    setMusicNum(musicList[index].songId);
    setHighScore(musicList[index].highScore);
  };

  const onClick = () => {
    navigate('/game', {
      state: {
        songId: musicNum,
        highScore: highScore,
      },
    });
  };

  return (
    <Wrapper>
      <div className="select-music">
        {thumbnailList.length !== 0 && (
          <Carousel slides={thumbnailList} onSlideChange={onSlideChange} />
        )}
      </div>
      <div className="btn">
        <StyledButton onClick={onClick}>게임시작</StyledButton>
      </div>
    </Wrapper>
  );
};

export default MainPage;
