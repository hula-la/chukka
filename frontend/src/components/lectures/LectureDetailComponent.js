import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import LevelBadge from '../../components/LevelBadge';
import CategoryBadge from '../../components/CategoryBadge';
import StyledButton from '../../components/Button';
import ReviewStar from '../../components/lectures/ReviewStar';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { fetchLectureDetail } from '../../features/lecture/lectureActions';

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
    height: 350px;
    object-fit: cover;
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
    /* justify-content: space-between; */
    & div {
      margin-bottom: 8px;
    }
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
    opacity: 0.7;
  }
  & a:hover {
    opacity: 1;
  }
`;

const LectureDetailComponent = () => {
  const { lectureId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoRef = useRef(null);
  const insRef = useRef(null);
  const revRef = useRef(null);

  useEffect(() => {
    dispatch(fetchLectureDetail(lectureId));
  }, [dispatch, lectureId]);

  const {
    lecId,
    lecThumb,
    lecTitle,
    lecLevel,
    lecGenre,
    lecCategory,
    lecPrice,
    lecContents,
    lecNotice,
    lecSchedule,
    dayAndTime,
    lecStartDate,
    lecEndDate,
    lecStudent,
    lecLimit,
    insInfo,
  } = useSelector((state) => state.lecture.lecture);

  const reviews = [
    {
      review_id: 1,
      user_id: '유노준',
      review_score: 4,
      review_regdate: '2022-08-10',
      review_contents: '낫밷',
    },
    {
      review_id: 2,
      user_id: '최지원',
      review_score: 5,
      review_regdate: '2022-08-10',
      review_contents: '나연 최고',
    },
    {
      review_id: 3,
      user_id: '홍성목',
      review_score: 3,
      review_regdate: '2022-08-10',
      review_contents:
        '가나다라마바사 아자차카타파하 목업이 거의 완성이 되는 것 같습니다. 아마도 ?  배경이 너무 어둡지 않나 라는 생각이 조금 들긴 하지만 괜찮은 것 같습니다. 이것은 리뷰입니다. 한 세줄정도 쓰고 그만 쓰려고 합니다. 배가 고파요. 오늘 점심에 해물 야끼우동이었나 그랬던거 같은데 맛있었으면 좋곘습니다. 그럼 이만',
    },
  ];

  const scrollToRev = () => {
    if (revRef && revRef.current) {
      revRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToIns = () => {
    if (insRef && insRef.current) {
      insRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToInfo = () => {
    if (infoRef && infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Wrapper>
      <LectureInfo>
        <img src={lecThumb} alt="" className="thumbnail-img" />
        <LectureInfoDetail>
          <div className="title">
            <h1>{lecTitle}</h1>
          </div>
          <BadgeDiv>
            <LevelBadge level={lecLevel} />
            <CategoryBadge category={lecGenre} />
            <CategoryBadge category={lecCategory} />
          </BadgeDiv>
          <div className="sub-info">
            <div>
              강사 : <span>{insInfo.insName}</span>
            </div>
            <div>
              강의 기간 : <span>{lecSchedule}</span>
            </div>
            <div>
              강의 시간 : <span>{dayAndTime}</span>
            </div>
            <div>
              수강 인원 :{' '}
              <span>
                {lecStudent} / {lecLimit}
              </span>
            </div>
            <div>
              <>총 금액 : </>
              <span>
                {lecPrice
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                원
              </span>
            </div>
          </div>
          <StyledButton
            content="장바구니에 담기"
            onClick={() => navigate(`/accounts/cart`)}
          />
        </LectureInfoDetail>
      </LectureInfo>
      {/* <NoticeDiv>공지사항 </NoticeDiv> */}
      <LectureNav>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            scrollToInfo();
          }}
        >
          강의 정보
        </a>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            scrollToIns();
          }}
        >
          강사 소개
        </a>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            scrollToRev();
          }}
        >
          리뷰
        </a>
      </LectureNav>
      <LectureSubTitle id="info" ref={infoRef}>
        <h1>강의 정보</h1>
      </LectureSubTitle>
      {/* {lecContents} */}
      <LectureSubContent content={lecContents} />

      <LectureSubTitle id="instructor" ref={insRef}>
        <h1>강사 소개</h1>
      </LectureSubTitle>
      <InstructorInfo instructorInfo={insInfo} />

      <LectureSubTitle id="review" ref={revRef}>
        <h1>리뷰</h1>
      </LectureSubTitle>
      <ReviewContainer reviews={reviews} />
    </Wrapper>
  );
};

export default LectureDetailComponent;

const LectureSubContent = ({ content }) => {
  const SubContent = styled.div`
    margin: 1rem 0rem;
    padding: 2rem;
    min-height: 500px;
    font-size: 24px;
  `;
  return <SubContent>{content}</SubContent>;
};

const InstructorInfo = ({ instructorInfo }) => {
  const InstWrapper = styled.div`
    display: flex;
    margin: 1rem 0rem;
    padding: 2rem;
    & img {
      height: 400px;
      width: 200px;
    }
    & .ins-info {
      padding-left: 2rem;
      div {
        margin-top: 1rem;
        font-size: 1.2rem;
      }
    }
  `;

  const { insProfile, insName, insIntroduce, insEmail } = instructorInfo;
  return (
    <InstWrapper>
      <img src={insProfile} alt="강사 이미지" />
      <div className="ins-info">
        <h1>{insName}</h1>
        <div className="ins-email">{insEmail}</div>
        <div className="ins-introduce">{insIntroduce}</div>
      </div>
    </InstWrapper>
  );
};

const ReviewContainer = ({ reviews }) => {
  const ReviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0rem;
    padding: 2rem;
  `;
  return (
    <ReviewWrapper>
      {reviews.map((review, index) => (
        <ReviewItem review={review} key={index} />
      ))}
    </ReviewWrapper>
  );
};

const ReviewItem = ({ review }) => {
  const ReviewItemWrapper = styled.div`
    display: flex;
    /* align-items: center; */
    /* border: 1px solid white; */
    margin-bottom: 1rem;
    min-height: 80px;
    & img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
    & .review-body {
      padding-left: 1.5rem;
    }
    & .review-header {
      display: flex;
      margin-bottom: 8px;
    }
    & .review-title {
      font-size: 1.3rem;
      font-weight: bold;
      margin-right: 12px;
    }
  `;
  return (
    <ReviewItemWrapper>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        alt=""
      />
      <div className="review-body">
        <div className="review-header">
          <span className="review-title">{review.user_id}</span>
          <ReviewStar score={review.review_score} />
        </div>
        <div>{review.review_contents}</div>
      </div>
    </ReviewItemWrapper>
  );
};
