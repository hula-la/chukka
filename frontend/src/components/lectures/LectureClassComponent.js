import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import LevelBadge from '../../components/LevelBadge';
import CategoryBadge from '../../components/CategoryBadge';
import StyledButton from '../../components/Button';
import ReviewStar from '../../components/lectures/ReviewStar';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  fetchLectureDetail,
  fetchSections,
  fetchReviews,
  createReview,
  updateNotice,
} from '../../features/lecture/lectureActions';
import { clearLecture } from '../../features/lecture/lectureSlice';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Rating } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// style
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
  display: flex;
  width: 100%;
  background-color: #316cc3;
  color: white;
  height: 60px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 22px;
  margin-bottom: 2rem;
  & .notice-content {
    margin-left: 8px;
    margin-right: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
  }
  & .notice-input-div {
    margin-left: 8px;
    margin-right: 8px;
    display: flex;
    flex-grow: 1;
    & input {
      font-size: 22px;
      width: 100%;
      padding: 0 8px;
    }
  }
  & .notice-edit-btn-div {
    display: flex;
    align-items: center;
  }
  & .notice-edit-icon {
    opacity: 1;
    cursor: pointer;

    right: 0;
    &:hover {
      transition: transform 0.4s;
      transform: scale3d(1.3, 1.3, 1.3);
      /* border: 1px solid white; */
    }
    /* border-radius: 2px; */
  }
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

const LectureClassComponent = () => {
  const { lectureId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const secRef = useRef(null);
  const insRef = useRef(null);
  const revRef = useRef(null);
  const [notice, setNotice] = useState('');
  const [isEditNotice, setIsEditNotice] = useState(false);

  useEffect(() => {
    dispatch(fetchLectureDetail(lectureId));
    dispatch(fetchSections(lectureId));
    dispatch(fetchReviews(lectureId));
  }, [dispatch, lectureId]);

  useEffect(() => {
    return () => {
      dispatch(clearLecture());
    };
  }, []);

  const onClickSectionHandler = (sectionId) => {
    navigate(`/lectures/${lectureId}/section/${sectionId}`);
  };

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
    loading,
  } = useSelector((state) => state.lecture.lecture);

  useEffect(() => {
    setNotice(lecNotice);
  }, [lecNotice]);

  const { userInfo } = useSelector((state) => state.user);
  const sections = useSelector((state) => state.lecture.sections);
  const reviews = useSelector((state) => state.lecture.reviews);

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
  const scrollToSec = () => {
    if (secRef && secRef.current) {
      secRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Wrapper>
      {!loading ? (
        <>
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
              </div>
              {/* 수업 버튼 */}
              {lecCategory ? (
                <StyledButton
                  content="동영상 강의 바로가기"
                  onClick={() => {
                    navigate(`/lectures/${lectureId}/section/1`);
                  }}
                />
              ) : null}
              {!lecCategory ? (
                <StyledButton
                  content="라이브 강의 바로가기"
                  onClick={() => {
                    navigate(`live`);
                  }}
                />
              ) : null}
            </LectureInfoDetail>
          </LectureInfo>
          <NoticeDiv>
            <CampaignIcon />
            {!isEditNotice ? (
              <div className="notice-content">
                <span>공지사항 : {notice}</span>
              </div>
            ) : (
              <div className="notice-input-div">
                <input placeholder="새 공지 입력" className="notice-input" />
              </div>
            )}

            {userInfo.userType &&
            userInfo.userNickname == insInfo.insName &&
            !isEditNotice ? (
              <ModeEditIcon
                className="notice-edit-icon"
                onClick={() => {
                  setIsEditNotice(true);
                  // setNotice('aaaa');
                }}
              />
            ) : null}
            {userInfo.userType &&
            userInfo.userNickname == insInfo.insName &&
            isEditNotice ? (
              <div className="notice-edit-btn-div">
                <CheckIcon
                  className="notice-edit-icon"
                  onClick={() => {
                    const newNotice =
                      document.querySelector('.notice-input').value;
                    if (newNotice) {
                      setNotice(newNotice);
                      dispatch(updateNotice({ lecId, newNotice }));
                      setIsEditNotice(false);
                    } else {
                      alert('공지사항을 입력하세요!');
                    }
                  }}
                />
                <CloseIcon
                  className="notice-edit-icon"
                  onClick={() => {
                    setIsEditNotice(false);
                    // setNotice('aaaa');
                  }}
                />
              </div>
            ) : null}
          </NoticeDiv>
          <LectureNav>
            {lecCategory ? (
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSec();
                }}
              >
                목차
              </a>
            ) : null}
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
          {lecCategory ? (
            <>
              <LectureSubTitle id="sections" ref={secRef}>
                <h1>목차</h1>
              </LectureSubTitle>
              <SectionContainer
                sections={sections}
                onClickSectionHandler={onClickSectionHandler}
              />
            </>
          ) : null}

          <LectureSubTitle id="instructor" ref={insRef}>
            <h1>강사 소개</h1>
          </LectureSubTitle>
          <InstructorInfo instructorInfo={insInfo} />

          <LectureSubTitle id="review" ref={revRef}>
            <h1>리뷰</h1>
          </LectureSubTitle>
          <ReviewContainer reviews={reviews} />
        </>
      ) : null}
    </Wrapper>
  );
};

export default LectureClassComponent;

const SectionContainer = ({ sections, onClickSectionHandler }) => {
  const Wrapper = styled.div`
    margin: 1rem 0rem;
    padding: 2rem;
    min-height: 500px;
    font-size: 24px;
  `;
  return (
    <Wrapper>
      {sections.map((section, index) => (
        <SectionLecture
          section={section}
          index={index}
          key={index}
          onClickSectionHandler={onClickSectionHandler}
        />
      ))}
    </Wrapper>
  );
};

