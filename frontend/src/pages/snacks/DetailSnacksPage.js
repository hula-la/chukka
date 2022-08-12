import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetail } from '../../features/snacks/snacksActions';

const DetailSnacksPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetail(params.snacksId));
  }, [dispatch]);

  const { snacksDetail } = useSelector((state) => state.snacks);

  return (
    <div>
      <div>userNickname : {snacksDetail.userNickname}</div>
      <div>snacksTitle: {snacksDetail.snacksTitle}</div>
    </div>
  );
};

export default DetailSnacksPage;
