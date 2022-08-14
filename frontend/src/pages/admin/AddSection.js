import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSection } from '../../features/admin/adminActions';

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
    <div>
      <form onSubmit={onSubmit}>
        <label>강의 영상</label>
        <input type="file" accept="video/*" onChange={onChangeContents} />
        <label>강사 아이디</label>
        <input id="insId" name="insId" onChange={onChange} />
        <label>제목</label>
        <input id="sectionTitle" name="secTitle" onChange={onChange} />
        <button>제출하기</button>
      </form>
    </div>
  );
};

export default AddSection;
