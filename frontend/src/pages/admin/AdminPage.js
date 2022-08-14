import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserList,
  deleteUser,
  changeUser,
  fetchInstList,
  changeInsInfo,
  submitPicture,
} from '../../features/admin/adminActions';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';

const AdminPageBlock = styled.div`
  display: grid;
  grid-template-columns:1fr 9fr;
  width:100%;
  .table {
    background: #ffffff;
    color: #0b0b0b;
  }
`;

const InsBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  .line {
    border: 0;
    height: 1px;
    background: #ff2c55;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: small;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
`;

const Content = styled.div`
  
`
const SideBar = styled.div`
  padding: 1rem 0.3rem;

  text-align:center;
  background-color:#0b0b0b;
  position : relative;

  ul{
    font-size:1.5rem;
    list-style: none;
    margin:0px;
    padding:0px;
    position:relative;
  }
  ul ul {
    display: none;
    position:absolute;
    left:1.5rem
  }
  ul li > ul {
    font-size:1rem;    
    left:30%;
  }

  ul li > ul li{
    margin : 10% 0;
  }

  ul li:hover > ul{
    display:block;
  }
  div{
    margin : 1.5rem 0.2rem;
  }
  button{
    cursor: pointer;
    width:80%;
    background-color: #0b0b0b;
    margin :1.3rem 0;
    padding-bottom:0.5rem;
    border-bottom: solid 1px #ff2c55;

  }

`

const AdminPage = () => {
  const dispatch = useDispatch();

  const [pageNum, setpageNum] = useState('1');
  const onClickUser = () => setpageNum('1');
  const onClickInst = (e) => {
    setpageNum('2');
    e.preventDefault();
    dispatch(fetchInstList());
  };
  const onClickLecture = () => setpageNum('3');

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
  const onClickInsInfo = (insId, insEmail, insIntroduce, insName, e) => {
    e.preventDefault();
    dispatch(changeInsInfo({ insId, insEmail, insIntroduce, insName }));
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
              params.row.insEmail,
              params.row.insIntroduce,
              params.row.insName,
              e,
            )
          }
        />,
      ],
    },
  ];

  // 프로필 사진 s3에 제출하기
  const [profileInsId, setProfileInsId] = useState('');

  const [insProfile, setProfile] = useState(null);

  const onChangeId = (e) => {
    console.log(e.target.value);
    setProfileInsId(e.target.value);
  };

  const onChangeProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const onSubmitPicture = (e) => {
    e.preventDefault();
    dispatch(submitPicture({ profileInsId, insProfile }));
  };

  return (
    <AdminPageBlock>
      <SideBar>
        <div>관리자 메뉴</div>
        <ul>
          <li><button onClick={onClickUser}>회원관리</button></li>
          <li><button onClick={onClickInst}>강사관리</button></li>
          <li><button onClick={onClickLecture}>강의관리</button>
            <ul>
              <li>서브1</li>
              <li>서브2</li>
              <li>서브3</li>
            </ul>
          </li>
        </ul>
      </SideBar>
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
      <Content>
        {pageNum === '2' && (
          <InsBox>
            <div style={{ height: 1000, width: '80%' }}>
              <DataGrid
                className="table"
                rows={instList}
                columns={columnsInst}
                getRowId={(row) => row.insId}
              />
            </div>
            <ProfileForm onSubmit={onSubmitPicture}>
              <p>프로필 사진</p>
              <hr className="line" />
              <div>
                <label>아이디</label>
                <input onChange={onChangeId} required />
              </div>
              <input onChange={onChangeProfile} type="file" />
              <StyledButton>제출</StyledButton>
            </ProfileForm>
          </InsBox>
        )}
      </Content>
    </AdminPageBlock>
  );
};

export default AdminPage;
