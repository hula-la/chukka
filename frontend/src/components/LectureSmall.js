import LevelBadge from './LevelBadge';
import CategoryBadge from './CategoryBadge';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
`;
const Thumbnail = styled.div`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 60%);
  }
  & img {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }
  & .lecture-info {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
`;

const BadgeDiv = styled.div`
  display: flex;
  margin-top: 8px;
  & div {
    margin-right: 5px;
  }
`;

const LectureSmall = ({ props }) => {
  const { title, content, thumbnail, level, genre, category } = props;
  return (
    <Wrapper>
      <Thumbnail>
        <img src={thumbnail} alt="" />
        <div className="lecture-info">
          <h1>{title}</h1>
          <h2>{content}</h2>
        </div>
      </Thumbnail>
      <BadgeDiv>
        <LevelBadge level={level} />
        <CategoryBadge category={genre} />
        <CategoryBadge category={category} />
      </BadgeDiv>
    </Wrapper>
  );
};

export default LectureSmall;
