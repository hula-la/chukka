import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserList,
  deleteUser,
  changeUser,
  fetchInstList,
  changeInsInfo,
} from '../../features/admin/adminActions';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import { useState } from 'react';

const AdminPageBlock = styled.div`
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

  // 최초에 유저, 강사 정보 불러오기
  useEffect(() => {
    dispatch(fetchUserList());
    dispatch(fetchInstList());
  }, [dispatch]);

  // 스토어에 유저, 강사 리스트 불러오기
  const userList = useSelector((state) => {
    return state.admin.userList;
  });

  const instList = useSelector((state) => {
    return state.admin.instList;
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

  // 강사 정보 수정
  const onClickInsInfo = (
    insId,
    insEmail,
    insIntroduce,
    insName,
    insProfile,
    e,
  ) => {
    e.preventDefault();
    dispatch(
      changeInsInfo({ insId, insEmail, insIntroduce, insName, insProfile }),
    );
  };

  // 회원 관리 테이블 열
  const columnsUser = [
    { field: 'userId', headerName: 'Id', width: 130 },
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
  const columnsInst = [
    { field: 'insId', headerName: 'Id', width: 130 },
    {
      field: 'insProfile',
      headerName: 'profile',
      width: 200,
      editable: true,
    },
    { field: 'insName', headerName: 'Name', width: 130, editable: true },
    { field: 'insEmail', headerName: 'Email', width: 180, editable: true },
    {
      field: 'insIntroduce',
      headerName: 'Introduce',
      width: 200,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<BuildIcon />}
          label="Change"
          onClick={(e) =>
            onClickInsInfo(
              params.id,
              params.row.insemail,
              params.row.insintoduce,
              params.row.insName,
              params.row.insProfile,
              e,
            )
          }
        />,
      ],
    },
  ];

  return (
    <AdminPageBlock>
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
            columns={columnsUser}
            getRowId={(row) => row.userId}
          />
        </div>
      )}
      {/* 강사 관리 탭 */}
      {pageNum === '2' && (
        <div style={{ height: 1000, width: '100%' }}>
          <DataGrid
            className="table"
            rows={instList}
            columns={columnsInst}
            getRowId={(row) => row.insId}
          />
        </div>
      )}
    </AdminPageBlock>
  );
};

export default AdminPage;
