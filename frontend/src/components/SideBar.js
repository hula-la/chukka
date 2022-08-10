import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
  margin-right: 3rem;
  .line {
    border: 0;
    height: 5px;
    background: #ff2c55;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  & p {
    margin-bottom: 2.5rem;
  }
`;
const Profile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
`;
const Menu = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function SideBar() {
  const menus = [
    { name: 'Snacks', path: '/accounts/profile' },
    { name: '나의 강의 목록', path: '/accounts/mylist' },
    { name: '프로필 설정', path: '/accounts/change' },
    { name: '비밀번호 변경', path: '/accounts/password' },
  ];
  return (
    <Side>
      <hr className="line" />
      <Profile src="/img/login.png"></Profile>
      <p>이름</p>
      <hr className="line" />
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{
                color: 'white',
                textDecoration: 'none',
                marginBottom: '1.5rem',
              }}
              to={menu.path}
              key={index}
            >
              <div menu={menu}>{menu.name}</div>
            </NavLink>
          );
        })}
      </Menu>
      <hr className="line" style={{ marginTop: '1rem' }} />
    </Side>
  );
}

export default SideBar;
