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
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  & div.MuiDataGrid-columnHeader {
    width: 100px;
  }
  & div {
    color: white;
    text-align: center;
  }
  & div.MuiDataGrid-cellContent {
    width: 100%;
  }
  & div.MuiDataGrid-columnHeaderTitleContainerContent {
    width: 100%;
    text-align: center;
  }
  & div.MuiDataGrid-columnHeaderTitle {
    width: 100%;
    font-weight: bolder;
    font-size: 0.7rem;
  }
  & svg {
    fill: white;
    :hover {
      fill: rgb(200, 200, 200);
    }
  }

  & div.MuiDataGrid-row {
    transition: 300ms;
    :hover {
      background-color: rgb(255, 44, 85, 1);
    }
  }

  & div.table-container {
    width: 85%;
    height: 100vh;
  }
  & div.upload-container {
    width: 15%;
    font-size: 0.8rem;
  }
  & div.upload-record {
    margin-top: 2rem;
    margin-bottom: 1rem;
    transition: 300ms;
    opacity: 0.7;
    :hover {
      opacity: 1;
      font-weight: bolder;
      font-size: 1rem;
    }
  }
  & div.upload-live {
    opacity: 0.7;
    transition: 300ms;
    :hover {
      opacity: 1;
      font-weight: bolder;
      font-size: 1rem;
    }
  }
  & .icon {
    vertical-align: middle;
    margin-right: 0.5rem;
  }
`;

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
  width: 100%;
  height: 100vh;
  & div.table-container {
    width: 85%;
  }
  & div {
    color: white;
    text-align: center;
  }
  & div.MuiDataGrid-cellContent {
    width: 100%;
  }
  & div.MuiDataGrid-columnHeaderTitleContainerContent {
    width: 100%;
    text-align: center;
  }
  & div.MuiDataGrid-columnHeaderTitle {
    width: 100%;
    font-weight: bolder;
    font-size: 0.7rem;
  }
  & svg {
    fill: white;
  }

  & div.MuiDataGrid-row {
    transition: 300ms;
    :hover {
      background-color: rgb(255, 44, 85, 1);
    }
  }
  & .profile-add-container {
    width: 15%;
    height: 5rem;
    opacity: 0.7;
    transition: 300ms;
    :hover {
      opacity: 1;
      font-size: 1.1rem;
      font-weight: bolder;
    }
  }
  & .profile-add-content {
    font-size: smaller;
    padding-top: 1rem;
  }
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
  ul li {
    height: 3rem;
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
    :hover {
      border-bottom: solid 1px #ff2c55;
    }
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
      width: 110,
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
      width: 110,
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
    <Wrapper>
      {userList !== undefined && (
        <DataGrid
          className="table"
          rows={userList}
          columns={columnsUser}
          getRowId={(row) => row.userId}
        />
      )}
    </Wrapper>
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
      width: 260,
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
      <div className="table-container">
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
      <div className="profile-add-container">
        <Link to="/admin/ins">
          <ControlPointIcon />
          <p className="profile-add-content">강사 프로필 추가</p>
        </Link>
      </div>
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
      width: 200,
      renderCell: (params) => (
        <Link to={`/admin/${params.id}`}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    { field: 'lecCategory', headerName: 'Category', width: 110 },
    { field: 'lecGenre', headerName: 'Genre', width: 110 },
    { field: 'lecLevel', headerName: 'Level', width: 100 },
    { field: 'lecPrice', headerName: 'Price', width: 110 },
    {
      field: 'actions',
      type: 'actions',
      width: 60,
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
    <Wrapper>
      <div className="table-container">
        {lectureList.length !== 0 && (
          <DataGrid
            className="table"
            rows={lectureList}
            columns={columnsLecture}
            getRowId={(row) => row.lecId}
          />
        )}
      </div>
      <div className="upload-container">
        <div className="upload-record">
          <Link to="lecture/record">
            <ControlPointIcon className="icon" />
            <span>녹화강의 추가</span>
          </Link>
        </div>
        <div className="upload-live">
          <Link to="lecture/live">
            <ControlPointIcon className="icon" />
            <span>라이브 강의 추가</span>
          </Link>
        </div>
      </div>
    </Wrapper>
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