const SectionLecture = ({ section, index, onClickSectionHandler }) => {
  const Wrapper = styled.div`
    width: 100%;
    display: block;
    color: white;
    opacity: 0.7;
    border-bottom: #ff2c55 0.1rem solid;
    cursor: pointer;
    :hover {
      opacity: 1;
    }
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
    <Wrapper
      onClick={() => {
        onClickSectionHandler(index + 1);
      }}
    >
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

    & .review-btn {
      margin-top: 1rem;
      background-color: transparent;
      height: 60px;
      border: 2px solid #ff2c55;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1.2rem;
      &:hover {
        transition: background-color 0.7s;
        background-color: #ff2c55;
      }
    }
  `;
  const [modalOpen, setModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <ReviewWrapper>
      {reviews.map((review, index) => (
        <ReviewItem review={review} key={index} />
      ))}
      {/* 수강생일때만 표시. */}
      {!userInfo.userType &&
      !reviews.filter((review) => review.userNickname == userInfo.userNickname)
        .length ? (
        <>
          <button className="review-btn" onClick={() => setModalOpen(true)}>
            리뷰 작성
          </button>
          <ReviewForm open={modalOpen} close={closeModal} />
        </>
      ) : null}
    </ReviewWrapper>
  );
};

const ReviewForm = (props) => {
  const dispatch = useDispatch();
  const lecId = useParams().lectureId;
  const ReviewFormWrapper = styled.div`
    display: flex;
    margin-top: 1rem;

    .review-modal {
      text-align: center;
      display: none;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 99;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .review-modal button {
      outline: none;
      cursor: pointer;
      border: 0;
    }
    .review-modal > section {
      /* width: 90%; */
      width: 500px;
      height: 500px;
      display: flex;
      flex-direction: column;
      /* max-width: 450px; */
      margin: 0 auto;
      border: solid 2px;
      border-radius: 0.3rem;
      border-color: #ff2c55;
      background-color: black;
      /* 팝업이 열릴때 스르륵 열리는 효과 */
      animation: modal-show 0.3s;
      overflow: hidden;
    }
    .review-modal > section > header {
      position: relative;
      padding: 16px 50px 16px 50px;
      background-color: black;
      font-weight: 700;
      font-size: 1.5rem;
    }
    .review-modal > section > header button {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 30px;
      font-size: 21px;
      font-weight: 700;
      text-align: center;
      background-color: transparent;
    }
    .review-modal > section > main {
      padding: 16px;
      flex-grow: 1;
      /* border-top: 1px solid #dee2e6; */
    }
    .review-modal form > label {
      font-size: 1.3rem;
      /* border-top: 1px solid #dee2e6; */
    }
    .review-modal .review-star-div {
      color: #faaf00 !important ;
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 1.5rem;
      & .MuiRating-iconEmpty {
        color: #faaf00 !important;
      }
    }
    .review-modal .review-star {
      color: #faaf00 !important;
      & label {
        font-size: 60px;
      }
    }

    .review-modal > section form {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
    .review-modal > section > main .review-content {
      color: black;
      width: 100%;
      margin-top: 1rem;
      height: 200px;
      flex-grow: 1;
      font-size: 1.3rem;
      border-radius: 10px;
      padding: 1rem;
      /* border-top: 1px solid #dee2e6; */
    }
    /* .review-input:focus {
      outline: 2px solid #ff2c55;
    } */

    .review-modal > section footer {
      padding: 0px 16px 16px;
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .review-modal > section footer button {
      padding: 6px 12px;
      background-color: black;
      border-radius: 5px;
      font-size: 1.2rem;
      /* font-size: 13px; */
    }
    .review-modal.openReviewModal {
      display: flex;
      align-items: center;
      /* 팝업이 열릴때 스르륵 열리는 효과 */
      animation: modal-bg-show 0.3s;
    }
    @keyframes modal-show {
      from {
        opacity: 0;
        margin-top: -50px;
      }
      to {
        opacity: 1;
        margin-top: 0;
      }
    }
    @keyframes modal-bg-show {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
  const { open, close } = props;
  // const [reviewRating, setReviewRating] = useState(5);
  const submitReview = (e) => {
    e.preventDefault();
    const reviewScore = document.querySelectorAll(
      '.MuiRating-iconFilled',
    ).length;
    const reviewContents = document.querySelector('.review-content').value;
    dispatch(createReview({ lecId, reviewScore, reviewContents }));
    // dispatch(fetchReviews(lecId));
    window.location.reload();
    alert('리뷰 작성 완료!');
    close();
  };
  return (
    <ReviewFormWrapper>
      <div className={open ? 'openReviewModal review-modal' : 'review-modal'}>
        {open ? (
          <section>
            <header>
              <div>리뷰 작성</div>
              <button className="close" onClick={close}>
                <CloseIcon />
              </button>
            </header>
            <main>
              <form action="" onSubmit={submitReview}>
                <label htmlFor="review-star">별점</label>
                {/* <input type="text" id="review-star" /> */}
                <div className="review-star-div">
                  <Rating
                    defaultValue={3}
                    className="review-star"
                    // onChange={(e, newValue) => {
                    //   setReviewRating(newValue);
                    // }}
                  />
                </div>
                <label htmlFor="review-content">리뷰 내용</label>
                <textarea
                  name=""
                  id="review-content"
                  cols="30"
                  rows="10"
                  className="review-content"
                  maxLength="200"
                  required
                ></textarea>
                <footer>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      close();
                    }}
                  >
                    취소
                  </button>
                  <button className="close">확인</button>
                </footer>
              </form>
              {/* <input type="text" className="review-input" /> */}
            </main>
          </section>
        ) : null}
      </div>
    </ReviewFormWrapper>
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
