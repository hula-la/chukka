import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserList,
  deleteUser,
  changeUser,
} from '../../features/admin/adminActions';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import { useState } from 'react';

const AdminPageBlcok = styled.div`
  .table {
    background: #ffffff;
    color: #0b0b0b;
  }
`;

const AdminPage = () => {
  const dispatch = useDispatch();

  const [pageNum, setpageNum] = useState('1');
  const onClickUser = () => setpageNum('1');
  const onClickInst = () => setpageNum('2');
  const onClickLecture = () => setpageNum('3');

  // 최초에 유저 정보 불러오기
  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  // 스토어에 유저리스트 불러오기
  const userList = useSelector((state) => {
    return state.admin.userList;
  });

  // 유저 강제 탈퇴
  const onClickDelete = (userId, e) => {
    e.preventDefault();
    dispatch(deleteUser(userId));
  };

  // 유저 권한 변경
  const onClickChange = (userId, userType, e) => {
    e.preventDefault();
    dispatch(changeUser({ userId, userType }));
  };

  // 회원 관리 테이블 열
  const columns_user = [
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
          onClick={(e) => onClickDelete(params.id, e)}
        />,
        <GridActionsCellItem
          icon={<BuildIcon />}
          label="Change"
          onClick={(e) => onClickChange(params.id, params.row.userType, e)}
        />,
      ],
    },
  ];

  // 강사 관리 테이블 열

  return (
    <AdminPageBlcok>
      <div>
        <button onClick={onClickUser}>회원관리</button>
        <button onClick={onClickInst}>강사</button>
        <button onClick={onClickLecture}>강의</button>
      </div>
      {/* 회원관리 탭 */}
      {pageNum === '1' && (
        <div style={{ height: 1000, width: '100%' }}>
          <DataGrid
            className="table"
            rows={userList}
            columns={columns_user}
            getRowId={(row) => row.userId}
          />
        </div>
      )}
      {/* 강사 관리 탭 */}
    </AdminPageBlcok>
  );
};

export default AdminPage;
