import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  font-size: 0.9rem;
  /* width: 3.5rem; */
  height: 100%;
  padding: 2px 10px;
  margin-right: 6px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 0 0.5rem 0 1rem; */
`;

const UserBadge = ({ userType }) => {
  return (
    <>
      {userType === 1 && <Wrapper>강사</Wrapper>}
      {userType === 2 && <Wrapper>관리자</Wrapper>}
    </>
  );
};

export default UserBadge;
