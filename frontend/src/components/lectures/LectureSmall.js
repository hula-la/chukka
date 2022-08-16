import LevelBadge from '../LevelBadge';
import CategoryBadge from '../CategoryBadge';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  .thumbnail:hover + .btn {
    display: inline-block;
  }
`;
const Thumbnail = styled.div`
  position: relative;
  cursor: pointer;
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
    padding: 0.5rem 0.3rem;
  }
  & .lecture-info > h1 {
    font-size: 1.8rem;
  }
  &:hover {
    transform: scale3d(1.05, 1.05, 1.05);
    z-index: 2;
    transition: transform 0.5s;
    transition: opacity 0.5s;
    opacity: 0.2;
  }
  /* &:hover .btn {
    display: inline-block;
  } */
`;

const StyledButton = styled.button`
  display: none;
  position: absolute;
  /* bottom: 5.5rem;
  left: 4rem; */
  top: 50%;
  left: 50%;
  width: 150px;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 1.5rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
`;

const BadgeDiv = styled.div`
  display: flex;
  margin-top: 8px;
  & div {
    margin-right: 5px;
  }
`;

const LectureSmall = ({ props, noBadge, classOpen }) => {
  const navigate = useNavigate();
  const { lecId, lecTitle, lecThumb, lecLevel, lecGenre, lecCategory } = props;
  const onClickHandler = () => {
    if (!classOpen) {
      navigate(`/lectures/${lecId}`);
    } else {
      navigate(`/lectures/class/${lecId}`);
    }
  };
  return (
    <Wrapper>
      <Thumbnail onClick={onClickHandler} className="thumbnail">
        <img src={lecThumb} alt="" />
        <div className="lecture-info">
          <h1>{lecTitle}</h1>
        </div>
      </Thumbnail>
      <StyledButton className="btn">바로가기</StyledButton>
      {!noBadge && (
        <BadgeDiv>
          <LevelBadge level={lecLevel} />
          <CategoryBadge category={lecGenre} />
          <CategoryBadge category={lecCategory} />
        </BadgeDiv>
      )}
    </Wrapper>
  );
};

export default LectureSmall;
