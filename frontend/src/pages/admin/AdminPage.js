import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserList, deleteUser } from '../../features/admin/adminActions';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPageBlcok = styled.div`
  .table {
    background: #ffffff;
    color: #0b0b0b;
  }
`;

const AdminPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  const userList = useSelector((state) => {
    return state.admin.userList;
  });

  const onClick = (userId, e) => {
    e.preventDefault();
    dispatch(deleteUser(userId));
  };

  const columns = [
    { field: 'userName', headerName: 'Name', width: 130 },
    { field: 'userNickname', headerName: 'Nickname', width: 130 },
    { field: 'userGender', headerName: 'Gender', width: 130 },
    { field: 'userEmail', headerName: 'Email', width: 180 },
    { field: 'userBirth', headerName: 'Birth', width: 130 },
    { field: 'userPhone', headerName: 'Phone', width: 130 },
    {
      field: 'userType',
      headerName: 'Type',
      type: 'singleSelect',
      width: 130,
      editable: true,
      valueOptions: () => {
        return [0, 1, 2];
      },
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(e) => onClick(params.id, e)}
        />,
      ],
    },
  ];

  return (
    <AdminPageBlcok style={{ height: 1000, width: '100%' }}>
      <DataGrid
        className="table"
        rows={userList}
        columns={columns}
        getRowId={(row) => row.userId}
      />
    </AdminPageBlcok>
  );
};

export default AdminPage;
