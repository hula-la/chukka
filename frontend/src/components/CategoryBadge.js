import styled from 'styled-components';

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
`;

const CategoryBadge = ({ category }) => {
  let content;
  if (category === 0) content = '실시간';
  else if (category === 1) content = '녹화';
  else content = category;
  return <Badge>{content}</Badge>;
};

export default CategoryBadge;
