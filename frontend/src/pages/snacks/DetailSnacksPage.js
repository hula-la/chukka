import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetail } from '../../features/snacks/snacksActions';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Back = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProNick = styled.div`
  display: flex;
  flex-direction: row;
`;

const NickName = styled.div`
  margin: auto 0.5rem;
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const DetailSnacksPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDetail(params.snacksId));
  }, [dispatch]);

  const { snacksDetail } = useSelector((state) => state.snacks);

  return (
    <div>
      {snacksDetail !== null && (
        <div>
          <Back>
            <ProNick>
              <Profile src={snacksDetail.userProfile} />
              <NickName>{snacksDetail.userNickname}</NickName>
            </ProNick>
            <button onClick={() => navigate(-1)}>뒤로가기</button>
          </Back>
          <br />
          {snacksDetail.snacksTag.map((tag, index) => {
            return <span key={index}># {tag} </span>;
          })}
          <video id="my-video" controls preload="auto">
            <source
              src={`https://chukkadance.s3.ap-northeast-2.amazonaws.com/vid/snacks/${snacksDetail.snacksId}`}
              type="video/mp4"
            />
          </video>
        </div>
      )}
    </div>
  );
};

export default DetailSnacksPage;
