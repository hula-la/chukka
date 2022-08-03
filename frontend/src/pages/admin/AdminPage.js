import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserList } from '../../features/admin/adminActions';

const AdminPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  const userList = useSelector((state) => {
    return state.admin.userList;
  });

  return (
    <div>
      {userList.map((user, idx) => (
        <p key={idx}>
          {user.userId} | {user.userEmail}
        </p>
      ))}
    </div>
  );
};

export default AdminPage;
