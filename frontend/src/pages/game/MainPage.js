import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { fetchMusic } from '../../features/game/gameActions';
import { Carousel } from '3d-react-carousal';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { musicList } = useSelector((state) => state.game);
  const [thumbnailList, setThumbnailList] = useState([]);
  const [musicNum, setMusicNum] = useState(null);

  useEffect(() => {
    if (musicList.lengh === 0) {
      return;
    } else {
      const thumbnail = musicList.map((music) => {
        return (
          <div>
            <img
              width={'300vW'}
              src={`https://chukkachukka.s3.ap-northeast-2.amazonaws.com/game/thumnail/${music.songId}`}
              alt={`${music.songId}`}
            />

            <div>
              {music.songName}
              {music.singer}
              {'★'.repeat(music.level)}
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
  };

  const onClick = () => {
    navigate('/game', {
      state: {
        songId: musicNum,
      },
    });
  };

  return (
    <div>
      {thumbnailList.length !== 0 && (
        <Carousel slides={thumbnailList} onSlideChange={onSlideChange} />
      )}
      <button onClick={onClick}>게임시작</button>
    </div>
  );
};

export default MainPage;
