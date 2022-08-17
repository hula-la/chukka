import styled from 'styled-components';
import Brightness1Icon from '@mui/icons-material/Brightness1';
const Badge = styled.div`
  background: none;
  border: 1px solid white;
  border-radius: 45px;
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  & .live-icon {
    font-size: 0.9rem;
    color: red;
    margin-right: 4px;
  }
`;

const CategoryBadge = ({ category }) => {
  let content;
  if (category === 0) content = '실시간';
  else if (category === 1) content = '녹화';
  else content = category;
  return (
    <Badge>
      {category === 0 ? <Brightness1Icon className="live-icon" /> : null}
      {content}
    </Badge>
  );
};

export default CategoryBadge;
