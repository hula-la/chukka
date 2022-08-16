import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoRoomComponent from './VideoRoomComponent';
import {
  fetchIsEnroll,
  fetchLectureDetail,
} from '../../features/lecture/lectureActions';
import { useDispatch, useSelector } from 'react-redux';

const LivePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lectureId } = useParams();
  const isEnroll = useSelector((state) => state.lecture.isEnroll);
  const { userType, userNickname } = useSelector(
    (state) => state.user.userInfo,
  );
  const lectureInfo = useSelector((state) => state.lecture.lecture);

  useEffect(() => {
    dispatch(fetchIsEnroll(lectureId));
    dispatch(fetchLectureDetail(lectureId));
  }, [dispatch]);
  return (
    <>
      {(isEnroll && userNickname && lectureInfo) ||
      lectureInfo.insInfo.insName == userNickname ? (
        <VideoRoomComponent
          navigate={() => {
            navigate(-1);
          }}
          lecTitle={lectureInfo.lecTitle}
          sessionName={lectureInfo.insInfo.insName}
          user={userNickname}
        />
      ) : (
        <h1>라이브 강의</h1>
      )}
    </>
  );
};

export default LivePage;
