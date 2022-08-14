import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LectureClassComponent from '../../components/lectures/LectureClassComponent';
import LectureDetailComponent from '../../components/lectures/LectureDetailComponent';
import { fetchIsEnroll } from '../../features/lecture/lectureActions';
import { userCartCount } from '../../features/cart/cartActions';

const LectureDetailpage = () => {
  const dispatch = useDispatch();
  const isEnroll = useSelector((state) => state.lecture.isEnroll);
  // const [isEnroll, setIsEnroll] = useState(false);
  const { lectureId } = useParams();
  useEffect(() => {
    dispatch(fetchIsEnroll(lectureId));
  }, [dispatch]);

  return (
    <>{isEnroll ? <LectureClassComponent /> : <LectureDetailComponent />}</>
  );
};

export default LectureDetailpage;
