import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  deleteSection,
  fetchSections,
} from '../../features/admin/adminActions';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

const SectionBox = styled.div`
  margin: auto 0;
  .table {
    color: #0b0b0b;
  }
`;

const DetailLectue = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const lecId = params.lecId;

  useEffect(() => {
    dispatch(fetchSections(lecId));
  }, []);

  const { sectionList } = useSelector((state) => state.admin);

  // 섹션 관련 테이블 열
  const columnsSection = [
    { field: 'secId', headerName: 'Id', width: 80 },
    {
      field: 'secContents',
      headerName: 'contents',
      with: 80,
      renderCell: (params) => (
        <video height="50px" width="100px">
          <source src={params.value} />
        </video>
      ),
    },
    { field: 'secTitle', headerName: 'Title', width: 130 },
    { field: 'secRegDate', headerName: 'RegDate', width: 130 },
    {
      field: 'actions',
      type: 'actions',
      width: 130,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(e) => onClickDeleteSec(params.id, lecId)}
        />,
      ],
    },
  ];

  const onClickDeleteSec = (sectionId, lecId) => {
    dispatch(deleteSection({ lecId, sectionId }));
  };
  return (
    <div>
      <SectionBox style={{ height: 1000, width: '50%' }}>
        {sectionList !== undefined && (
          <DataGrid
            className="table"
            rows={sectionList}
            columns={columnsSection}
            getRowId={(row) => row.secId}
          />
        )}
      </SectionBox>
      <Link to={`/admin/section/${lecId}`}>
        <button>섹션 추가</button>
      </Link>
    </div>
  );
};

export default DetailLectue;
