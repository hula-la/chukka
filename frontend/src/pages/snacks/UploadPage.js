import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';
import { uploadSnacks } from '../../features/snacks/snacksActions';

const UploadPage = () => {
  const [uploadInputs, setuploadInputs] = useState({
    snacksTitle: '',
    snacksTag: null,
  });

  const [video, setVideo] = useState(null);

  const dispatch = useDispatch();

  const onChangeTitle = (e) => {
    const { value } = e.target;
    const nextInputs = {
      ...uploadInputs,
      ['snacksTitle']: value,
    };
    setuploadInputs(nextInputs);
  };

  const onChangeTag = (e) => {
    const tags = e.detail.tagify.getCleanValue();
    const nextInputs = {
      ...uploadInputs,
      ['snacksTag']: tags,
    };
    setuploadInputs(nextInputs);
  };

  const onChagneVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(uploadSnacks({ uploadInputs, video }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChagneVideo} accept="video/*" />
        <input value={uploadInputs.title} onChange={onChangeTitle} />
        <Tags value={uploadInputs.hashTag} onChange={onChangeTag} />
        <button>업로드하기</button>
      </form>
    </div>
  );
};

export default UploadPage;
