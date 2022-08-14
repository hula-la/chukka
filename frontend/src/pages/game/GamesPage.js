import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SingleGame from '../../components/games/SingleGame';

const GamesPage = () => {
  const location = useLocation();

  const songId = location.state.songId;

  return (
    <div>
      <SingleGame songId={songId}></SingleGame>
    </div>
  );
};

export default GamesPage;
