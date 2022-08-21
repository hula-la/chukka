import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import LevelBadge from '../../components/LevelBadge';
import CategoryBadge from '../../components/CategoryBadge';
import StyledButton from '../../components/Button';
import ReviewStar from '../../components/lectures/ReviewStar';
import Alert from '../Alert';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  fetchLectureDetail,
  fetchReviews,
} from '../../features/lecture/lectureActions';
import { clearLecture } from '../../features/lecture/lectureSlice';
import { insertCartItem, userCartCount } from '../../features/cart/cartActions';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

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
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const insRef = useRef(null);
  const revRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    return () => {
      dispatch(clearLecture());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchLectureDetail(lectureId));
    dispatch(fetchReviews(lectureId));
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
    cart,
  } = useSelector((state) => state.lecture.lecture);
  const { sections } = useSelector((state) => state.lecture);
  const { reviews } = useSelector((state) => state.lecture);

  const scrollToSection = () => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const onClick = async () => {
    await dispatch(insertCartItem(lecId));
    dispatch(userCartCount());
    dispatch(fetchLectureDetail(lectureId));
    openModal();
    // alert('강의를 장바구니에 담았습니다.');
    // navigate(`/accounts/cart`);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Wrapper>
      <Alert open={modalOpen} close={closeModal} header={'CHUKKA'}>
        {'강의를 장바구니에 담았습니다.'}
      </Alert>
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
            {!lecCategory ? (
              <>
                <div>
                  강의 시간 : <span>{dayAndTime}</span>
                </div>
                <div>
                  수강 인원 :{' '}
                  <span>
                    {lecStudent} / {lecLimit}
                  </span>
                </div>
              </>
            ) : null}
            {/* <div>
              강의 시간 : <span>{dayAndTime}</span>
            </div>
            <div>
              수강 인원 :{' '}
              <span>
                {lecStudent} / {lecLimit}
              </span>
            </div> */}
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
          {!cart && (lecStudent < lecLimit || lecCategory) && (
            <StyledButton content="장바구니에 담기" onClick={onClick} />
          )}
          {!cart && !(lecStudent < lecLimit || lecCategory) && (
            <StyledButton content="강의 인원이 가득 찼습니다." disabled />
          )}
          {cart && <StyledButton content="장바구니에 담겨 있습니다" disabled />}
          {/* {!cart && lecStudent < lecLimit && (
            <StyledButton content="장바구니에 담기" onClick={onClick} />
          )}
          {!cart && lecStudent >= lecLimit && (
            <StyledButton content="강의 인원이 가득 찼습니다." disabled />
          )}
          {cart && <StyledButton content="장바구니에 담겨 있습니다" disabled />} */}
        </LectureInfoDetail>
      </LectureInfo>
      {/* <NoticeDiv>공지사항 </NoticeDiv> */}
      <LectureNav>
        {lecCategory ? (
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              scrollToSection();
            }}
          >
            강의 목차
          </a>
        ) : null}
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

      <LectureSubTitle id="section" ref={sectionRef}>
        <h1>강의 목차</h1>
      </LectureSubTitle>
      <SectionContainer sections={sections} />
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
      /* width: 200px; */
    }
    & .ins-info {
      padding-left: 2rem;
      div {
        margin-top: 1rem;
        font-size: 1.2rem;
      }
    }
  `;

  const { insId, insName, insIntroduce, insEmail } = instructorInfo;
  return (
    <InstWrapper>
      <img
        src={`${process.env.REACT_APP_S3_URL_DANCE}/img/instructor/profile/${insId}`}
        alt="강사 이미지"
      />
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
    <>
      {reviews.length ? (
        <ReviewWrapper>
          {reviews.map((review, index) => (
            <ReviewItem review={review} key={index} />
          ))}
        </ReviewWrapper>
      ) : (
        <ReviewWrapper>아직 작성된 리뷰가 없어요 :(</ReviewWrapper>
      )}
    </>
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
  const { userNickname, reviewRegdate, reviewScore, reviewContents } = review;
  return (
    <ReviewItemWrapper>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        alt=""
      />
      <div className="review-body">
        <div className="review-header">
          <span className="review-title">{userNickname}</span>
          <ReviewStar score={reviewScore} />
        </div>
        <div>{reviewContents}</div>
      </div>
    </ReviewItemWrapper>
  );
};

const SectionContainer = ({ sections }) => {
  const Wrapper = styled.div`
    margin: 1rem 0rem;
    padding: 2rem;
    min-height: 500px;
    font-size: 24px;
  `;
  return (
    <Wrapper>
      {sections.map((section, index) => (
        <SectionLecture section={section} index={index} key={index} />
      ))}
    </Wrapper>
  );
};

const SectionLecture = ({ section, index }) => {
  const Wrapper = styled.div`
    width: 100%;
    display: block;
    color: white;
    border-bottom: #ff2c55 0.1rem solid;
    & .section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    & .section-title {
      font-size: 1.6rem;
      display: block;
    }
    & .section-regdate {
      font-size: 1.3rem;
      line-height: 1.5;
      color: rgb(255, 44, 85, 0.7);
    }
    & .section-content {
      font-size: 1.2rem;
    }

    min-height: 6rem;
    margin-bottom: 2rem;
  `;

  const { secId, secTitle, secContents, secRegDate } = section;

  return (
    <Wrapper>
      <div className="section-header">
        <div className="section-title">
          {index + 1}. {secTitle}
        </div>
        <div className="section-regdate">{secRegDate}</div>
      </div>
      <div className="section-content">{secContents}</div>
    </Wrapper>
  );
};
