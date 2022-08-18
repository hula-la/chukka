import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSection } from '../../features/admin/adminActions';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .ttl {
    margin-top: 3rem;
  }
  .addIcon {
    position: relative;
    top: -3rem;
    left: 3rem;
    cursor: pointer;
  }
  & hr {
    width: 30%;
    border: none;
    height: 0.1rem;
    background: #ff2c55;
    margin: 1rem;
  }
  .input-container {
    width: 100%;
    height: 3.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  color: #ffffff;
  border: none;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem 1rem 1rem;
  outline-color: #ffffff;
  width: 70%;
  display: inline;
  background-color: #3b3b3b;
  border-radius: 0.5rem;
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  &[type='date'] {
  }

  &[type='file'] {
    font-size: 0.7rem;
  }

  :hover {
    border-bottom: #ff2c55 0.08rem solid;
  }
`;

const StyledLabel = styled.label`
  font-size: small;
  line-height: 3.3rem;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
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

const AddSection = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const lecId = params.lecId;
  const [sectionInfo, setSectionInfo] = useState({
    lecId: params.lecId,
    insId: '',
    secTitle: '',
  });
  const [contents, setContents] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...sectionInfo,
      [name]: value,
    };
    setSectionInfo(nextInputs);
  };

  const onChangeContents = (e) => {
    setContents(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createSection({ lecId, contents, sectionInfo }));
  };

  return (
    <Wrapper>
      <h1 className='ttl'>섹션 추가</h1>
      <hr/>
      <form onSubmit={onSubmit}>
        <div className='input-container'>
          <StyledLabel for="file">강의 영상</StyledLabel>
          <StyledInput id="file" type="file" accept="video/*" onChange={onChangeContents} />
        </div>
        <div className='input-container'>
          <StyledLabel for="insId">강사 아이디</StyledLabel>
          <StyledInput id="insId" name="insId" onChange={onChange} placeholder='강사 아이디를 입력해주세요' autoComplete='off' />
        </div>
        <div className='input-container'>
          <StyledLabel for="sectionTitle">제목</StyledLabel>
          <StyledInput id="sectionTitle" name="secTitle" onChange={onChange} placeholder='섹션 제목을 입력해주세요' autoComplete='off' />
        </div>
        <StyledButton>제출하기</StyledButton>
      </form>
    </Wrapper>
  );
};

export default AddSection;
