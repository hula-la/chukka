import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetail } from '../../features/snacks/snacksActions';

const DetailSnacksPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { snacksDetail } = useSelector((state) => state.snacks);
  useEffect(() => {
    dispatch(fetchDetail(params.snacksId));
  }, [dispatch]);
  return (
    <div>
      <div>userNickname : {snacksDetail.userNickname}</div>
      <div>snacksTitle: {snacksDetail.snacksTitle}</div>
    </div>
  );
};

export default DetailSnacksPage;
