import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteSnacks,
  fetchDetail,
  fetchReply,
} from '../../features/snacks/snacksActions';
import styled from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* #my-video {
    width: 200px;
  } */
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  justify-content: end;
  .close {
    margin-left: 1rem;
  }
`;

const SnacksDetailBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SnacksBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const ReplyBlock = styled.div`
  border: 1px;
  width: 30%;
`;

const Reply = styled.div`
  height: 65.5vh;
  border: 1px solid white;
  .nick {
    font-weight: bold;
    font-size: 1.5rem;
    margin-left: 5px;
  }
`;

const ReplyForm = styled.div`
  .reply-input {
    border: none;
    height: 2rem;
    width: 330px;
    padding: 0.5rem 0.5rem;
    color: black;
  }
  .reply-button {
    margin-left: 0.7rem;
    height: 2rem;
    width: 80px;
    color: black;
    vertical-align: middle;
    cursor: pointer;
    fill: gray;
    transition: 300ms;
    :hover {
      fill: #ff2c55;
    }
  }
`;

const Back = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
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

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 2.5rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  opacity: 0.5;
  transition: 500ms;
  :hover {
    opacity: 1;
    font-weight: bold;
  }
`;

const DetailSnacksPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { snacksDetail } = useSelector((state) => state.snacks);
  const { snacksReply } = useSelector((state) => state.snacks);
  const { userInfo } = useSelector((state) => state.user);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    dispatch(fetchDetail(params.snacksId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReply(params.snacksId));
  }, [dispatch, params.snacksID]);

  useEffect(() => {
    if (snacksDetail !== null && userInfo !== null) {
      if (snacksDetail.userNickname === userInfo.userNickname) {
        setIsMe(true);
      }
    }
  }, [snacksDetail, userInfo]);

  const onClickDelete = async () => {
    await dispatch(deleteSnacks(params.snacksId));
    window.location.replace(`/accounts/profile/${snacksDetail.userNickname}`);
  };

  return (
    <Wrapper>
      <Buttons>
        {isMe === true && (
          <StyledButton className="delete" onClick={onClickDelete}>
            삭제하기
          </StyledButton>
        )}
        <StyledButton className="close" onClick={() => navigate(-1)}>
          닫기
        </StyledButton>
      </Buttons>
      <SnacksDetailBlock>
        {snacksDetail !== null && (
          <SnacksBlock>
            <Back>
              <ProNick>
                <Profile src={snacksDetail.userProfile} />
                <NickName>{snacksDetail.userNickname}</NickName>
              </ProNick>
            </Back>
            <br />
            {snacksDetail.snacksTag.map((tag, index) => {
              return <span key={index}># {tag} </span>;
            })}
            <video id="my-video" controls preload="auto">
              <source
                src={`${process.env.REACT_APP_S3_URL_DANCE}/vid/snacks/${snacksDetail.snacksId}`}
                type="video/mp4"
              />
            </video>
          </SnacksBlock>
        )}
        {/* <ReplyBlock>
          <Reply>
            {snacksReply.map((reply, index) => {
              return (
                <div key={index}>
                  <span className="nick">{reply.userNickname} </span>
                  <span className="content"> {reply.contents}</span>
                </div>
              );
            })}
          </Reply>
          <ReplyForm>
            <input className="reply-input" placeholder="댓글을 입력하세요" />
            <button className="reply-button">댓글 작성</button>
          </ReplyForm>
        </ReplyBlock> */}
      </SnacksDetailBlock>
    </Wrapper>
  );
};

export default DetailSnacksPage;
