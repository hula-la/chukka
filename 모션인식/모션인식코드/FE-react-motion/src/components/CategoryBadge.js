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
  return <Badge>{category}</Badge>;
};

export default CategoryBadge;
