import styled from 'styled-components';

const Badge = styled.div`
  background: ${(props) => {
    const colors = ['#FFFFFF', '#B69EEA', '#9664FF', '#702cFF'];
    return colors[props.level];
  }};
  border-radius: 45px;
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LevelBadge = ({ level }) => {
  const levels = ['', '초급', '중급', '고급'];
  return (
    <Badge level={level}>
      <span>{levels[level]}</span>
    </Badge>
  );
};

export default LevelBadge;
