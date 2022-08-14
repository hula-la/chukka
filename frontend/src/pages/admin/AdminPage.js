import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchUserList,
  deleteUser,
  changeUser,
  fetchInstList,
  changeInsInfo,
  deleteIns,
  fetchLectures,
  deleteLecture,
} from '../../features/admin/adminActions';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';

const AdminPageBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
  width: 100%;
  .table {
    color: #0b0b0b;
  }
  .header {
    background-color: #0b0b0b;
  }
`;

const InsBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideBar = styled.div`
  padding: 1rem 0.3rem;

  text-align: center;
  background-color: #0b0b0b;
  position: relative;

  ul {
    font-size: 1.5rem;
    list-style: none;
    margin: 0px;
    padding: 0px;
    position: relative;
  }
  ul ul {
    display: none;
    position: absolute;
    left: 1.5rem;
  }
  ul li > ul {
    font-size: 1rem;
    left: 30%;
  }

  ul li > ul li {
    margin: 10% 0;
  }

  ul li:hover > ul {
    display: block;
  }
  div {
    margin: 1.5rem 0.2rem;
  }
  button {
    cursor: pointer;
    width: 80%;
    background-color: #0b0b0b;
    margin: 1.3rem 0;
    padding-bottom: 0.5rem;
    border-bottom: solid 1px #ff2c55;
  }
`;

// 회원 관리 컴포넌트
const UserTab = ({ userList }) => {
  const dispatch = useDispatch();
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
  const columnsUser = [
    { field: 'userId', headerName: 'Id', width: 100, headerAlign: 'center' },
    {
      field: 'userName',
      headerName: 'Name',
      width: 100,
      headerAlign: 'center',
      // headerClassName: 'header',
    },
    {
      field: 'userNickname',
      headerName: 'Nickname',
      width: 130,
      headerAlign: 'center',
    },
    {
      field: 'userGender',
      headerName: 'Gender',
      width: 80,
      headerAlign: 'center',
    },
    {
      field: 'userEmail',
      headerName: 'Email',
      width: 180,
      headerAlign: 'center',
    },
    {
      field: 'userBirth',
      headerName: 'Birth',
      width: 130,
      headerAlign: 'center',
    },
    {
      field: 'userPhone',
      headerName: 'Phone',
      width: 130,
      headerAlign: 'center',
    },
    {
      field: 'userType',
      headerName: 'Type',
      type: 'singleSelect',
      width: 80,
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
  return (
    <div style={{ height: 1000, width: '100%' }}>
      {userList !== undefined && (
        <DataGrid
          className="table"
          rows={userList}
          columns={columnsUser}
          getRowId={(row) => row.userId}
        />
      )}
    </div>
  );
};

// 강사 관리 컴포넌트
const InsTab = ({ instList }) => {
  const dispatch = useDispatch();

  // 강사 관리 테이블 열
  const columnsInst = [
    { field: 'insId', headerName: 'Id', width: 130 },
    {
      field: 'insProfile',
      hearderName: 'Profile',
      width: 130,
      type: 'image',
      renderCell: (params) => <img height="50px" src={params.value} />,
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
              params.row.insEmail,
              params.row.insIntroduce,
              params.row.insName,
              e,
            )
          }
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(e) => onClickDeleteIns(params.id, e)}
        />,
      ],
    },
  ];

  // 강사 정보 수정
  const onClickInsInfo = (insId, insEmail, insIntroduce, insName) => {
    dispatch(changeInsInfo({ insId, insEmail, insIntroduce, insName }));
  };

  // 강사 삭제
  const onClickDeleteIns = (insId) => {
    dispatch(deleteIns(insId));
  };

  return (
    <InsBox>
      <div style={{ height: 1000, width: '80%' }}>
        <DataGrid
          className="table"
          rows={instList}
          columns={columnsInst}
          getRowId={(row) => row.insId}
          // sx={{
          //   '.MuiDataGrid-columnSeparator': {
          //     display: 'none',
          //   },
          //   '&.MuiDataGrid-root': {
          //     border: 'none',
          //   },
          // }}
        />
      </div>
      <Link to="/admin/ins">
        <button>강사 프로필 추가</button>
      </Link>
    </InsBox>
  );
};

// 강의 정보 컴포넌트
const LectureTab = ({ lectureList }) => {
  const dispatch = useDispatch();
  // 강의 관련 테이블 열
  const columnsLecture = [
    { field: 'lecId', headerName: 'LecId', width: 80 },
    {
      field: 'lecThumb',
      headerName: 'InsThumb',
      width: 130,
      type: 'image',
      renderCell: (params) => <img height="50px" src={params.value} />,
    },
    {
      field: 'lecTitle',
      headerName: 'Title',
      width: 80,
      renderCell: (params) => (
        <Link to={`/admin/${params.id}`}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    { field: 'lecCategory', headerName: 'Category', width: 80 },
    { field: 'lecGenre', headerName: 'Genre', width: 80 },
    { field: 'lecLevel', headerName: 'Level', width: 80 },
    { field: 'lecPrice', headerName: 'Price', width: 80 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(e) => onClickDeleteLec(params.id, e)}
        />,
      ],
    },
  ];

  // 강의 삭제 이벤트
  const onClickDeleteLec = (lecId) => {
    dispatch(deleteLecture(lecId));
  };
  return (
    <div>
      <div style={{ height: 1000, width: '80%' }}>
        {lectureList.length !== 0 && (
          <DataGrid
            className="table"
            rows={lectureList}
            columns={columnsLecture}
            getRowId={(row) => row.lecId}
          />
        )}
      </div>
      <Link to="lecture/record">
        <button>녹화강의 추가</button>
      </Link>
      <Link to="lecture/live">
        <button>라이브 강의 추가</button>
      </Link>
    </div>
  );
};

const AdminPage = () => {
  const dispatch = useDispatch();

  const [pageNum, setpageNum] = useState('1');
  const onClickUser = () => setpageNum('1');
  const onClickInst = (e) => {
    setpageNum('2');
    e.preventDefault();
    dispatch(fetchInstList());
  };
  const onClickLecture = () => {
    setpageNum('3');
    dispatch(fetchLectures());
  };

  // 최초에 유저, 강사 정보 불러오기
  useEffect(() => {
    dispatch(fetchUserList());
    // dispatch(fetchInstList());
  }, [dispatch]);

  // 스토어에 유저, 강사 리스트 불러오기
  const userList = useSelector((state) => {
    return state.admin.userList;
  });

  const instList = useSelector((state) => {
    return state.admin.instList;
  });

  const { lectureList } = useSelector((state) => {
    return state.admin;
  });

  return (
    <AdminPageBlock>
      <SideBar>
        <div>관리자 메뉴</div>
        <ul>
          <li>
            <button onClick={onClickUser}>회원관리</button>
          </li>
          <li>
            <button onClick={onClickInst}>강사관리</button>
          </li>
          <li>
            <button onClick={onClickLecture}>강의관리</button>
            <ul>
              <li>서브1</li>
              <li>서브2</li>
              <li>서브3</li>
            </ul>
          </li>
        </ul>
      </SideBar>
      {/* 회원관리 탭 */}
      {pageNum === '1' && <UserTab userList={userList} />}
      {/* 강사 관리 탭 */}
      {pageNum === '2' && <InsTab instList={instList} />}
      {/* 강의 관리 탭 */}
      {pageNum === '3' && <LectureTab lectureList={lectureList} />}
    </AdminPageBlock>
  );
};

export default AdminPage;
