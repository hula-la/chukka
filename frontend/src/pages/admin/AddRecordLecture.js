import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRecordLecture } from '../../features/admin/adminActions';

const AddRecordLecture = () => {
  const dispatch = useDispatch();

  const [lectureInfo, setLectureInputs] = useState({
    insId: '',
    lecCategory: 0,
    lecContents: '',
    lecGenre: '',
    lecLevel: '',
    lecPrice: '',
    lecTitle: '',
  });

  const [lecThumb, setLecThumb] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...lectureInfo,
      [name]: value,
    };
    setLectureInputs(nextInputs);
  };

  const onChangeThumb = (e) => {
    setLecThumb(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecordLecture({ lectureInfo, lecThumb }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>강의 썸네일</label>
        <input type="file" onChange={onChangeThumb} />
        <label>강사 아이디</label>
        <input id="insId" name="insId" onChange={onChange} />
        <label>내용</label>
        <input id="lecContents" name="lecContents" onChange={onChange} />
        <label>장르</label>
        <input id="lecGenre" name="lecGenre" onChange={onChange} />
        <label>레벨</label>
        <input
          type="number"
          id="lecLevel"
          name="lecLevel"
          onChange={onChange}
        />
        <label>가격</label>
        <input
          type="number"
          id="lecPrice"
          name="lecPrice"
          onChange={onChange}
        />
        <label>강의 제목</label>
        <input id="lecTitle" name="lecTitle" onChange={onChange} />
        <button>제출하기</button>
      </form>
    </div>
  );
};

export default AddRecordLecture;
