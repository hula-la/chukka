import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLiveLecture } from '../../features/admin/adminActions';

const AddLiveLecture = () => {
  const dispatch = useDispatch();

  const [liveInfo, setLiveInfo] = useState({
    insId: '',
    lecTitle: '',
    lecContents: '',
    lecPrice: 0,
    lecCategory: 1,
    lecLevel: 0,
    lecGenre: '',
    lecNotice: '',
    lecSchedule: '',
    lecStartDate: '',
    lecEndDate: '',
  });

  const [lecThumb, setLecThumb] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...liveInfo,
      [name]: value,
    };
    setLiveInfo(nextInputs);
  };

  const onChangeThumb = (e) => {
    setLecThumb(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createLiveLecture({ liveInfo, lecThumb }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>강의 썸네일</label>
          <input type="file" onChange={onChangeThumb} />
        </div>
        <div>
          <label>강사 아이디</label>
          <input id="insId" name="insId" onChange={onChange} />
        </div>
        <div>
          <label>강의 제목</label>
          <input id="lecTitle" name="lecTitle" onChange={onChange} />
        </div>
        <div>
          <label>내용</label>
          <input id="lecContents" name="lecContents" onChange={onChange} />
        </div>
        <div>
          <label>가격</label>
          <input
            type="number"
            id="lecPrice"
            name="lecPrice"
            onChange={onChange}
          />
        </div>
        <div>
          <label>레벨</label>
          <input
            type="number"
            id="lecLevel"
            name="lecLevel"
            onChange={onChange}
          />
        </div>
        <div>
          <label>장르</label>
          <input id="lecGenre" name="lecGenre" onChange={onChange} />
        </div>
        <div>
          <label>공지사항</label>
          <input id="lecNotice" name="lecNotice" onChange={onChange} />
        </div>
        <div>
          <label>강의 일정</label>
          <input id="lecSchedule" name="lecSchedule" onChange={onChange} />
        </div>
        <div>
          <label>강의 시작일</label>
          <input
            id="lecStartDate"
            name="lecStartDate"
            type="date"
            onChange={onChange}
          />
        </div>
        <div>
          <label>강의 종료일</label>
          <input
            id="lecEndDate"
            name="lecEndDate"
            type="date"
            onChange={onChange}
          />
        </div>
        <div>
          <label>제한 인원</label>
          <input
            type="number"
            id="lecLimit"
            name="lecLimit"
            onChange={onChange}
          />
        </div>
        <button>제출하기</button>
      </form>
    </div>
  );
};

export default AddLiveLecture;
