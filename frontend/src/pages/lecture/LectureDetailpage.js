import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LevelBadge from '../../components/LevelBadge';
import CategoryBadge from '../../components/CategoryBadge';
import StyledButton from '../../components/Button';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  padding: 0rem 6rem;
`;

const LectureInfo = styled.div`
  display: flex;
  & .thumbnail-img {
    width: 60%;
  }
  margin-bottom: 1.5rem;
`;

const LectureInfoDetail = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 50px;
  flex-grow: 1;
  & .title {
    border-bottom: 4px solid #ff2c55;
    padding-bottom: 0.6rem;
    margin-bottom: 1rem;
    width: 100%;
  }
  box-sizing: border-box;
  & button {
    width: 100%;
  }
  & .sub-info {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-bottom: 1rem;
    flex-grow: 1;
    font-size: 1.2rem;
    justify-content: space-between;

    & span {
      font-weight: bold;
    }
  }
`;

const BadgeDiv = styled.div`
  display: flex;
  & div {
    margin-right: 10px;
  }
`;

const NoticeDiv = styled.div`
  width: 100%;
  background-color: #316cc3;
  color: white;
  height: 65px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
`;

const LectureSubTitle = styled.div`
  width: 100%;
  border-bottom: 3px solid #ff2c55;
  padding-bottom: 1rem;
`;

const LectureNav = styled.div`
  margin-bottom: 2rem;
  & a {
    font-size: 1.6rem;
    margin-right: 2rem;
  }
`;

const LectureSubContent = () => {
  const SubContent = styled.div`
    margin-bottom: 2rem;
    height: 700px;
  `;
  return <SubContent></SubContent>;
};

const LectureDetailpage = () => {
  const { lectureId } = useParams();
  console.log(lectureId);
  const { title, content, thumbnail, level, genre, category } = useSelector(
    (state) => state.lecture,
  );
  return (
    <Wrapper>
      <LectureInfo>
        <img src={thumbnail} alt="" className="thumbnail-img" />
        <LectureInfoDetail>
          <div className="title">
            <h1>{title}</h1>
          </div>
          <BadgeDiv>
            <LevelBadge level={level} />
            <CategoryBadge category={genre} />
            <CategoryBadge category={category} />
          </BadgeDiv>
          <div className="sub-info">
            <div>
              강사 : <span>임나연</span>
            </div>
            <div>
              강의 기간 : <span>7주, 주 1회</span>
            </div>
            <div>
              강의 시간 : <span>매주 월요일, 20:00</span>
            </div>
            <div>
              수강 인원 : <span>2 / 6</span>
            </div>
            <div>
              <>총 금액 : </>
              <span>109,990원</span>
            </div>
          </div>
          <StyledButton content="장바구니에 담기" />
        </LectureInfoDetail>
      </LectureInfo>
      {/* <NoticeDiv>공지사항 </NoticeDiv> */}
      <LectureNav>
        <a href="#info">강의 정보</a>
        <a href="#instructor">강사 소개</a>
        <a href="#review">리뷰</a>
      </LectureNav>
      <LectureSubTitle id="info">
        <h1>강의 정보</h1>
      </LectureSubTitle>
      <LectureSubContent>11</LectureSubContent>

      <LectureSubTitle id="instructor">
        <h1>강사 소개</h1>
      </LectureSubTitle>
      <LectureSubContent>22</LectureSubContent>

      <LectureSubTitle id="review">
        <h1>리뷰</h1>
      </LectureSubTitle>
      <LectureSubContent>33</LectureSubContent>
    </Wrapper>
  );
};

export default LectureDetailpage;
